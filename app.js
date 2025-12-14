#!/usr/bin/env node
import {readDb,addDb,delDb} from './utils.js';

const argv=process.argv;
//console.log(argv)


if(argv.length===2){
	const db=await readDb()
	if(db.notes.length>0){
	db.notes.forEach((note,idx)=>{
	console.log(`----------${idx+1}----------`)
	console.log(`id: ${note.id}`)
	console.log(`note: ${note.content} \n`)
	
	})
	}else{
		console.log("No Notes Add soemthing using --add tag.")
	}


}
else if(argv[2]==="--add"){
	if(argv[3]){
		const note=await addDb(argv[3])
		console.log(note)
	}else{

		console.log("Please type something affter using --add")
	}
}
else if(argv[2]==="--del"){
	 if(argv[3]){
                const note=await delDb(argv[3])
                console.log(note)
        }else{

                console.log("Please give id of note to delete.")
        }
}
