import { UserEntity } from '../entities/user.entity'

export interface StatusInterface {
    name: string

    users: UserEntity[] | undefined
}
