import express from 'express'
import multer from 'multer';

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({storage: storage})


router.post('/psted', upload.single("file"), (req, res) => {
    try{
        console.log('upload complete');
        res.status(201).json('upload complete')
    }catch(error){
        console.log('fail to upload', error.message);
        res.status(500).json({error: 'fail to upload'})
    }
})


export default router