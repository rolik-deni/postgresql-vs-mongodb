import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { StatusInterface } from '../interfaces/status.interface'

import { UserEntity } from './user.entity'

export const STATUS_TABLE_NAME = 'statuses'

@Entity(STATUS_TABLE_NAME)
export class StatusEntity implements StatusInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @OneToMany(() => UserEntity, (user) => user.status)
    users: UserEntity[] | undefined
}
