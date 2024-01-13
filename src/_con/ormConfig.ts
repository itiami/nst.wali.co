import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '192.168.1.235',
    port: 5432,
    username: 'numan',
    password: '2204',
    database: 'nDB',
    schema: 'nodeJS',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true, // set to false in production
};
