import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (config: ConfigService) => ({
            type: 'postgres',
            // ssl: {
            //   rejectUnauthorized: false,
            // },
            synchronize: true, // This for development
            autoLoadEntities: true,
            url: config.get<string>('DATABASE_URL'),

        }),
        inject: [ConfigService]
    })],
})
export class DatabaseModule { }
