const {Router} = require('express')
const router = Router()
const Course = require('../models/Course');
const auth = require('../middleware/auth.middleware');
const User = require('../models/User')

const path = require('path');

const multer = require("multer")
const upload = multer({dest: 'uploads/'})

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        res.status(201).json({message: 'ok', photo: req.file.filename})
    } catch (e) {
        res.status(400).json({message: e.message});
    }
})





router.post('/create', auth, async (req, res) => {
    try{
        const post = new Course(req.body);

        await post.save()

        res.status(201).json({post})

    }catch (e) {
        res.status(400).json({ message: e.message});
    }
});
router.delete('/remove/:id', auth, async (req, res) => {
    try{

        const {user_id} = req.body;
        //Check user post
        const post = await Course.findById(req.params.id)

        if (post.userId.toString() === req.user.userId){
            //remove
            console.log('remove');
            const remove = await Course.findOneAndRemove(req.params.id)
            await remove.save()
        }else{
            res.status(500).json({ message: 'You are not owner this post'});
        }
    }catch (e) {
        res.status(400).json({ message: e});
    }
});

router.get('/', async (req, res) => {
    try{
        const post = await Course.find()
            .populate({path: 'catId', select:'name -_id'})
            .populate({path: 'userId', select:'email -_id'});
        res.json(post)
    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})

router.post('/:id', auth, async (req, res) => {
    try{
        console.log(req.body.userId)
        const post = await Course.findById(req.params.id).populate({path: 'catId'})
            .populate({path: 'userId', select:'email -_id'});

        const user = await User.findById(req.body.userId)
        console.log(user.activeCourse.indexOf(req.params.id))
        if (user.activeCourse.indexOf(req.params.id) === -1){
            user.activeCourse.push(req.params.id);
            await user.save()
        }

        res.json(post)

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})
router.get('/user/:id', auth, async (req, res) => {
    try{
        console.log(req.params.id)
        const post = await Course.find({userId: req.params.id}).populate({path: 'catId'})
            .populate({path: 'userId', select:'email -_id'});
        res.json(post)

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})
router.put('/edit/:id', auth, async (req, res) => {
    try{
        const post = await Course.findById(req.params.id)
        if (post.userId.toString() === req.user.userId){
            const update = await post.overwrite({ title: req.body.title, content: req.body.content, photo: req.body.photo, userId: req.body.userId, Date: post.Date });
            await update.save()
            res.status(201).json({success: 'success'})
        }else{
            res.status(500).json({ message: 'You are not owner this post'});
        }
    }catch (e) {
        res.status(500).json({ message: e});
    }
});

module.exports = router
