# `ims-fs-cid`

> 文件内容寻址

# 项目有项目拥有者，拥有者有私钥和公钥，通过私钥，拥有者可管理映射。

```ts
// 获取某个文件或文件夹
get(项目名 + 目录名)->rootHash;

// 缓存
rootHash->cache

// 全世界缓存
```

资源地址:rootHash

// 文件内容寻址编码系统
// 每个目录包含子目录，每个目录下面有多个文件，每个文件有一个 hashRoot
// 上级目录由下级目录及下级文件的 hashRoot 生成 hashRoot
// 整个项目有其下子目录生成 hashRoot
// 每次修改都会更新 hashRoot
// 发布时发布到区块链网络中，根据 hashRoot 可以访问到整个项目
// 通过子目录的 hashRoot，可以访问到子目录
// 内容编码规范
// 文件类型:文件内容
// 域名/\*_/_ --> rootHash
