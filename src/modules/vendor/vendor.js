"use strict";
const io = require("socket.io-client");
const event = io.connect("http://localhost:3000");
const uuid = require("uuid").v4; // random uuid

let payload = {
  store: "1-206-flowers",
  orderID: `${uuid()}`,
  customer: "Jamal Braun",
  address: "Schmittfort, LA",
};

event.emit("vendorGetAll");

event.on("post-delivery", (payload) => {
  setTimeout(() => {
    console.log(`thank you for delivering ${payload.orderID}`);
    event.emit("delivered", payload);
  }, 5000);
});

event.emit("pickup", payload);
