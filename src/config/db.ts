import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config()
// const {
//   DATABASE_HOST,
//   DATABASE_PORT,
//   DATABASE_USERNAME,
//   DATABASE_PASSWORD,
//   DATABASE_NAME
// } = process.env;
// // console.log("NOMBRE HOST"+ DATABASE_HOST, DATABASE_NAME, DATABASE_PORT, DATABASE_USERNAME)
// if (!DATABASE_HOST || !DATABASE_PORT || !DATABASE_USERNAME || !DATABASE_PASSWORD || !DATABASE_NAME) {
//   throw new Error('Faltan variables de entorno necesarias para la conexion a la base de datos.');
// }

const sequelize = new Sequelize(process.env.DATABASE_URL!);

export default sequelize;