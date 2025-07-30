import { storage } from "./appwrite";
import { ID } from "appwrite";

// Define the storage bucket interface
interface StorageBucket {
  upload: (
    file: File,
    readPermissions?: string[],
    writePermissions?: string[],
    id?: string
  ) => Promise<any>;
  delete: (fileId: string) => Promise<any>;
  list: (queries?: any[], search?: string) => Promise<any>;
  get: (fileId: string) => Promise<any>;
  getPreview: (fileId: string, options?: any) => any;
  getFileView: (fileId: string) => any;
  download: (fileId: string) => any;
}

// Define the main storage interface
interface Storage {
  resumes: StorageBucket;
  [key: string]: StorageBucket; // Allow for additional buckets
}

// Initialize with proper typing
const st = {} as Storage;

const buckets = [
  {
    id: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_RESUMES!,
    name: "resumes",
  },
];

buckets.forEach((col) => {
  st[col.name] = {
    upload: (
      file: File,
      readPermissions: string[] = [],
      writePermissions: string[] = [],
      id: string = ID.unique()
    ) => storage.createFile(col.id, id, file, readPermissions),

    delete: (fileId: string) => storage.deleteFile(col.id, fileId),

    list: (queries: any[] = [], search?: string) =>
      storage.listFiles(col.id, queries, search),

    get: (fileId: string) => storage.getFile(col.id, fileId),

    getPreview: (fileId: string, options: any = {}) =>
      storage.getFilePreview(col.id, fileId),

    getFileView: (fileId: string) => storage.getFileView(col.id, fileId),

    download: (fileId: string) => storage.getFileDownload(col.id, fileId),
  };
});

export default st;
