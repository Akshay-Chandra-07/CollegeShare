const express = require('express')
const router = express.Router()
const notesController = require('../controllers/notesController')
// const {db, upload }= require('../config/database')

// router.post('/profile/:userid/notes',upload.single('file'),(req,res)=>{
//     const {title,content,uploaded_by,department,year} = req.body;
//     const file = req.file ? req.file.filename : null;
    
//     db.query(`
//         insert into notes(title,content,uploaded_by,department,year,file_url)
//         values(?,?,?,?,?,?)
//         `,[title,content,uploaded_by,department,year,file],(err,result)=>{
//             if(err){
//                 console.log(err);
//                 return res.status(400).json({msg:"Notes cannot be created"})
//             }
//             return res.status(200).json({msg:"Notes created successfully"})
//         })
    
// })


router.post('/profile/:userid/notes',notesController.createNote)
router.get('/notesall',notesController.getAllNotes)
router.get('/department/:dept',notesController.getNotesByDept)
router.get('/department/:dept/:id',notesController.getNoteByNoteId)
router.get('/profile/:userid',notesController.getNotesByUserId)
router.delete('/profile/:userid/:id/:role',notesController.deleteNoteById)

module.exports = router