import React, { useState } from 'react'

const BlogDemo = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      content: "React is a powerful JavaScript library for building user interfaces. In this post, we'll explore the basics of React components and state management.",
      author: "John Doe",
      date: "2024-01-15",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: "Modern CSS Techniques",
      content: "Learn about modern CSS features like Grid, Flexbox, and CSS custom properties that make styling easier and more powerful than ever before.",
      author: "Jane Smith",
      date: "2024-01-12",
      likes: 18,
      comments: 5
    }
  ])
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', author: '' })

  const addPost = () => {
    if (newPost.title && newPost.content && newPost.author) {
      const post = {
        id: Date.now(),
        ...newPost,
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        comments: 0
      }
      setPosts([post, ...posts])
      setNewPost({ title: '', content: '', author: '' })
      setShowCreatePost(false)
    }
  }

  const likePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Blog Platform</h3>
        <p className="text-gray-600">Create, read, and interact with blog posts</p>
      </div>
      
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-800">Tech Blog</h4>
          <button 
            onClick={() => setShowCreatePost(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            + New Post
          </button>
        </div>
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Create New Post</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                placeholder="Post title..."
                className="w-full p-2 border rounded"
              />
              <input 
                type="text" 
                value={newPost.author}
                onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                placeholder="Author name..."
                className="w-full p-2 border rounded"
              />
              <textarea 
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                placeholder="Write your post content..."
                rows={8}
                className="w-full p-2 border rounded resize-none"
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowCreatePost(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={addPost}
                className="flex-1 bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
              >
                Publish Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Blog Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-bold text-gray-800 text-lg mb-1">{post.title}</h5>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <button 
                onClick={() => likePost(post.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes}</span>
              </button>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">{post.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <span>{post.comments} comments</span>
                <span>Share</span>
              </div>
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogDemo 