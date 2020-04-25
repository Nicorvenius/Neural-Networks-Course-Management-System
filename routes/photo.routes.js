const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const auth = require('../middleware/auth.middleware');
const path = require('path');

const multer = require("multer")
const upload = multer({dest: 'uploads/'})

router.get('/:id', function (req, res) {
    res.sendFile(path.resolve(process.cwd() + `/uploads/${req.params.id}`));
})

router.post('/upload/:id', auth, upload.single('file'), async (req, res) => {
    try {
        const uploadPhoto = await User.findById(req.params.id)
        console.log(uploadPhoto);
        console.log(req.file)
        uploadPhoto.photo = req.file.filename;
        await uploadPhoto.save()
        res.status(201).json({message: 'ok'})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
})


module.exports = router
