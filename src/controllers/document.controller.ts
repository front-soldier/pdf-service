import { HttpController } from "@yellow-snow/http";
import * as path from "path";
import { Resolve } from "tsnode-di";
import * as uuidv1 from "uuid/v1";
import { DocumentService } from "../service/document.service";

export class DocumentController extends HttpController {
  @Resolve(DocumentService)
  public docService!: DocumentService;
  public async convertDocToPdf(): Promise<any> {
    const name = uuidv1();
    const dir = "/tmp/";
    let file: any;
    let fileExtensions: any;
    if (this.req.files) {
      file = { ...this.req.files.file };
      const fileExtensionsArr = file.name.split(".");
      fileExtensions = fileExtensionsArr.slice(-1)[0];
      if (fileExtensions === "doc" || fileExtensions === "docx") {
        const result = await this.docService.convertDocToPdf(
          name, dir, fileExtensions, file);
        this.setPdfResponseHeaders(fileExtensionsArr);
        const res_path = path.posix.normalize(result);
        return this.res.sendFile(res_path);
      } else {
        return this.res.status(415).send({ error: "Wrong file type" });
      }
    } else {
      this.res.status(400).send({ error: "File not found" });
    }
  }
  private setPdfResponseHeaders = (fileExtensionsArr: [string]) => {
    this.res.setHeader("Content-Disposition", "attachment; " +
      "filename=\"" + fileExtensionsArr.slice(0, -1).concat() + ".pdf\"");
    this.res.setHeader("Content-Transfer-Encoding", "binary");
    this.res.setHeader("Content-Type", "application/octet-stream");
  }
}
