module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/snacks_development'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
