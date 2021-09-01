"use strict";
const io = require("socket.io-client");
const event = io.connect("http://localhost:3000");

event.emit("driverGetAll");

event.on("post-Pickup", (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderID}`);
    event.emit("in-transit", payload);
  }, 1000);
});

event.on("post-Transit", (payload) => {
  setTimeout(() => {
    console.log(`DRIVER: delivered  up ${payload.orderID}`);
    event.emit("post-delivery", payload);
  }, 3000);
});
