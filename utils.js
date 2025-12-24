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
const getNext=async ()=>{
        const db=await readDb();
        return db.next;
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

const writeDb=async (db,nextIdx='')=>{
	db.next=nextIdx!==''?nextIdx:await getNext();
	await fs.writeFile(dbPath,JSON.stringify(db),null,4)
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

export const updateNext=async ()=>{
	const db =await readDb();
	let curIdx=await getNext();
	if(curIdx<db.notes.length-1){
		curIdx++;
		//console.log(db.next)
		writeDb(db,curIdx);
		return db.notes[curIdx];
	}else{
		const reset=0;
		writeDb(db,reset);
		return "\n-------- cycling Notes again ------------\n";
	}
}
