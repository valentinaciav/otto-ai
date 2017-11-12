#!/bin/sh

# Install nodeJS
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v7.7.1.sh | bash
ln -svf /opt/nodejs/yarn /usr/bin/yarn

# Install base libraries
apt-get -y install sox libsox-fmt-mp3 opus-tools 

# Insall node dependencies globally
npm -g install rpio
ln -svf /root/grpc/build/Release/grpc_node.node ./node_modules/grpc/src/node/extension_binary/node-v57-linux-arm/grpc_node.node

# Install deps
npm install --only=prod