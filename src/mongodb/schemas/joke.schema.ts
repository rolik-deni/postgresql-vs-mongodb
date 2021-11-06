import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

import { JokeInterface } from '../interfaces/joke.interface'

import { User } from './user.schema'

export type JokeDocument = Joke & Document

export const JOKE_COLLECTION_NAME = 'jokes'

@Schema({ collection: JOKE_COLLECTION_NAME })
export class Joke implements JokeInterface {
    @Prop({ type: String })
    name: string

    @Prop({ type: String })
    text: string

    @Prop({ type: Number })
    rate: number

    @Prop({ type: Number })
    like: number

    @Prop({ type: Number })
    view: number

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User
}

export const JokeSchema = SchemaFactory.createForClass(Joke)
