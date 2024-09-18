import { cleanEnv, str } from 'envalid'

export default cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'staging', 'production'], default: 'development' }),
    APP_PORT: str({ default: '3000' }),
    MONGO_URI: str(),
    MONGO_DB: str(),
    JWT_ACCESS_SECRET: str(),
    JWT_ACCESS_EXPIRATION: str(),
    JWT_REFRESH_SECRET: str(),
    JWT_REFRESH_EXPIRATION: str()
})
