/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LoremIpsum } from 'lorem-ipsum'
import { Repository } from 'typeorm'

import { GroupEntity } from './entities/group.entity'
import { JokeEntity } from './entities/joke.entity'
import { LevelEntity } from './entities/level.entity'
import { RoleEntity } from './entities/role.entity'
import { StatusEntity } from './entities/status.entity'
import { UserInGroupEntity } from './entities/user-in-group.entity'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class PostgresqlService {
    private _loremIpsum: LoremIpsum

    constructor(
        @InjectRepository(UserEntity)
        private readonly _usersRepository: Repository<UserEntity>,
        @InjectRepository(JokeEntity)
        private readonly _jokesRepository: Repository<JokeEntity>,
        @InjectRepository(RoleEntity)
        private readonly _rolesRepository: Repository<RoleEntity>,
        @InjectRepository(StatusEntity)
        private readonly _statusesRepository: Repository<StatusEntity>,
        @InjectRepository(GroupEntity)
        private readonly _groupsRepository: Repository<GroupEntity>,
        @InjectRepository(LevelEntity)
        private readonly _levelsRepository: Repository<LevelEntity>,
        @InjectRepository(UserInGroupEntity)
        private readonly _usersInGroupsRepository: Repository<UserInGroupEntity>,
    ) {
        this._loremIpsum = new LoremIpsum()
    }

    async createNStructures(n: number): Promise<void[]> {
        const structures = []
        for (let index = 0; index < n; index += 1) {
            structures.push(this.createStructure())
        }
        return await Promise.all(structures)
    }

    async createStructure(): Promise<void> {
        const userOne = this.generateUser()
        const userTwo = this.generateUser()

        const jokeOne = this.generateJoke()
        const jokeTwo = this.generateJoke()
        jokeOne.user = userOne
        jokeTwo.user = userOne

        const role = this.generateRole()
        userOne.role = role

        const status = this.generateStatus()
        userOne.status = status
        userTwo.status = status

        const group = this.generateGroup()
        const level = this.generateLevel()
        group.level = level

        const userInGroup = this.generateUserInGroup()
        userInGroup.user = userOne
        userInGroup.group = group

        await Promise.all([
            this._statusesRepository.save(status),
            this._levelsRepository.save(level),
            this._rolesRepository.save(role),
        ])
        await Promise.all([
            this._usersRepository.save(userOne),
            this._usersRepository.save(userTwo),
            this._groupsRepository.save(group),
        ])
        await Promise.all([
            this._jokesRepository.save(jokeOne),
            this._jokesRepository.save(jokeTwo),
            this._usersInGroupsRepository.save(userInGroup),
        ])
    }

    async removeAll(): Promise<void> {
        await Promise.all([
            this._jokesRepository.delete({}),
            this._usersInGroupsRepository.delete({}),
            this._usersRepository.delete({}),
            this._rolesRepository.delete({}),
            this._statusesRepository.delete({}),
            this._groupsRepository.delete({}),
            this._levelsRepository.delete({}),
        ])
    }

    generateUser(): UserEntity {
        return this._usersRepository.create({
            name: this._loremIpsum.generateWords(1),
            surname: this._loremIpsum.generateWords(1),
            login: `${this._loremIpsum.generateWords(1)}@mail.com`,
            password: this._loremIpsum.generateWords(1),
        })
    }

    generateJoke(): JokeEntity {
        return this._jokesRepository.create({
            name: this._loremIpsum.generateWords(1),
            text: this._loremIpsum.generateSentences(1),
            rate: Math.random() * 101,
            like: Math.floor(Math.random() * 101),
            view: Math.floor(Math.random() * 101),
        })
    }

    generateRole(): RoleEntity {
        return this._rolesRepository.create({
            name: this._loremIpsum.generateWords(1),
        })
    }

    generateStatus(): StatusEntity {
        return this._statusesRepository.create({
            name: this._loremIpsum.generateWords(1),
        })
    }

    generateGroup(): GroupEntity {
        return this._groupsRepository.create({
            name: this._loremIpsum.generateWords(2),
            shortName: this._loremIpsum.generateWords(1),
        })
    }

    generateLevel(): LevelEntity {
        return this._levelsRepository.create({
            name: this._loremIpsum.generateWords(1),
        })
    }

    generateUserInGroup(): UserInGroupEntity {
        return this._usersInGroupsRepository.create()
    }

    async findAllUsers(): Promise<UserEntity[]> {
        return await this._usersRepository.find({
            relations: ['status', 'role', 'jokes', 'groups'],
        })
    }
}
