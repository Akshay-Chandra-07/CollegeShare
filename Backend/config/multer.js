const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage(
    {
        destination : function(req,file,cb){
            cb(null,'D:/MEAN/CollgeShare/uploads')
        },
    
        filename: function(req,file,cb){
            // const uniqueSuffix = Math.round(Math.random() * 1E4); 
            // const originalName = file.originalname.split('.')[0]; 
            // const truncatedName = originalName.substring(0, 10); 
            // const fileExtension = path.extname(file.originalname); 
            cb(null, file.originalname);
        }
    }
)

const upload = multer({storage: storage}).single('file')

module.exports = upload;