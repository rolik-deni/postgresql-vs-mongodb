import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { UserInterface } from '../interfaces/user.interface'

import { Joke } from './joke.schema'
import { Role } from './role.schema'
import { Status } from './status.schema'
import { UserInGroup } from './user-in-group.schema'

export type UserDocument = User & Document

export const USER_COLLECTION_NAME = 'users'

@Schema({ collection: USER_COLLECTION_NAME })
export class User implements UserInterface {
    @Prop({ type: String })
    name: string

    @Prop({ type: String })
    surname: string

    @Prop({ type: String })
    login: string

    @Prop({ type: String })
    password: string

    @Prop({ type: Date, default: Date.now() })
    createdAt: Date

    @Prop({ type: Date })
    deletedAt: Date | undefined

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Joke' }] })
    jokes: Joke[] | undefined

    @Prop({ type: Types.ObjectId, ref: 'Role' })
    role: Role

    @Prop({ type: Types.ObjectId, ref: 'Status', required: true })
    status: Status

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'UserInGroup' }],
    })
    groups: UserInGroup[] | undefined
}

export const UserSchema = SchemaFactory.createForClass(User)
