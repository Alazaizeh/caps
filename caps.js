"use strict";

// const io = require("socket.io")(3000);
const io = require("socket.io")(3000);
const uuid = require("uuid").v4; // random uuid

const queue = {
  orders: {},
  transit: {},
};

io.on("connection", (event) => {
  event.on("driverGetAll", () => {
    Object.keys(queue.orders).forEach((id) => {
      io.emit("post-Pickup", queue.orders[id]);
    });
  });
  event.on("vendorGetAll", () => {
    Object.keys(queue.transit).forEach((id) => {
      io.emit("post-delivery", queue.transit[id]);
    });
  });
  event.on("pickup", (payload) => {
    console.log("Event ", {
      event: "pickup",
      time: new Date().toISOString(),
      payload: payload,
    });

    let id = uuid();
    queue.orders[id] = payload;

    io.emit("post-Pickup", payload);
  });

  event.on("in-transit", (payload) => {
    console.log("Event ", {
      event: "in-transit",
      time: new Date().toISOString(),
      payload: payload,
    });

    let id = uuid();
    queue.transit[id] = payload;

    let Qkeys = Object.keys(queue.orders);
    for (let i = 0; i < Qkeys.length; i++) {
      delete queue.orders[Qkeys[i]];
    }

    io.emit("post-Transit", payload);
  });

  event.on("post-delivery", (payload) => {
    console.log("Event ", {
      event: "delivered",
      time: new Date().toISOString(),
      payload: payload,
    });
    io.emit("post-delivery", payload);
  });

  event.on("delivered", () => {
    let Qkeys = Object.keys(queue.transit);
    for (let i = 0; i < Qkeys.length; i++) {
      delete queue.transit[Qkeys[i]];
    }
  });
  console.log("done");
});
