import React, { useState } from 'react'
import WeatherDashboardDemo from './demos/WeatherDashboardDemo'
import EcommerceDemo from './demos/EcommerceDemo'
import TaskManagementDemo from './demos/TaskManagementDemo'
import BlogDemo from './demos/BlogDemo'
import ApiGatewayDemo from './demos/ApiGatewayDemo'
import TicTacToeDemo from './demos/TicTacToeDemo'

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [activeTab, setActiveTab] = useState('demo')

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
      longDescription: "This e-commerce solution includes user registration and authentication, product catalog with search and filtering, shopping cart functionality, secure payment processing, order management, and an admin dashboard for inventory control. Built with React.js, Node.js, Express.js, MongoDB, and styled with Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs", "Git/GitHub"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      features: ["User Authentication", "Product Management", "Shopping Cart", "Payment Integration", "Admin Dashboard", "Responsive Design"],
      demoContent: "ecommerce"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      longDescription: "A modern task management application featuring real-time collaboration, drag-and-drop task organization, team workspaces, progress tracking, and deadline management. Built with React.js, Redux, Material-UI, and styled with Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
      technologies: ["React.js", "Redux", "Material-UI", "Tailwind CSS", "REST APIs", "Git/GitHub"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Real-time Updates", "Drag & Drop", "Team Collaboration", "Progress Tracking", "Task Assignment", "Priority Levels"],
      demoContent: "task-management"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard that displays current weather and 7-day forecast using OpenWeatherMap API.",
      longDescription: "An interactive weather application that provides current weather conditions and a 7-day forecast. Features include temperature charts, humidity graphs, wind speed indicators, and a beautiful, responsive design. Built with React.js, JavaScript, and styled with Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=500&h=300&fit=crop",
      technologies: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs", "Git/GitHub"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Current Weather", "7-day Forecast", "Responsive Design", "Location Search"],
      demoContent: "weather"
    },
    {
      id: 4,
      title: "Blog Platform",
      description: "A modern blog platform with markdown support, user authentication, and admin dashboard for content management.",
      longDescription: "A full-featured blogging platform with markdown editor, user authentication, comment system, and admin dashboard. Built with React.js, Node.js, Express.js, MongoDB, and styled with Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&h=300&fit=crop",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Git/GitHub"],
      category: "fullstack",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Markdown Editor", "User Authentication", "Comment System", "Admin Dashboard", "Responsive Design"],
      demoContent: "blog"
    },
    {
      id: 5,
      title: "Tic-Tac-Toe",
      description: "A classic Tic-Tac-Toe game built using JavaScript, HTML, and CSS. Play against a friend in a simple, interactive UI.",
      longDescription: "This Tic-Tac-Toe game features a clean and responsive design, allowing two players to compete in turns. The game logic is implemented in JavaScript, with a user-friendly interface created using HTML and styled with CSS. It includes win detection, draw handling, and a reset option for replaying.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop",
      technologies: ["JavaScript", "HTML", "CSS"],
      category: "frontend",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Two Player Mode", "Win Detection", "Draw Handling", "Responsive Design", "Reset Option"],
      demoContent: "tic-tac-toe"
    },
    {
      id: 6,
      title: "API Gateway",
      description: "A microservices API gateway with rate limiting, authentication, and request routing for multiple backend services.",
      longDescription: "A robust API gateway designed for microservices architecture. Includes features like rate limiting, authentication middleware, request routing, load balancing, and comprehensive logging. Built with Node.js, Express.js, and styled with Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&h=300&fit=crop",
      technologies: ["Node.js", "Express.js", "REST APIs", "Git/GitHub"],
      category: "backend",
      liveUrl: "#",
      githubUrl: "#",
      features: ["Rate Limiting", "Authentication", "Request Routing", "Load Balancing", "Comprehensive Logging"],
      demoContent: "api-gateway"
    }
  ]

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'fullstack', label: 'Full Stack' }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setShowModal(true)
    setActiveTab('demo')
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedProject(null)
    setActiveTab('demo')
  }

  const renderDemoContent = (project) => {
    switch (project.demoContent) {
      case 'weather':
        return <WeatherDashboardDemo />
      case 'ecommerce':
        return <EcommerceDemo />
      case 'task-management':
        return <TaskManagementDemo />
      case 'blog':
        return <BlogDemo />
      case 'api-gateway':
        return <ApiGatewayDemo />
      case 'tic-tac-toe':
        return <TicTacToeDemo />
      default:
        return <div className="text-center text-gray-500">Demo not available</div>
    }
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills in web development, 
            from frontend interfaces to full-stack applications.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 cursor-pointer rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                )}
                {/* Click indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                    Click to view details
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project);
                    }}
                    className="flex-1 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  >
                    Live Demo
                  </button>
                  {/* <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // For now, show a message that GitHub repo will be available soon
                      alert('GitHub repository will be available soon! This project is currently in development.');
                    }}
                    className="flex-1 border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 text-center py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    Code
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Interested in working together? Let's discuss your project!
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Project Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {selectedProject.featured && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedProject.title}</h2>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'demo'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Live Demo
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === 'info'
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Project Info
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'demo' ? (
                <div className="min-h-[500px]">
                  {renderDemoContent(selectedProject)}
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setActiveTab('demo')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      Try Live Demo
                    </button>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-center py-3 px-6 rounded-lg font-medium transition-all duration-300"
                    >
                      View Code
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects 