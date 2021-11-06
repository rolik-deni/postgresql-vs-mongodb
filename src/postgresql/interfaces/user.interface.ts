import { JokeEntity } from '../entities/joke.entity'
import { RoleEntity } from '../entities/role.entity'
import { StatusEntity } from '../entities/status.entity'
import { UserInGroupEntity } from '../entities/user-in-group.entity'

export interface UserInterface {
    name: string

    surname: string

    login: string

    password: string

    createAt: Date

    deleteAt: Date | undefined

    jokes: JokeEntity[] | undefined

    role: RoleEntity | undefined

    status: StatusEntity

    groups: UserInGroupEntity[] | undefined
}
