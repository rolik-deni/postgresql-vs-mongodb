import { UserEntity } from '../entities/user.entity'

export interface RoleInterface {
    name: string

    users: UserEntity[] | undefined
}
