import { Route } from "@yellow-snow/core";
import { HttpRoute } from "@yellow-snow/http/lib";
import { DocumentController } from "./controllers/document.controller";

export const routes: Array<Route<any>> = [
    new HttpRoute("/convert", "post", DocumentController, "convertDocToPdf"),
];
