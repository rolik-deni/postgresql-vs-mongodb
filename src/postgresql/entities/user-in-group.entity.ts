import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { GroupEntity } from './group.entity'
import { UserEntity } from './user.entity'

export const USER_IN_GROUP_TABLE_NAME = 'users_in_groups'

@Entity(USER_IN_GROUP_TABLE_NAME)
export class UserInGroupEntity {
    @PrimaryGeneratedColumn('uuid')
    userInGroupId: string

    @Column({ type: String, nullable: true })
    userId: string | undefined

    @Column({ type: String, nullable: true })
    groupId: string | undefined

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @Column({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    deleteAt: Date | undefined

    @ManyToOne(() => UserEntity, (user) => user.userInGroups)
    user: UserEntity | undefined

    @ManyToOne(() => GroupEntity, (group) => group.userInGroups)
    group: GroupEntity | undefined
}
