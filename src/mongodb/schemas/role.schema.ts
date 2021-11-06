import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { RoleInterface } from '../interfaces/role.interface'

import { User } from './user.schema'

export type RoleDocument = Role & Document

export const ROLE_COLLECTION_NAME = 'roles'

@Schema({ collection: ROLE_COLLECTION_NAME })
export class Role implements RoleInterface {
    @Prop({ type: String })
    name: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    users: User[] | undefined
}

export const RoleSchema = SchemaFactory.createForClass(Role)
