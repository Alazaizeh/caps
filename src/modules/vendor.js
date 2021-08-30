"use strict";
const event = require("../../events");

setTimeout(() => {
  let payload = {
    store: "1-206-flowers",
    orderID: "e3669048-7313-427b-b6cc-74010ca1f8f0",
    customer: "Jamal Braun",
    address: "Schmittfort, LA",
  };

  event.emit("pickup", payload);
}, 5000);

event.on("pre-delivery", (payload) => {
  console.log(`thank you for delivering ${payload.orderID}`);
  event.emit("delivered", payload);
});
module.exports = event;
