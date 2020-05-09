// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/users.db2'
    },
    useNullAsDefault: true,
    // needed when using foreign keys
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done); // turn on FK enforcement
      },
    },
  },

};
