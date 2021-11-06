import { Level } from '../schemas/level.schema'
import { UserInGroup } from '../schemas/user-in-group.schema'

export interface GroupInterface {
    name: string

    shortName: string

    level: Level

    users: UserInGroup[] | undefined
}
