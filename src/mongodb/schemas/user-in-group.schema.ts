import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { UserInGroupInterface } from '../interfaces/user-in-group.interface'

import { Group } from './group.schema'
import { User } from './user.schema'

export type UserInGroupDocument = UserInGroup & Document

export const USER_IN_GROUP_COLLECTION_NAME = 'users_in_groups'

@Schema({ collection: USER_IN_GROUP_COLLECTION_NAME })
export class UserInGroup implements UserInGroupInterface {
    @Prop({ type: Date, default: Date.now() })
    createAt: Date

    @Prop({ type: Date })
    deleteAt: Date | undefined

    @Prop({ type: Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ type: Types.ObjectId, ref: 'Group' })
    group: Group
}

export const UserInGroupSchema = SchemaFactory.createForClass(UserInGroup)
