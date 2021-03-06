# `ims-p2p`

## Peer Routing

> 节点路由, 负责找到到达某个节点的可用路径，类似于我们开车时候用的导航软件

## Discovery

> 节点发现, 负责找到网络里面的可用节点

## Distributed Record Store

> 分布式记录存储, 负责记录节点相关的各种信息，便于连接管理和内容寻址

## Swarm

> 连接管理：负责管理节点之间连接的创建、维护、销毁，它相当于 libp2p 的大脑

只有找到了足够多的节点，才能获得对整个 IPFS 网络的认识。
故 libp2p 会在初始化之后不停地通过各种方式“结识”更多的节点，
包括利用 Bootstrap list、mDNS、DHT 等。
libp2p 会把这些获取到的信息存储在分布式记录存储模块中，供以后查询之用。
当上层应用需要连接某个节点时，节点路由模块会找到几种不同的路径供连接管理模块尝试（由于 P2P 网络本身的特性，节点之间的连接状况始终在动态变化，
故不是所有路径都是可以成功连接的）。连接成功之后，
libp2p 会回调上层应用来处理产生的数据，类似于快递员喊你来取快递。


1. 地址解析
2. 传输层适配
