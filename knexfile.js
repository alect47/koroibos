// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/olympian_dev',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/olympian_test',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    connection: 'postgres://vyljubzbxkiexc:436f30c9296f14226e9b6177511b63fae336c179648d2cce0a6d0400d89b7a73@ec2-3-220-86-239.compute-1.amazonaws.com:5432/defgd9276a7pnu',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
