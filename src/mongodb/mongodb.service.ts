/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { LoremIpsum } from 'lorem-ipsum'
import { Model } from 'mongoose'

import { Group, GroupDocument } from './schemas/group.schema'
import { Joke, JokeDocument } from './schemas/joke.schema'
import { Level, LevelDocument } from './schemas/level.schema'
import { Role, RoleDocument } from './schemas/role.schema'
import { Status, StatusDocument } from './schemas/status.schema'
import {
    UserInGroup,
    UserInGroupDocument,
} from './schemas/user-in-group.schema'
import { User, UserDocument } from './schemas/user.schema'

@Injectable()
export class MongodbService {
    private _loremIpsum: LoremIpsum
    constructor(
        @InjectModel(User.name)
        private readonly _userModel: Model<UserDocument>,
        @InjectModel(Joke.name)
        private readonly _jokeModel: Model<JokeDocument>,
        @InjectModel(Role.name)
        private readonly _roleModel: Model<RoleDocument>,
        @InjectModel(Status.name)
        private readonly _statusModel: Model<StatusDocument>,
        @InjectModel(Group.name)
        private readonly _groupModel: Model<GroupDocument>,
        @InjectModel(Level.name)
        private readonly _levelModel: Model<LevelDocument>,
        @InjectModel(UserInGroup.name)
        private readonly _userInGroupModel: Model<UserInGroupDocument>,
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
        const userOne = await this.generateUser()
        const userTwo = await this.generateUser()

        const jokeTwo = await this.generateJoke()
        const jokeOne = await this.generateJoke()
        jokeOne.user = userOne
        jokeTwo.user = userOne
        userOne.jokes = [jokeOne, jokeTwo]

        const role = await this.generateRole()
        role.users = [userOne]
        userOne.role = role

        const status = await this.generateStatus()
        status.users = [userOne, userTwo]
        userOne.status = status
        userTwo.status = status

        const group = await this.generateGroup()
        const level = await this.generateLevel()
        group.level = level

        const userInGroup = await this.generateUserInGroup()
        userInGroup.user = userOne
        userInGroup.group = group
        userOne.groups = [userInGroup]
        group.users = [userInGroup]

        await Promise.all([
            role.save(),
            status.save(),
            jokeOne.save(),
            jokeTwo.save(),
            userOne.save(),
            userTwo.save(),
            group.save(),
            level.save(),
            userInGroup.save(),
        ])
    }

    async removeAll(): Promise<void> {
        await Promise.all([
            this._userModel.deleteMany(),
            this._jokeModel.deleteMany(),
            this._roleModel.deleteMany(),
            this._statusModel.deleteMany(),
            this._groupModel.deleteMany(),
            this._levelModel.deleteMany(),
            this._userInGroupModel.deleteMany(),
        ])
    }

    async generateUser(): Promise<UserDocument> {
        return new this._userModel({
            name: this._loremIpsum.generateWords(1),
            surname: this._loremIpsum.generateWords(1),
            login: `${this._loremIpsum.generateWords(1)}@mail.com`,
            password: this._loremIpsum.generateWords(1),
        })
    }

    async generateJoke(): Promise<JokeDocument> {
        return new this._jokeModel({
            name: this._loremIpsum.generateWords(1),
            text: this._loremIpsum.generateSentences(1),
            rate: Math.random() * 101,
            like: Math.floor(Math.random() * 101),
            view: Math.floor(Math.random() * 101),
        })
    }

    async generateRole(): Promise<RoleDocument> {
        return new this._roleModel({
            name: this._loremIpsum.generateWords(1),
        })
    }

    async generateStatus(): Promise<StatusDocument> {
        return new this._statusModel({
            name: this._loremIpsum.generateWords(1),
        })
    }

    async generateGroup(): Promise<GroupDocument> {
        return new this._groupModel({
            name: this._loremIpsum.generateWords(2),
            shortName: this._loremIpsum.generateWords(1),
        })
    }

    async generateLevel(): Promise<LevelDocument> {
        return new this._levelModel({
            name: this._loremIpsum.generateWords(1),
        })
    }

    async generateUserInGroup(): Promise<UserInGroupDocument> {
        return new this._userInGroupModel({})
    }

    async findAllUsers(): Promise<User[]> {
        return await this._userModel
            .find()
            .populate({ path: 'status' })
            .populate({ path: 'role' })
            .populate({ path: 'jokes' })
            .populate({ path: 'groups' })
    }
}
