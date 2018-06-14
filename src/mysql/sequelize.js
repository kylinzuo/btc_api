const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const config = require('./config.js');

const sequelizeMysql = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  operatorsAliases: Op,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelizeMysql
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// todo => test
const User1 = sequelizeMysql.define('user1', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true 如果表已经存在，将会丢弃表
// User1.sync({force: false}).then(() => {
//   // 表已创建
//   return User1.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

User1.findAll().then(users => {
  console.log(users)
  users.forEach(d => {
    console.log(d.firstName, d.lastName);
  })
});

(async () => {
  const user = await User1.findOne();
  console.log(user.get('firstName'));
})();

module.exports = {
  sequelizeMysql
}