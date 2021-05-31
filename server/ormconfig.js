require('dotenv').config();

const devConfig = [
  {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: process.env.POSTGRES_NAME,
    entities: [
      './src/app/models/*.ts',
    ],
    migrations:[
      './src/database/migrations/*.ts'
    ],
    cli: {
      migrationsDir: './src/database/migrations',
    }
  }
]

module.exports = devConfig;
