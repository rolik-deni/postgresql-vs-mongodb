import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { config } from 'src/config/config'
import { mongooseConfig } from 'src/config/mongoose.config'

import { MongodbService } from './mongodb.service'
import { Group, GroupSchema } from './schemas/group.schema'
import { Joke, JokeSchema } from './schemas/joke.schema'
import { Level, LevelSchema } from './schemas/level.schema'
import { Role, RoleSchema } from './schemas/role.schema'
import { Status, StatusSchema } from './schemas/status.schema'
import { UserInGroup, UserInGroupSchema } from './schemas/user-in-group.schema'
import { User, UserSchema } from './schemas/user.schema'

const NUMBER_OF_ITERATIONS_DEFAULT = 1
const TERMINATION_TIME = 120000 // in two minutes
jest.setTimeout(TERMINATION_TIME)

describe('MongodbService', () => {
    let mongodbService: MongodbService
    let configService: ConfigService
    let module: TestingModule

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(config),
                MongooseModule.forRootAsync(mongooseConfig),
                MongooseModule.forFeature([
                    { name: User.name, schema: UserSchema },
                    { name: Joke.name, schema: JokeSchema },
                    { name: Role.name, schema: RoleSchema },
                    { name: Status.name, schema: StatusSchema },
                    { name: Group.name, schema: GroupSchema },
                    { name: Level.name, schema: LevelSchema },
                    { name: UserInGroup.name, schema: UserInGroupSchema },
                ]),
            ],
            providers: [MongodbService],
        }).compile()

        mongodbService = module.get<MongodbService>(MongodbService)
        configService = module.get<ConfigService>(ConfigService)

        await mongodbService.removeAll()
    })

    afterAll(async () => {
        await module.close()
    })

    it('Write', async () => {
        const iterationsNum = configService.get<number>(
            'NUMBER_OF_ITERATIONS',
            NUMBER_OF_ITERATIONS_DEFAULT,
        )
        await mongodbService.createNStructures(iterationsNum)
    })

    it('Read', async () => await mongodbService.findAllUsers())
})
