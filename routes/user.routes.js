const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const auth = require('../middleware/auth.middleware');
const multer = require("multer")

const upload = multer({ dest: 'uploads/' })

router.get('/:id', auth, async (req, res) => {
    try{
        const post = await User.findById(req.params.id).populate({path: 'activeCourse'})
            .populate({path: 'userId', select:'email -_id'});
        res.json(post)

    }catch (e) {
        res.status(500).json({ message: "Error"})
    }
})


module.exports = router
