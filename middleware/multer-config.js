import multer from 'multer';
import fs from 'fs';


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
},
dir = './public/posts/images'
;
let storage = "";

try {
    if(!fs.existsSync(dir)) {
        fs.mkdir(dir, { recursive: true }, function(err) {
            if (err) {
                console.log(err)
            } else {
                storage = multer.diskStorage({
                    destination: (req, file, callback) => {
                        callback(null, './public/posts/images');
                    },
                    filename: (req, file, callback) => {
                        const name = file.originalname.split(' ').join('_');
                        const extension = MIME_TYPES[file.mimetype];
                        callback(null, name + Date.now() + '.' + extension);
                    }
                });
                console.log("New directory successfully created.");
            }
        })
    } else {
        storage = multer.diskStorage({
            destination: (req, file, callback) => {
              callback(null, './public/posts/images');
            },
            filename: (req, file, callback) => {
              const name = file.originalname.split(' ').join('_');
              const extension = MIME_TYPES[file.mimetype];
              callback(null, name + Date.now() + '.' + extension);
            }
        });
    }
} catch (error) {
    console.log(error);
}

export default  multer({storage: storage}).single('image');