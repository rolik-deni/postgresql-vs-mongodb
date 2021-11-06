import { UserEntity } from '../entities/user.entity'

export interface JokeInterface {
    name: string

    text: string

    rate: number

    like: number

    view: number

    user: UserEntity
}
