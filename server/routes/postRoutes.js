import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// GET ALL POSTS
router.route("/").get(async (req, res) => {
    try {
        const posts = await Post.find({})

        res.status(200).json({ success: true, data: posts})
    } catch (error) {
        res.status(500).json({ success: false, message: error})
    }
})

// CREATE A POST
router.route("/").post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body

    const photoUrl = await cloudinary.uploader.upload(photo).url

    const convertToHttps = (url) => {
        if(url.startsWith("http://")) {
            var httpsURL = url.replace("http://", "https://")
            return httpsURL
        } else {
            return url
        }
        
    }

    const imageURL = convertToHttps(photoUrl)
    console.log(photoUrl)
    console.log(imageURL)


    const newPost = await Post.create({
        name,
        prompt,
        photo: imageURL
    })

    res.status(200).json({ success: true, data: newPost })
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})


// GET POSTS BY ID

export default router;
