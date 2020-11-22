const router = require('express').Router();

const { getPosts, createPosts, getPost, updatePost, deletePost } = require('../controllers/posts');

router.route('/')
    .get(getPosts)
    .post(createPosts)

router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

module.exports = router