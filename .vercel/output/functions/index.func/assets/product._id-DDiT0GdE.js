import { c as createServerRpc } from "./createServerRpc-W1zXG6uR.js";
import { j as createServerFn } from "./server-DAJe76I7.js";
import "node:async_hooks";
import "node:stream";
import "node:stream/web";
import "util";
import "crypto";
import "async_hooks";
import "stream";
const getProductFromServer_createServerFn_handler = createServerRpc({
  id: "9002f3a6ed88f5cd34fea0f99fdc18841d17219c7404a8be43b7e5913627d422",
  name: "getProductFromServer",
  filename: "src/routes/product.$id.tsx"
}, (opts) => getProductFromServer.__executeServer(opts));
const getProductFromServer = createServerFn({
  method: "GET"
}).handler(getProductFromServer_createServerFn_handler, async ({
  data: id
}) => {
  try {
    const {
      connectToDatabase
    } = await import("./db-DGtz6qNV.js");
    const {
      Product
    } = await import("./Product-CT5CWCn6.js");
    await connectToDatabase();
    const product = await Product.findOne({
      id
    }).lean();
    if (product) {
      const plainProduct = JSON.parse(JSON.stringify(product));
      return {
        success: true,
        data: plainProduct
      };
    }
    return {
      success: false,
      error: "Product not found"
    };
  } catch (err) {
    console.error("Error in getProductFromServer:", err);
    return {
      success: false,
      error: err.message || "Failed to fetch product"
    };
  }
});
export {
  getProductFromServer_createServerFn_handler
};
