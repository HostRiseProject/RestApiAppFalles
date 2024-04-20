// Importar los módulos necesarios
import { DataTypes, IntegerDataType, Model } from 'sequelize';
import { Table } from 'sequelize-typescript';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configuración de Sequelize para PostgreSQL
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Definir modelo de Cuota con el decorador @Table
@Table({ tableName: 'cuota' })
class Cuota extends Model {
  id: IntegerDataType;
}

Cuota.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo: DataTypes.ENUM('tipo1', 'tipo2'),
  completada: DataTypes.BOOLEAN,
  estado: DataTypes.ENUM('estado1', 'estado2'),
  fecha_inicio: DataTypes.DATE,
  fecha_fin: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Cuota'
});

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

// Exportar modelo de Cuota
export {Cuota};
