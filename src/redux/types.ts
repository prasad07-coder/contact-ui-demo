import { Contact } from "../models";
import { StatusType } from "../types";

export interface ContactState {
  contacts: Contact[];
  status: StatusType;
  message: string | null;
}
