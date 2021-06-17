import io from "socket.io-client";
import feathers from "@feathersjs/client";

// import auth from '@feathersjs/authentication-client';
// import feathers from '@feathersjs/client';
// import socketio from '@feathersjs/socketio-client';
// const rx = require('feathers-reactive/dist/feathers-reactive');

// Configure socket
const socket = io("http://localhost:3030");

// @ts-ignore
const client: any = feathers();
client.configure(feathers.socketio(socket));


export default client;
