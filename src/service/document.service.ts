import exec from "async-exec";
import * as fs from "fs";
import { config } from "../config";
export class DocumentService {
  public config = config;
  public async convertDocToPdf(
    name: string, dir: string, fileExtensions: string, file: any,
  ): Promise<string> {
    try {
      console.log(`converting ${name} to pdf...`);
      await fs.writeFileSync(`${dir + name}.${fileExtensions}`, file.data);
      await exec(
        `soffice --headless --convert-to pdf ${dir + name}.${fileExtensions} --outdir ${this.config.data_dir}`);
      console.log(`converted ${name} to pdf`);
      return `${this.config.data_dir}/${name}.pdf`;
    } catch (e) {
      console.log(e);
      return ``;
    }
  }
}
