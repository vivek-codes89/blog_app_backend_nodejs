const Post = require('../models/Post'); // Import Post model

// Get all posts with pagination
// ✅ Get all posts with pagination
exports.getAllPosts = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // default to page 1 and limit 10
  
      const posts = await Post.find()
        .skip((page - 1) * limit) // Skipping posts based on current page
        .limit(parseInt(limit)) // Limiting the number of posts returned
        .exec();
  
      const totalPosts = await Post.countDocuments(); // Total number of posts
  
      res.status(200).json({
        message: "Posts fetched successfully",
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching posts", error });
    }
  };
  

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching post', error: err.message });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  
  // Check if required fields are provided
  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }

  try {
    const newPost = new Post({
      title,
      content,
      author,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);  // Log the error

    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ message: 'Title, content, and author are required' });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
};
