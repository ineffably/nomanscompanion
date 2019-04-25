import fs from 'fs';
import { transformTable } from './app/nmsutils';

export default class Transposer {

  async getFileJson(filePath) {
    console.log(`reading file: ${filePath}`);
    const file = await fs.readFile(filePath);
    return JSON.parse(file);
  }

  async transposeTableFromRoot(inFilePath, outFilePath) {
    const json = await this.getFileJson(inFilePath);
    const mapFrom = json.Data.Property;
    const result = mapFrom.map(el => { return transformTable(el); });
    const data = { data: result };
    console.log(`writing file: ${outFilePath}`);
    fs.writeFileSync(outFilePath, JSON.stringify(data, null, 2));
  }

}