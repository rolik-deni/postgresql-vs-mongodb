import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'

import { JokeEntity } from './joke.entity'
import { RoleEntity } from './role.entity'
import { StatusEntity } from './status.entity'
import { UserInGroupEntity } from './user-in-group.entity'

export const USER_TABLE_NAME = 'users'

@Entity(USER_TABLE_NAME)
export class UserEntity {
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
        default: () => 'CURRENT_TIMESTAMP',
        nullable: true,
    })
    deleteAt: Date | undefined

    @ManyToOne(() => StatusEntity, (status) => status.users, {
        nullable: false,
    })
    status: string

    @OneToMany(() => UserInGroupEntity, (userInGroup) => userInGroup.user)
    userInGroups: UserInGroupEntity[] | undefined

    @ManyToOne(() => RoleEntity, (role) => role.users)
    role: string | undefined

    @OneToMany(() => JokeEntity, (joke) => joke.user)
    jokes: JokeEntity[] | undefined
}
