import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { UserInGroupInterface } from '../interfaces/user-in-group.interface'

import { GroupEntity } from './group.entity'
import { UserEntity } from './user.entity'

export const USER_IN_GROUP_TABLE_NAME = 'users_in_groups'

@Entity(USER_IN_GROUP_TABLE_NAME)
export class UserInGroupEntity implements UserInGroupInterface {
    @PrimaryGeneratedColumn('uuid')
    userInGroupId: string

    @Column({ type: String })
    userId: string

    @Column({ type: String })
    groupId: string

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    deleteAt: Date | undefined

    @ManyToOne(() => UserEntity, (user) => user.groups, { onDelete: 'CASCADE' })
    user: UserEntity | undefined

    @ManyToOne(() => GroupEntity, (group) => group.users, {
        onDelete: 'CASCADE',
    })
    group: GroupEntity | undefined
}
