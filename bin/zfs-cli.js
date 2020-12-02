#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require("fs");
const chalk = require("chalk");

const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const chalkAnimation = require('chalk-animation');

const packageJson = require('../package.json');
const setup = require('../lib/setup');
const configJson = require('../config.json');

program.version(packageJson.version);

program
  .command('setup [registry]')
  .option("-r, --remove", "remove some packages")
  .option("-d, --default", "set default registry")
  .option("-t, --remove-registry", "remove registry")
  .description('部分库不同源，一键安装')
  .action(async (registry, cmd) => {
    if (!registry || registry === "start") {

      const data = await figlet('z f s - c l i    v ' + packageJson.version.split('.').join(' . '));
      chalkAnimation.rainbow(data).start();

      const packagePath = path.resolve(process.cwd(), "./package.json");
      const packageLockPath = path.resolve(process.cwd(), "./package-lock.json");
    
      setup(packagePath, packageLockPath, configJson);

      return;
    }
    
    if (registry === "start") {
    } else if (registry === 'ls') {
      
      const args = cmd.args.slice(1);
      if (args.length > 0) {
        const store = {};
        const { libs } = configJson;
        Object.keys(libs).forEach(curRegistry => {
          const libNames = libs[curRegistry];
          libNames.forEach(libName => {
            if (args.includes(libName)) {
              if (!store[libName]) {
                store[libName] = [];
              }
              store[libName].push(curRegistry);
            }
          });
        });
        console.log(JSON.stringify(store, null, 2));
      } else {
        console.log(JSON.stringify(configJson, null, 2));
      }
      return;
    } else if (cmd.default) {
      configJson.originRegistry = registry;
      fs.writeFileSync(path.resolve(__dirname, "../config.json"), JSON.stringify(configJson, null, 2), {encoding: 'utf-8'});
      
      return;
    } else if (cmd.removeRegistry) {
      delete configJson.libs[registry];

      fs.writeFileSync(path.resolve(__dirname, "../config.json"), JSON.stringify(configJson, null, 2), {encoding: 'utf-8'});
      return;
    }
    // setup(name)
    const packages = cmd.args.slice(1);

    const originSet = new Set(configJson.libs[registry] || []);
    if (cmd.remove) {
      packages.forEach(pkg => originSet.remove(pkg));
    } else {
      packages.forEach(pkg => originSet.add(pkg));
    }
    configJson.libs[registry] = [...originSet];
    fs.writeFileSync(path.resolve(__dirname, "../config.json"), JSON.stringify(configJson, null, 2), {encoding: 'utf-8'});
    
    // console.log(process.cwd() + '/' + 'package.json');
    console.log(path.resolve(__dirname, "../config.json"));
    console.log(configJson.libs[registry]);
    console.log(chalk.blue("设置不同源的库成功"));
  });

program
  .version(packageJson.version)
  .usage('[options] <command ...>')
  .parse(process.argv);