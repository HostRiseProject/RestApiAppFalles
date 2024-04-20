// Importar los módulos necesarios
import { DataTypes, IntegerDataType, Model} from 'sequelize';
import { Table } from 'sequelize-typescript';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configuración de Sequelize para PostgreSQL
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

// Definir modelo de Evento con el decorador @Table
@Table({ tableName: 'evento' })
class Evento extends Model {
    id(id: any) {
        throw new Error("Method not implemented.");
    }


    
}

Evento.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: DataTypes.STRING,
  precio: DataTypes.INTEGER,
  descripcion: DataTypes.STRING,
  fecha: DataTypes.DATE
}, {
  sequelize,
  modelName: 'Evento'
});

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

// Exportar modelo de Evento
export {Evento};
