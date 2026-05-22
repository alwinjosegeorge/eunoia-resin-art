import { c as createServerRpc } from "./createServerRpc-W1zXG6uR.js";
import { j as createServerFn } from "./server-DAJe76I7.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const getOrderFromServer_createServerFn_handler = createServerRpc({
  id: "208c039ae44223356546a00df7aad7c56f7d8a718c391fb5797206d2d14e61fe",
  name: "getOrderFromServer",
  filename: "src/routes/track.$id.tsx"
}, (opts) => getOrderFromServer.__executeServer(opts));
const getOrderFromServer = createServerFn({
  method: "GET"
}).handler(getOrderFromServer_createServerFn_handler, async ({
  data: id
}) => {
  try {
    const {
      connectToDatabase
    } = await import("./db-DGtz6qNV.js");
    const {
      Order
    } = await import("./Order-BLRCJfVf.js");
    await connectToDatabase();
    const order = await Order.findOne({
      id
    }).lean();
    if (order) {
      const plainOrder = JSON.parse(JSON.stringify(order));
      return {
        success: true,
        data: plainOrder
      };
    }
    return {
      success: false,
      error: "Order not found"
    };
  } catch (err) {
    console.error("Error in getOrderFromServer:", err);
    return {
      success: false,
      error: err.message || "Failed to fetch order"
    };
  }
});
export {
  getOrderFromServer_createServerFn_handler
};
