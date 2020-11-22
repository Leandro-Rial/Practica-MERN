const postCtrl = {};

const Posts = require('../models/Posts');

// All post
postCtrl.getPosts = async (req, res) => {
    try {
        
        const posts = await Posts.find();

        res.status(200).json(posts);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


// Create new post
postCtrl.createPosts = async (req, res) => {
    try {
        
        const { title, content } = req.body;

        const newPosts = await new Posts({ title, content });

        await newPosts.save();

        res.status(201).json({ message: 'Successfully created' })

    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}


// Edit post
postCtrl.getPost = async (req, res) => {
    try {
        
        const id = req.params.id;

        const post = await Posts.findOne({ _id: id });

        res.json(post);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

postCtrl.updatePost = async (req, res) => {
    try {
        
        const { title, content } = req.body;

        const id = req.params.id;

        await Posts.findOneAndUpdate(id, { title, content });

        res.json({ message: 'Successfully Edited' })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// Delete post
postCtrl.deletePost = async (req, res) => {
    try {
        
        const id = req.params.id;

        await Posts.findOneAndDelete({ _id: id });

        res.json({ message: 'Successfully Deleted' })

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}


module.exports = postCtrl;