import fs from 'fs/promises'
import path from 'path'
import {fileURLToPath} from 'url'

const metaUrl=import.meta.url
const filePath=fileURLToPath(metaUrl)
const dirName=path.dirname(filePath)

const dbPath=path.join(dirName,'./db.json')

export function add(...args){
	return args.reduce((acc,n)=>acc+Number(n),0);
	
}

export const readDb=async ()=>{
	const db=JSON.parse(await fs.readFile(dbPath,'utf-8'))
	//console.log(notes)
	return db
}


export const addDb=async (note)=>{
	const noteObj={
		content:note,
		id:Date.now()
	}
	const db=await readDb()
	db.notes.push(noteObj)
	await writeDb(db)
	return noteObj
} 

const writeDb=async (db)=>{
	await fs.writeFile(dbPath,JSON.stringify(db),null,2)
	return db
} 

export const delDb=async (id)=>{
	const db=await readDb()
	const delNote=db.notes.find(note=>note.id==id)
	const dbFilter=db.notes.filter(note=>note.id!=id)
	db.notes=dbFilter
	await writeDb(db)
	return delNote
}


