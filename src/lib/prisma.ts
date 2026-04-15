import { db } from "@/db";

// Compatibility layer to prevent crashes in files still importing 'prisma'
// While we migrate them to use 'db' directly.
export const prisma = new Proxy(db, {
  get(target, prop) {
    if (prop in target) {
      return (target as any)[prop];
    }
    
    // Log if something is still trying to use Prisma-specific methods
    console.warn(`DEPRECATED: something tried to access prisma.${String(prop)}. Migration to Drizzle is required.`);
    
    // Return a dummy object to prevent immediate crash if it's a model access
    return new Proxy({}, {
      get(_, modelProp) {
        return () => {
          throw new Error(`Prisma.${String(prop)}.${String(modelProp)} is no longer available. Please use Drizzle 'db' instead.`);
        };
      }
    });
  }
}) as any;
