import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { UserEntity } from './user.entity'

export const ROLE_TABLE_NAME = 'roles'

@Entity(ROLE_TABLE_NAME)
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[] | undefined
}
