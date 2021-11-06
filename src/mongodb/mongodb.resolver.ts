import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'

import { MongodbService } from './mongodb.service'

@Resolver()
export class MongodbResolver {
    constructor(private readonly _mongodbService: MongodbService) {}

    @Mutation(() => String)
    async createSeveralStructure(@Args('n') n: number): Promise<string> {
        await this._mongodbService.createNStructures(n)
        return 'Done!'
    }

    @Mutation(() => String)
    async removeAll(): Promise<string> {
        await this._mongodbService.removeAll()
        return 'Done!'
    }

    @Query(() => String)
    async findAllUsers(): Promise<string> {
        await this._mongodbService.findAllUsers()
        return 'Done!'
    }
}
