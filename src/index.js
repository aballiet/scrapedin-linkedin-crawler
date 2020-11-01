const { system } = require('faker');
const scrapedin = require('scrapedin')
const configFile = require('../config.json')
const crawl = require('./crawler')
const client = require('./elasticConnection');

const config = {
  email: process.env.SCRAPEDIN_EMAIL || configFile.email,
  password: process.env.SCRAPEDIN_PASSWORD || configFile.password,
  hasToLog: configFile.hasToLog,
  isHeadless: configFile.isHeadless,
  puppeteerArgs: configFile.puppeteerArgs
}

if(configFile.elasticsearch != null){
  //======= Check that Elasticsearch is up and running =======\\
  client.ping(
    function(error) {
      if (error) {
          console.error('Elasticsearch cluster is down!');
      } else {
          console.log('Elasticsearch is connected');  
      }
    }
  );
}

if(configFile.cookiesFile && configFile.cookiesFile.length) {
  const fs = require('fs')
  const cookies = fs.readFileSync(configFile.cookiesFile)
  config.cookies = JSON.parse(cookies)
}

scrapedin(config)
  .then((profileScraper) => crawl(profileScraper, configFile.rootProfiles))
