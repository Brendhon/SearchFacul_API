require('dotenv').config() // Utilizando as variáveis de ambiente do arquivo .env

// Update with your config settings.
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME || "",
      user:     process.env.DB_USERNAME || "",
      password: process.env.DB_PASSWORD || ""
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME_TEST || "",
      user:     process.env.DB_USERNAME || "",
      password: process.env.DB_PASSWORD || ""
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  }
};
