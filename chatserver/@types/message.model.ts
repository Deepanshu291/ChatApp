import mongoose, { SchemaDefinitionProperty } from "mongoose";
import { IUser, IUserModal } from "./user.model";

export interface IMessage {
    message:string,
    users: number[],
    sender: IUserModal
}