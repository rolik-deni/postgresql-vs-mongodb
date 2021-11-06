import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { GroupInterface } from '../interfaces/group.interface'

import { Level } from './level.schema'
import { UserInGroup } from './user-in-group.schema'

export type GroupDocument = Group & Document

export const GROUP_COLLECTION_NAME = 'groups'

@Schema({ collection: GROUP_COLLECTION_NAME })
export class Group implements GroupInterface {
    @Prop({ type: String })
    name: string

    @Prop({ type: String })
    shortName: string

    @Prop({ type: Types.ObjectId, ref: 'Level', required: true })
    level: Level

    @Prop({
        type: [{ type: Types.ObjectId, ref: 'UserInGroup' }],
    })
    users: UserInGroup[] | undefined
}

export const GroupSchema = SchemaFactory.createForClass(Group)
