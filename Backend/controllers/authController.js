const db = require('../config/database')

exports.register = (req,res)=>{
    const {name,email,password,role,department,year} = req.body

    db.query(`select * from users where email = ?`,[email],(err,result)=>{
        if(result.length>0){
            return res.status(400).json({msg:"Email already exists"})
        }
        db.query(`
            insert into users(name,email,password,role,department,year)
            values(?,?,?,?,?,?)
            `,[name,email,password,role,department,year],
            (err,result)=>{
                if(err){
                    throw err
                }
                return res.status(200).json({msg: "User registered successfully"})
            })
    })
}


exports.login = (req,res)=>{
    const {email,password} = req.body

    db.query('select * from users where email=? AND password=?',[email,password],(err,result)=>{
        if(result.length === 0){
            return res.status(400).json({msg: "Invalid email or password"})
        }
        const user = result[0]
        return res.status(200).json({msg: "Login success",user})
    })
}