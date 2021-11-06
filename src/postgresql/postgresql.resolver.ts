import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { PostgresqlService } from './postgresql.service'

@Resolver()
export class PostgresqlResolver {
    constructor(private readonly _postgresqlService: PostgresqlService) {}

    @Mutation(() => String)
    async createSeveralStructure(@Args('n') n: number): Promise<string> {
        await this._postgresqlService.createNStructures(n)
        return 'Done!'
    }

    @Mutation(() => String)
    async removeAll(): Promise<string> {
        await this._postgresqlService.removeAll()
        return 'Done!'
    }

    @Query(() => String)
    async findAllUsers(): Promise<string> {
        await this._postgresqlService.findAllUsers()
        return 'Done!'
    }
}
