import { User } from '../schemas/user.schema'

export interface RoleInterface {
    name: string

    users: User[] | undefined
}
