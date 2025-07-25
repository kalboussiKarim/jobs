import { databases } from "./appwrite";
import { ID } from "appwrite";

{
  /* Applications collection structure */
}
// firstName: required, string
// lastName: required, string
// email: required, string
// birthday: required, datetime
// experience: required, enum [0,1,2,3,4,5,6,7,8,9,10,10+]
// diploma: required, string
// frenchLevel: required, enum [A1,A2,B1,B2,C1,C2]
// englishLevel: required, enum [A1,A2,B1,B2,C1,C2]
// targetJob: required, string
// availability: required, string
// linkedinURL: optional, string
// resumeURL: optional, string
// preferredCountry: optional, enum [France,Germany,Netherlands,Belgium,Sweden]
// phone: required, string

{
  /* Interest fields collection structure */
}
// field: required, string
// visible: required, booleans

const db = {};

const collections = [
  {
    dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    id: import.meta.env.VITE_APPWRITE_COLLECTION_APPLICATIONS,
    name: "applications",
  },
  {
    dbId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    id: import.meta.env.VITE_APPWRITE_COLLECTION_INTREST_FIELDS,
    name: "intrestFields",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),

    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),

    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),

    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;
