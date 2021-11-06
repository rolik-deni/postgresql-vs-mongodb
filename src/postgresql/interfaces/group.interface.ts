import { LevelEntity } from '../entities/level.entity'
import { UserInGroupEntity } from '../entities/user-in-group.entity'

export interface GroupInterface {
    name: string

    shortName: string

    level: LevelEntity

    users: UserInGroupEntity[] | undefined
}
