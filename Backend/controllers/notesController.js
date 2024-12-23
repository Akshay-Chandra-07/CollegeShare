const { query, json } = require('express');
const db = require('../config/database')
const upload = require('../config/multer')

// exports.createNote = (req,res)=>{
//     const {title,content,uploaded_by,department,year} = req.body;
//     const file = req.file ? req.file.filename : null;

//     db.query(`
//         insert into notes(title,content,uploaded_by,department,year)
//         values(?,?,?,?,?)
//         `,[title,content,uploaded_by,department,year],(err,result)=>{
//             if(err){
//                 console.log(err);
//                 return res.status(400).json({msg:"Notes cannot be created"})
//             }
//             return res.status(200).json({msg:"Notes created successfully"})
//         })
    
// }
exports.createNote = ((req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            return res.status(400).json({ error: err.message });
        }
        const {title,content,uploaded_by,department,year} = req.body;
        const file = req.file ? `http://localhost:5000/api/department/:dept/:id/${req.file.filename}` : null;
        db.query(`
        insert into notes(title,content,uploaded_by,department,year,file_url)
        values(?,?,?,?,?,?)
        `,[title,content,uploaded_by,department,year,file],(err,result)=>{
            if(err){
                console.log(err);
                return res.status(400).json({msg:"Notes cannot be created"})
            }
            return res.status(200).json({msg:"Notes created successfully"})
        })
    })
})

exports.getAllNotes = (req,res)=>{
    db.query(`select * from notes`,(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({msg:"Error getting notes"})
        }
        if(result.length===0){
            return res.status(200).json({msg:"No notes available to display"},result)
        }
        return res.status(200).json(result)
    })
}

exports.getNotes = (req,res)=>{
    const {department,year} = req.params;

    db.query(`select * from notes where department = ? AND year = ?`,
        [department,year],
        (err,result)=>{
            if(err){
                console.log(err);
                return res.status(400).json({msg:"Notes not found"})
            }
            return res.status(200).json(result)
        }
    )
}



exports.getNotesByDept = (req,res)=>{
    const {dept} = req.params;
    console.log(dept)
    db.query(`
        select * from notes where department = ?
        `,[dept],(err,result)=>{
            if(err){
                console.log(err)
                return res.status(400).json({msg:"Error while getting notes"})
            }
            if(result.length===0){
                console.log("Notes DB Empty");
                return res.status(200).json({msg:"No notes in this department"})
            }
            return res.status(200).json(result)
        })
}

exports.getNoteByNoteId = (req,res)=>{
    const {dept,id} = req.params;
    console.log(dept,id)
    db.query(`select * from notes where id=?`,[id],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(400).json({msg:"Error while getting note"})
        }
        if(result.length==0){
            return res.status(200).json({msg: "No notes found"})
        }
        return res.status(200).json(result)
    })
}

exports.getNotesByUserId = (req,res)=>{
    const userid = req.params.userid;
    db.query(`select * from notes where uploaded_by=?`,[userid],(err,result)=>{
        if(err){
            console.log(err);
            return res.status(400).json({msg:"Error Occured in profile"})
        }
        if(result.length==0){
            return res.status(200).json({msg:"You have no notes to display"})
        }
        return res.status(200).json(result)
    })
}

exports.deleteNoteById = (req,res)=>{
    const userid = req.params.userid
    const id = req.params.id
    const role = req.params.role
    console.log(userid,id,role)
    db.query(`
        select * from notes where id = ? AND (uploaded_by = ? or ?="admin")
        `,[id,userid,role],(err,result)=>{
            if(result.length === 0){
                return res.status(200).json({msg: "You cannot delete this note"});
            }
            db.query(`
                delete from notes where id = ?
                `,[id],(err,result)=>{
                    if(err){
                        return res.status(400).json({msg:"Error while deleting"})
                    }
                    return res.status(200).json({msg:"Note deleted!"})
                })
        })
}