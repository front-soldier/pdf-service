import { HttpRouter } from "@yellow-snow/http";
import * as cors from "cors";
import * as express from "express";
import * as fileUpload from "express-fileupload";
import { config } from "./config";
import { routes } from "./routes";
const app = express();
export class StartApp {
  public static startApp: any = () => {
    const router = new HttpRouter(routes);
    app.use(fileUpload());
    app.use(cors());
    router.init(app);
    app.listen(config.port);
    return app;
  }
}

module.exports = StartApp.startApp();
