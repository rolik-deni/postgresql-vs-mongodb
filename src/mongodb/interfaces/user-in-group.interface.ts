import { Group } from '../schemas/group.schema'
import { User } from '../schemas/user.schema'

export interface UserInGroupInterface {
    createdAt: Date

    deletedAt: Date | undefined

    user: User | undefined

    group: Group | undefined
}
