#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const fs = require("fs");
const chalk = require("chalk");

const packageJson = require('../package.json');
const setup = require('../lib/setup');
const configJson = require('../config.json');

program.version(packageJson.version);

program
  .command('setup <registry>')
  .option("-rm, --remove", "remove some packages")
  .description('部分库不同源，一键安装')
  .action((registry, cmd) => {
    if (registry === "start") {

      const packagePath = path.resolve(process.cwd(), "./package.json");
    
      setup(packagePath, configJson);

      return;
    }
    // setup(name)
    console.log(registry);
    const packages = cmd.args.slice(1);
    console.log(packages);
    console.log(cmd.remove);

    const originSet = new Set(configJson[registry] || []);
    if (cmd.remove) {
      packages.forEach(pkg => originSet.remove(pkg));
    } else {
      packages.forEach(pkg => originSet.add(pkg));
    }
    configJson[registry] = [...originSet];
    fs.writeFileSync(path.resolve(__dirname, "../config.json"), JSON.stringify(configJson, null, 2), {encoding: 'utf-8'});
    
    // console.log(process.cwd() + '/' + 'package.json');
    console.log(path.resolve(__dirname, "../config.json"));
    console.log(configJson);
    console.log(chalk.blue("设置不同源的库成功"));
  });

program
  .version(packageJson.version)
  .usage('[options] <command ...>')
  .parse(process.argv);