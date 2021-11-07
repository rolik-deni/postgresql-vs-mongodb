import { Joke } from '../schemas/joke.schema'
import { Role } from '../schemas/role.schema'
import { Status } from '../schemas/status.schema'
import { UserInGroup } from '../schemas/user-in-group.schema'

export interface UserInterface {
    name: string

    surname: string

    login: string

    password: string

    createAt: Date

    deleteAt: Date | undefined

    jokes: Joke[] | undefined

    role: Role | undefined

    status: Status

    groups: UserInGroup[] | undefined
}
