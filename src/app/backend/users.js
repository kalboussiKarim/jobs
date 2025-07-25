import { ID } from "appwrite";
import { account } from "./appwrite";

const acc = {
  create: (email, password, name, id = ID.unique()) =>
    account.create(id, email, password, name),

  updateEmail: (userId, email) => account.updateEmail(userId, email),

  updatePassword: (userId, password) =>
    account.updatePassword(userId, password),

  updateName: (userId, name) => account.updateName(userId, name),

  get: (id) => account.get(id || "current"),

  delete: (id = "current") => account.delete(id),

  login: (email, password) =>
    account.createEmailPasswordSession(email, password),

  logout: (id = "current") => account.deleteSession(id),
};

export default acc;
