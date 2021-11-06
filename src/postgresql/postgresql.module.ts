import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GroupEntity } from './entities/group.entity'
import { JokeEntity } from './entities/joke.entity'
import { LevelEntity } from './entities/level.entity'
import { RoleEntity } from './entities/role.entity'
import { StatusEntity } from './entities/status.entity'
import { UserInGroupEntity } from './entities/user-in-group.entity'
import { UserEntity } from './entities/user.entity'
import { PostgresqlResolver } from './postgresql.resolver'
import { PostgresqlService } from './postgresql.service'

@Module({
    imports: [
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
    providers: [PostgresqlResolver, PostgresqlService],
})
export class PostgresqlModule {}
