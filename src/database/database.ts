import { Sequelize } from 'sequelize-typescript';
import account_model from './models/account.models';
import phone_number_model from './models/phone_number.models';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(
    process.env.DB_NAME ?? '',
    process.env.DB_USER ?? '',
    process.env.DB_PASSWORD ?? '',
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        models: [__dirname + '/models']
    }
)
sequelize.addModels([account_model, phone_number_model]);

export default sequelize;