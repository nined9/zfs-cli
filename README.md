# zfs-cli
### 为项目使用不同源的项目依赖库时，方便快速安装依赖，如有特殊库的依赖可以单独指定，当前版本使用的是npm包管理工具

使用
> zfs-cli setup <registry> lib-name1 lib-name2 ...

指定lib-name1/lib-name2等等库的源为registry源

使用
> zfs-cli setup <registry> -rm/--remove lib-name1 lib-name2 ...

删除lib-name1/lib-name2等库源的指定

使用
> zfs-cli setup start

进行依赖的安装，当检测到dependencies里有上述lib-name1/lib-name2等库时，就会在安装时切换到其指定的registry源里去安装对应的库

## TODO
1、支持yarn

2、支持默认源设置

3、支持不同源库名相同时，手动选择再继续

4、支持切换不同配置文件

5、添加通用快速安装配置，特殊库依赖时的库安装速度