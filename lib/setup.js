/*
 * @Author: Do not edit
 * @Date: 2020-09-10 10:37:44
 * @LastEditors: 黎加冬
 * @LastEditTime: 2020-09-15 15:51:14
 * @Description: 一键安装依赖包
 * @FilePath: \zfs-cli\lib\setup.js
 */
const cp = require('child_process'); 
const fs = require('fs');

function walk(packagePath, {libs, originRegistry: normalRegistry}) {
  let pkgJsonStr = "";
  try {
    pkgJsonStr = fs.readFileSync(packagePath, {encoding: "utf-8"});
  } catch (e) {
    console.error("读取packge.json文件失败: " + e);
    return;
  }
  pkg = JSON.parse(pkgJsonStr);

  const originRegistry = cp.execSync("npm get registry").toString();
  console.log("您当前的npm的源是：", originRegistry);
  // const normalRegistry = "https://registry.npm.taobao.org/";

  console.log("开始检测依赖项...");
  const backupPackages = {};
  const package2registry = {};
  let flag = false;

  Object.keys(libs).forEach(registry => {
    const packages = libs[registry];

    packages.forEach(package => {
      if (pkg && pkg.dependencies && pkg.dependencies[package]) {
        backupPackages[package] = pkg.dependencies[package];
        package2registry[package] = registry;
        delete pkg.dependencies[package];
        flag = true;
      }
    })
  });


  if (flag) {
    console.log("您的项目依赖"+Object.keys(backupPackages).join(",")+"库...");

    // console.log("正在移除packge.json里的zfs-ui@" + zfsui + "依赖库...");
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2), {encoding: "utf-8"});
    // console.log("移除packge.json里的zfs-ui@" + zfsui + "依赖库成功...");

    try {
      // console.log("正在将您的npm源切换为：" + normalRegistry);
      cp.execSync("npm config set registry " + normalRegistry, {stdio: 'inherit'});
      // console.log("切换【" + normalRegistry + "】源成功...");

      // console.log("开始执行npm i命令进行安装,请稍候一会儿...");
      // const installPkgs = Object.keys(backupPackages).reduce((installPkgs, package) => {
      //   installPkgs += package+"@"+backupPackages[package];
      //   return installPkgs;
      // }, "");
      // cp.execSync("npm i " + installPkgs, {stdio: 'inherit'});
      
      cp.execSync("npm i", {stdio: 'inherit'});
      // console.log("非zte-ui依赖库已安装完成...");
    } catch (e) {
      Object.keys(backupPackages).forEach(package => {
        pkg.dependencies[package] = backupPackages[package];
      })
      fs.writeFileSync(packagePath, pkgJsonStr, {encoding: "utf-8"});
      return;
    }
    
    Object.keys(backupPackages).forEach(package => {
      pkg.dependencies[package] = backupPackages[package];
    })
    fs.writeFileSync(packagePath, pkgJsonStr, {encoding: "utf-8"});
    // pkg.dependencies['zfs-ui'] = zfsui;
    // console.log("正在还原packge.json里zfs-ui@" + zfsui + "依赖库...");
    // fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4), {encoding: "utf-8"});
    // console.log("还原packge.json里zfs-ui@" + zfsui + "依赖库成功...");
    
    // console.log("正在将您的npm源切换为：" + zteRegistry);
    // cp.execSync("npm config set registry " + zteRegistry, {stdio: 'inherit'});
    // console.log("切换【" + zteRegistry + "】源成功...");

    // console.log("开始执行npm i命令进行安装,请稍候一会儿...");
    // cp.execSync("npm i", {stdio: 'inherit'});
    // console.log("zte-ui依赖库已安装完成...");

    Object.keys(libs).forEach(registry => {
      const packages = libs[registry];

      cp.execSync("npm config set registry " + registry, {stdio: 'inherit'});

      const installPkgs = Object.keys(packages).reduce((installPkgs, package) => {
        if (backupPackages[package]) {
          installPkgs += package+"@"+backupPackages[package];
        }
        return installPkgs;
      }, "");
      
      cp.execSync("npm i " + installPkgs, {stdio: 'inherit'});
    });

    // console.log("正在还原您的npm源：" + originRegistry);
    cp.execSync("npm config set registry " + originRegistry, {stdio: 'inherit'});
    // console.log("已成功将您的npm源还原");

  } else {
    console.log("您的项目未依赖特定库...");
    // console.log("正在将您的npm源切换为：" + normalRegistry);
    cp.execSync("npm config set registry " + normalRegistry, {stdio: 'inherit'});
    // console.log("切换【" + normalRegistry + "】源成功...");

    // console.log("开始执行npm i命令进行安装,请稍候一会儿...");
    cp.execSync("npm i", {stdio: 'inherit'});
    // console.log("安装完成！");
    
    // console.log("正在还原您的npm源：" + originRegistry);
    cp.execSync("npm config set registry " + originRegistry, {stdio: 'inherit'});
    // console.log("已成功将您的npm源还原");
    
  }
  console.log("您的项目依赖包已全部安装成功！");
}

// walk();
module.exports = walk;
