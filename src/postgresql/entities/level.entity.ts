import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

import { LevelInterface } from '../interfaces/level.interface'

import { GroupEntity } from './group.entity'

export const LEVEL_TABLE_NAME = 'levels'

@Entity(LEVEL_TABLE_NAME)
export class LevelEntity implements LevelInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @OneToOne(() => GroupEntity, (group) => group.level, { nullable: false })
    group: GroupEntity
}
