import fs from 'fs';

const config = JSON.parse(
  fs.readFileSync(`./config.${process.env.NODE_ENV}.json`, 'utf-8')
);

export default config;
