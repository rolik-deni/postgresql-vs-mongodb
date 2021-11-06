import { ConfigModule, ConfigService } from '@nestjs/config'
import {
    MongooseModuleAsyncOptions,
    MongooseModuleOptions,
} from '@nestjs/mongoose'

export const mongooseConfig: MongooseModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: (configService: ConfigService): MongooseModuleOptions => {
        const uri = configService.get<string>('MONGO_URI')
        if (uri === undefined) {
            throw new Error(
                "Environment variable 'MONGO_URI' cannot be undefined",
            )
        }
        const dbName = configService.get<string>('MONGO_DB_NAME')
        if (uri === undefined) {
            throw new Error(
                "Environment variable 'MONGO_DB_NAME' cannot be undefined",
            )
        }

        return {
            uri,
            dbName,
        }
    },
    inject: [ConfigService],
}
