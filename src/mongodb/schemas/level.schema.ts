import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { LevelInterface } from '../interfaces/level.interface'

export type LevelDocument = Level & Document

export const LEVEL_COLLECTION_NAME = 'levels'

@Schema({ collection: LEVEL_COLLECTION_NAME })
export class Level implements LevelInterface {
    @Prop({ type: String })
    name: string
}

export const LevelSchema = SchemaFactory.createForClass(Level)
