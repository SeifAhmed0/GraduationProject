const fs = require('fs');

const multer = require('multer');

class upload{
    static filehendeler(req){
        let ext = req.originalname.split(".").pop()
        let name = req.path +"."+ ext
        fs.renameSync(req.path,name)
        return name
    }
}

module.exports = upload


