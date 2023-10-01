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


const handleUpload = async (photo) => {
    try {
        // Upload the image to Cloudinary
        const res = await cloudinary.uploader.upload(photo);
        res.status(200).json({success: true, message: "Photo Uploaded to cloudinary"})
        console.log("success upload to cloudinary")
        return res
    } catch (error) {
        console.error(error)
        res.status(500).json({messgae: "couldn't upload photo"})
    }

}

// CREATE A POST
router.route("/").post(async (req, res) => {
    try {
      const { name, prompt, photo } = req.body;
      const image = await handleUpload(photo)
      console.log(image.url)
      const imageURL =  image.url
      res.json(image)
  
      const newPost = await Post.create({
        name,
        prompt,
        photo: imageURL,
      });

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        console.log(req.body)
        res.status(500).json({ success: false, message: "File couldn't be uploaded", error: error.message });
    }
  });
  
  
// GET POSTS BY ID

export default router;