import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { StatusInterface } from '../interfaces/status.interface'

import { User } from './user.schema'

export type StatusDocument = Status & Document

export const STATUS_COLLECTION_NAME = 'statuses'

@Schema({ collection: STATUS_COLLECTION_NAME })
export class Status implements StatusInterface {
    @Prop({ type: String })
    name: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    users: User[] | undefined
}

export const StatusSchema = SchemaFactory.createForClass(Status)
