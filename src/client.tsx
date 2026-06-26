import { StartClient, hydrateRoot } from "@tanstack/react-start/client";
import { createRouter } from "./router";

const router = createRouter();

hydrateRoot(document, <StartClient router={router} />);
