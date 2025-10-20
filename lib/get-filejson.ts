import fs from 'fs';
import path from 'path';

export function getFileJson(filePath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const json = JSON.parse(data);
        resolve(json);
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}
