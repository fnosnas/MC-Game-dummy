# MC-Game-dummy

免费容器平台拉取镜像填写环境变量：

MC_HOST=游戏平台分配地址

MC_PORT=分配的端口

MC_USERNAME =游戏人物的名字

注意: Minecraft支持插件能用的只有 Paper、Spigot、Purpur，其中 Paper 最合适


在VPS上部署
```
docker run -d \
  --name mc-bot \
  --restart always \
  -e MC_HOST=XXX.XXX.XXX \
  -e MC_PORT=XXXX \
  -e MC_USERNAME=XXXX \
  ghcr.io/fnosnas/mc-bot:latest
