import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'

import { config } from 'src/config/config'
import { typeOrmConfig } from 'src/config/typeorm.config'

import { GroupEntity } from './entities/group.entity'
import { JokeEntity } from './entities/joke.entity'
import { LevelEntity } from './entities/level.entity'
import { RoleEntity } from './entities/role.entity'
import { StatusEntity } from './entities/status.entity'
import { UserInGroupEntity } from './entities/user-in-group.entity'
import { UserEntity } from './entities/user.entity'
import { PostgresqlService } from './postgresql.service'

const NUMBER_OF_ITERATIONS_DEFAULT = 1
const TERMINATION_TIME = 60000 // in one minute
jest.setTimeout(TERMINATION_TIME)

describe('postgresqlService', () => {
    let postgresqlService: PostgresqlService
    let configService: ConfigService
    let module: TestingModule

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(config),
                TypeOrmModule.forRootAsync(typeOrmConfig),
                TypeOrmModule.forFeature([
                    UserEntity,
                    JokeEntity,
                    RoleEntity,
                    StatusEntity,
                    GroupEntity,
                    LevelEntity,
                    UserInGroupEntity,
                ]),
            ],
            providers: [PostgresqlService],
        }).compile()

        postgresqlService = module.get<PostgresqlService>(PostgresqlService)
        configService = module.get<ConfigService>(ConfigService)

        await postgresqlService.removeAll()
    })

    afterAll(async () => {
        await module.close()
    })

    it('Write', async () => {
        const iterationsNum = configService.get<number>(
            'NUMBER_OF_ITERATIONS',
            NUMBER_OF_ITERATIONS_DEFAULT,
        )
        await postgresqlService.createNStructures(iterationsNum)
    })

    it('Read', async () => await postgresqlService.findAllUsers())
})
