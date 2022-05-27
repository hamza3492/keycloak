import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import Keycloak from '../keycloak/keycloak.entity';
import Posts from '../posts/post.entity';
import Blogs from '../blogs/blogs.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            // logger: new DatabaseLogger(),
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'keycloak',
            //! To check database logs in console "logging:true"
            // logging: true,
            entities: [
                Keycloak, Posts, Blogs
            ],
            synchronize: true,
        })
    ],
})
export class DatabaseModule { }