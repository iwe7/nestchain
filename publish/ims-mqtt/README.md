# `ims-mqtt`

> TODO: 物联网协议之一：MQTT 协议

# 简介

MQTT是一个客户端服务端架构的发布/订阅模式的消息传输协议。它的设计思想是轻巧、开放、简单、规范，易于实现。这些特点使得它对很多场景来说都是很好的选择，特别是对于受限的环境如机器与机器的通信（M2M）以及物联网环境（IoT）

MQTT 协议（Message Queuing Telemetry Transport），
翻译过来就是遥信消息队列传输，是 IBM 公司于 1999 年提出的，
现在最新版本是 3.1.1。MQTT 是一个基于 TCP 的发布订阅协议，
设计的初始目的是为了极有限的内存设备和网络带宽很低的网络不可靠的通信，
非常适合物联网通信。

# MQTT 支持三种 QOS 等级

- QoS 0：“最多一次”，消息发布完全依赖底层 TCP/IP 网络。分发的消息可能丢失或重复。例如，这个等级可用于环境传感器数据，单次的数据丢失没关系，因为不久后还会有第二次发送。
- QoS 1：“至少一次”，确保消息可以到达，但消息可能会重复。
- QoS 2：“只有一次”，确保消息只到达一次。例如，这个等级可用在一个计费系统中，这里如果消息重复或丢失会导致不正确的收费。

# MQTT 的消息类型

- connect-连接服务端
- connack-确认连接请求
- publish-发布消息
- puback-发布确认
- pubrel-发布释放
- pubcomp-发布完成
- subscribe-订阅
- suback-订阅确认
- unsubscribe-取消订阅
- unsuback-取消订阅确认
- pingreq-心跳
- pingresp-心跳响应
- disconnect-断开连接

## Usage

```
const imsMqtt = require('ims-mqtt');

// TODO: DEMONSTRATE API
```
