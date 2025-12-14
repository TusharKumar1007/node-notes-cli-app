import fs from 'fs/promises';
import path from 'path';
import {fileURLToPath} from 'url';

const metaUrl=import.meta.url;

const filePath=fileURLToPath(metaUrl);

console.log(metaUrl);
const dirName=path.dirname(filePath);
console.log(filePath);
console.log(dirName);
const packagePath=path.join(dirName,'package.json');

const reader=async ()=>{
	console.log(JSON.parse(await fs.readFile(packagePath,'utf-8')));

}
reader();
