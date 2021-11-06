import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { JokeInterface } from '../interfaces/joke.interface'

import { UserEntity } from './user.entity'

export const JOKE_TABLE_NAME = 'jokes'

@Entity(JOKE_TABLE_NAME)
export class JokeEntity implements JokeInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: String })
    name: string

    @Column({ type: String })
    text: string

    @Column({ type: 'float' })
    rate: number

    @Column({ type: Number })
    like: number

    @Column({ type: Number })
    view: number

    @ManyToOne(() => UserEntity, (user) => user.jokes, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    user: UserEntity
}
