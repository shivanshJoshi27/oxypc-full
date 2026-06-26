import { createStartServer } from "@tanstack/react-start/server";
import { createRouter } from "./router";

export default createStartServer({
  createRouter,
});
