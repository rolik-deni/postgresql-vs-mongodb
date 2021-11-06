import { User } from '../schemas/user.schema'

export interface StatusInterface {
    name: string

    users: User[] | undefined
}
