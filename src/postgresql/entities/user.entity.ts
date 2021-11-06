import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { UserInterface } from '../interfaces/user.interface'

import { JokeEntity } from './joke.entity'
import { RoleEntity } from './role.entity'
import { StatusEntity } from './status.entity'
import { UserInGroupEntity } from './user-in-group.entity'

export const USER_TABLE_NAME = 'users'

@Entity(USER_TABLE_NAME)
export class UserEntity implements UserInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @Column({ type: String })
    surname: string

    @Column({ type: String })
    login: string

    @Column({ type: String })
    password: string

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @Column({
        type: 'timestamptz',
        nullable: true,
    })
    deleteAt: Date | undefined

    @ManyToOne(() => StatusEntity, (status) => status.users, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    status: StatusEntity

    @OneToMany(() => UserInGroupEntity, (userInGroup) => userInGroup.user)
    groups: UserInGroupEntity[] | undefined

    @ManyToOne(() => RoleEntity, (role) => role.users, { onDelete: 'CASCADE' })
    role: RoleEntity | undefined

    @OneToMany(() => JokeEntity, (joke) => joke.user)
    jokes: JokeEntity[] | undefined
}
