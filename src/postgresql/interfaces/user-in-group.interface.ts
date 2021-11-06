import { GroupEntity } from '../entities/group.entity'
import { UserEntity } from '../entities/user.entity'

export interface UserInGroupInterface {
    createAt: Date

    deleteAt: Date | undefined

    user: UserEntity | undefined

    group: GroupEntity | undefined
}
