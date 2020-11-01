const client = require('./elasticConnection');
const dependencies = {
  fs: require('fs'),
  config: require('../config.json')
}

module.exports = (profileId, content, injection) => {
  const { fs, config } = Object.assign({}, dependencies, injection)

  if (!fs.existsSync(config.saveDirectory)) {
    fs.mkdirSync(config.saveDirectory, { recursive: true })
  }

  if (config.elasticsearch != null){
    // We will send the content to the specified elasticsearch server
    client.index({ 
      index: config.elasticsearch.index,
      body:  JSON.stringify(content, undefined, 2)
    }), (err, resp, status) => {
      console.log(resp);
    }
  }

  return fs.writeFileSync(`${config.saveDirectory}/${profileId}.json`, JSON.stringify(content, undefined, 2))
}
