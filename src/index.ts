import * as dotenv from "dotenv";
dotenv.config();

import * as http from "http";
import type { AddressInfo } from "net";
import app from "./express";

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  const address = server.address() as AddressInfo;
  console.log(`👨‍🚀 Listening on http://${address.address}:${address.port}`);
});
