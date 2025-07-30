import { ID } from "appwrite";
import { account } from "./appwrite";

// Define the account interface
interface AccountService {
  create: (
    email: string,
    password: string,
    name: string,
    id?: string
  ) => Promise<any>;
  updateEmail: (userId: string, email: string) => Promise<any>;
  updatePassword: (password: string, password2: string) => Promise<any>;
  updateName: (userId: string, name: string) => Promise<any>;
  get: (id?: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  logout: (id?: string) => Promise<any>;
}

const acc: AccountService = {
  create: (
    email: string,
    password: string,
    name: string,
    id: string = ID.unique()
  ) => account.create(id, email, password, name),

  updateEmail: (userId: string, email: string) =>
    account.updateEmail(userId, email),

  updatePassword: (password: string, password2: string) =>
    account.updatePassword(password, password2),

  updateName: (userId: string, name: string) => account.updateName(name),

  get: (id?: string) => account.get(),

  login: (email: string, password: string) =>
    account.createEmailPasswordSession(email, password),

  logout: (id: string = "current") => account.deleteSession(id),
};

export default acc;
