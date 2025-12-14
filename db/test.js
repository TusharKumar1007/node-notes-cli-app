import fs from 'fs/promises'
import path from "path"
import {fileURLToPath} from "url"

const metaUrl=import.meta.url
console.log(metaUrl)

const currentFilePath=fileURLToPath(metaUrl)
console.log(currentFilePath)

const dirName=path.dirname(currentFilePath)
console.log(dirName)

const readPackJson=async ()=>{
	console.log(JSON.parse(await fs.readFile('../package.json','utf-8')))
}

readPackJson()
