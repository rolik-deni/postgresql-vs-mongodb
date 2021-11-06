import { User } from '../schemas/user.schema'

export interface JokeInterface {
    name: string

    text: string

    rate: number

    like: number

    view: number

    user: User
}
