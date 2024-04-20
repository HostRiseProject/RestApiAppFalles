// Importar los módulos necesarios
import { DataTypes, Model } from 'sequelize';
import { Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Table } from 'sequelize-typescript';

// Importar los modelos
import { Cuota } from './Cuota.model';
import { Evento } from './Evento.model';
import { Alergia } from './Alergia.model';

dotenv.config();

// Configuración de Sequelize para PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL);

@Table({
  tableName: 'usuarios'
})
// Definir modelo de Usuario
class Usuario extends Model {

  alergias: Alergia[] = [];
  cuotas: Cuota[] = [];
  eventos: Evento[] = [];

  static associate() {
    // Definir las relaciones
    this.hasMany(Evento, { as: 'Evento', foreignKey: 'usuarioId' });
    this.hasMany(Cuota, { as: 'Cuota', foreignKey: 'usuarioId' });
    this.belongsToMany(Alergia, { through: 'UsuarioAlergia', foreignKey: 'usuarioId' });
  }



  async setEvento(evento: Evento) {
    await Evento.create;
  }
  setCuota(cuota: Cuota) {
    
  }
  setAlergias(alergia: Alergia) {
      this.alergias.push(alergia);
  }


}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,

    autoIncrement: true
  },
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    //unique: true
  },
  phone: DataTypes.STRING,
  direccion: DataTypes.STRING,
  admin: DataTypes.BOOLEAN,
  username: {
    type: DataTypes.STRING,
    //unique: true
  },
  password: DataTypes.STRING, // No se define aquí como set() porque se manejará con el método setPassword()
  foto: DataTypes.BLOB,
  token_acceso: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Usuario',
  tableName: 'usuario'

  
});

// Definir relaciones
Usuario.belongsToMany(Evento, { through: 'UsuarioEvento'});
Evento.belongsToMany(Usuario, { through: 'UsuarioEvento' });

Usuario.hasMany(Cuota, { as: 'Cuotas', foreignKey: 'usuarioId' });
Cuota.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.belongsToMany(Alergia, { through: 'UsuarioAlergia' });
Alergia.belongsToMany(Usuario, { through: 'UsuarioAlergia' });

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados con la base de datos.');
  })
  .catch((error) => {
    console.error('Error al sincronizar modelos:', error);
  });

// Exportar modelos y la instancia de Sequelize
export { sequelize, Usuario, Evento, Cuota, Alergia };

