const { database, username, password } = require(__dirname + '/config/dbConfig');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      user: process.env.DB_USER || username,
      password: process.env.DB_USER_PASS || password,
      database: process.env.DB || database,
    }
  },

  // production: {
  //   client: 'mysql',
  //   connection: process.env.JAWSDB_URL,
  //   migrations: {
  //     directory: __dirname + '/migrations'
  //   },
  //   seeds: {
  //     directory: __dirname + '/seeds'
  //   }
  // },

  ...knexSnakeCaseMappers()
  
};
