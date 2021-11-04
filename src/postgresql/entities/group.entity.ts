import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { LevelEntity } from './level.entity'
import { UserInGroupEntity } from './user-in-group.entity'

export const GROUP_TABLE_NAME = 'groups'

@Entity(GROUP_TABLE_NAME)
export class GroupEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @Column({ type: String })
    shortName: string

    @OneToMany(() => UserInGroupEntity, (userInGroup) => userInGroup.group)
    userInGroups: UserInGroupEntity[] | undefined

    @OneToOne(() => LevelEntity, (level) => level.group, { nullable: false })
    @JoinColumn()
    level: LevelEntity
}
