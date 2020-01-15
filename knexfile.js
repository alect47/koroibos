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
    connection: 'postgres://sztdwjemiyfvbw:a4a64b7353b31d30e5f0da44db8aa9598bb6907e0735f4a0f8a9f96148b301ca@ec2-54-174-229-152.compute-1.amazonaws.com:5432/d7o14h7ivi1cej',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
