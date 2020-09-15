# zfs-cli
![](https://img.shields.io/github/stars/nined9/zfs-cli?style=social) ![](https://img.shields.io/npm/v/zfs-cli) ![](https://img.shields.io/npm/dw/zfs-cli) ![](https://img.shields.io/npm/l/zfs-cli)
> 为项目使用不同源的项目依赖库时，方便快速安装依赖，如有特殊库的依赖可以单独指定，当前版本使用的是npm包管理工具

## Usage

`npm install -g zfs-cli`

### setup
#### 查看

`zfs-cli setup ls`
> 查看所有配置信息

`zfs-cli setup ls lib-name1 lib-name2...`
> 查看lib-name1, lib-name2 等等库设置的源

#### 添加

`zfs-cli setup registry lib-name1 lib-name2 ...`

> 指定lib-name1, lib-name2等等库的源为registry源

#### 移除

`zfs-cli setup registry -r/--remove lib-name1 lib-name2 ...`

> 移除lib-name1, lib-name2等库源的指定

`zfs-cli setup -t/--remove-registry registry`

> 移除registry源的所有库配置

#### 安装

`zfs-cli setup`

> 进行依赖的安装，当检测到dependencies里有上述lib-name1/lib-name2等库时，就会在安装时切换到其指定的registry源里去安装对应的库

#### 默认下载源设置

`zfs-cli setup -d/--default registry`

> 给未配置下载源的库设置统一的下载源

## TODO

- [ ] setup指令支持yarn
- [x] setup指令支持默认下载源设置
- [ ] setup指令支持不同源库名相同时，手动选择再继续
- [ ] setup指令支持切换不同配置文件
- [ ] setup指令添加通用快速安装配置，特殊库依赖时的库安装速度

其它指令待续...

## MIT License

Copyright (c) 2020 Nined

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
