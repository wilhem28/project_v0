import multer from 'multer';
import fs from 'fs';


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
},
dir = './images'
;
let storage = "";


if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, 'images');
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }
    });
} else {
    storage = multer.diskStorage({
        destination: (req, file, callback) => {
          callback(null, 'images');
        },
        filename: (req, file, callback) => {
          const name = file.originalname.split(' ').join('_');
          const extension = MIME_TYPES[file.mimetype];
          callback(null, name + Date.now() + '.' + extension);
        }
    });
}


export default  multer({storage: storage}).single('image');