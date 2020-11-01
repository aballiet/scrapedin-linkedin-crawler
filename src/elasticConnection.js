const { Client } = require('@elastic/elasticsearch')
const config     = require('../config.json')
const elk        = config.elasticsearch

const client = new Client({
   node: elk.host,
   auth: {
      username: elk.user,
      password: elk.password
    }
});

module.exports = client;