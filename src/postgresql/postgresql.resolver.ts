import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class PostgresqlResolver {
    @Query(() => String)
    async ping(): Promise<string> {
        return 'pong'
    }
}
