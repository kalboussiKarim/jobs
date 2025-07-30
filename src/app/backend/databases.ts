import { databases } from "./appwrite";
import { ID } from "appwrite";

// Define the database collection interface
interface DatabaseCollection {
  create: (payload: any, permissions?: string[], id?: string) => Promise<any>;
  update: (id: string, payload: any, permissions?: string[]) => Promise<any>;
  delete: (id: string) => Promise<any>;
  list: (queries?: any[]) => Promise<any>;
  get: (id: string) => Promise<any>;
}

// Define the main database interface with your specific collections
interface Database {
  applications: DatabaseCollection;
  intrestFields: DatabaseCollection;
  [key: string]: DatabaseCollection; // Allow for additional collections
}

// Initialize with proper typing
const db = {} as Database;

const collections = [
  {
    dbId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_APPLICATIONS!,
    name: "applications",
  },
  {
    dbId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    id: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_INTREST_FIELDS!,
    name: "intrestFields",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (
      payload: any,
      permissions: string[] = [],
      id: string = ID.unique()
    ) => databases.createDocument(col.dbId, col.id, id, payload, permissions),

    update: (id: string, payload: any, permissions: string[] = []) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),

    delete: (id: string) => databases.deleteDocument(col.dbId, col.id, id),

    list: (queries: any[] = []) =>
      databases.listDocuments(col.dbId, col.id, queries),

    get: (id: string) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;
