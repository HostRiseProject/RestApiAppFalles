// Importar los módulos necesarios
import { DataTypes, Model } from 'sequelize';
import { Table } from 'sequelize-typescript';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configuración de Sequelize para PostgreSQL
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Definir modelo de Alergia con el decorador @Table
@Table({ tableName: 'alergia' })
class Alergia extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }
}

Alergia.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  foto: DataTypes.BLOB,
  nombre: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Alergia'
});

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

// Exportar modelo de Alergia
export {Alergia};
