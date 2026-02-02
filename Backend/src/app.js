const express = require('express')
const multer = require('multer')
const uploadFile = require("./service/storage.service")
const postModel = require("./models/post.model")
const cors = require("cors")


const app = express()

app.use(express.json())
app.use(cors())
const upload = multer({storage: multer.memoryStorage()})


app.post('/create-post', upload.single("image"), async (req,res)=>{

    try{
        //check file
        if(!req.file) return res.status(400).send("No image")
            // upload to imageKit
            const uploadResult = await uploadFile(req.file.buffer)
            //Save to mongoDB
            const newPost = await postModel.create({
                caption : req.body.caption,
                image: uploadResult.url
            })
            //print in console
             console.log(newPost)


            res.status(201).json({
                message:"Post created Successfully.",
                post:newPost
            })
    }catch(err){
        res.status(500).send(err.message)
    }
}

)

app.get('/posts', async (req, res) => {
    try {
        const showPost = await postModel.find({})

        res.status(200).json({
            message: "Post fetched successfully",
            posts: showPost
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = app            