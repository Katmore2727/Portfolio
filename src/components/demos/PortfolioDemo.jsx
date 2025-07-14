import React, { useState } from 'react'
import userImg from '../../assets/YashIMG.jpg'

const PortfolioDemo = () => {
  const [activeSection, setActiveSection] = useState('home')

  const sections = [
    { id: 'home', title: 'Home', icon: '🏠' },
    { id: 'about', title: 'About', icon: '👤' },
    { id: 'projects', title: 'Projects', icon: '💼' },
    { id: 'skills', title: 'Skills', icon: '⚡' },
    { id: 'contact', title: 'Contact', icon: '📧' }
  ]

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="text-center flex flex-col items-center">
            <img src={userImg} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg border-4 border-blue-200" />
            <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome to My Portfolio</h2>
            <p className="text-gray-600 mb-6">Full-stack developer passionate about creating amazing web experiences</p>
            <div className="flex gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                View My Work
              </button>
              <a href="/Yash-Katmore-Resume.pdf" download className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold">
                Download Resume
              </a>
            </div>
          </div>
        )
      case 'about':
        return (
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={userImg} alt="Profile" className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-blue-200 mb-6 md:mb-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-600 mb-4">
                I'm a passionate developer with 3+ years of experience in web development. 
                I specialize in React, Node.js, and modern web technologies.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Experience</h4>
                  <p className="text-sm text-gray-600">3+ years in web development</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Education</h4>
                  <p className="text-sm text-gray-600">Computer Science Degree</p>
                </div>
              </div>
              <a href="/Yash-Surendra-Katmore-Resume.pdf" download className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Download Resume
              </a>
            </div>
          </div>
        )
      case 'projects':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "E-commerce Platform", tech: "React.js, Node.js, Express.js, MongoDB", status: "Live" },
                { name: "Task Management App", tech: "React.js, Redux, Material-UI", status: "Live" },
                { name: "Weather Dashboard", tech: "React.js, APIs", status: "Live" },
                { name: "Blog Platform", tech: "React.js, Node.js, Express.js, MongoDB", status: "Live" }
              ].map((project, index) => (
                <div key={index} className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{project.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{project.tech}</p>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'skills':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Skills & Technologies</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "React.js", level: 90 },
                { name: "JavaScript", level: 85 },
                { name: "HTML/CSS", level: 95 },
                { name: "Tailwind CSS", level: 88 },
                { name: "Node.js", level: 82 },
                { name: "Express.js", level: 78 },
                { name: "MongoDB", level: 75 },
                { name: "REST APIs", level: 85 },
                { name: "Git/GitHub", level: 90 },
                { name: "Figma", level: 70 }
              ].map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center">
                  <h4 className="font-semibold mb-2">{skill.name}</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>
        )
      case 'contact':
        return (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <p>📧 email@example.com</p>
                  <p>📱 +1 (555) 123-4567</p>
                  <p>📍 New York, NY</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Send Message</h4>
                <div className="space-y-3">
                  <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
                  <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                  <textarea placeholder="Message" rows={3} className="w-full p-2 border rounded"></textarea>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Portfolio Website</h3>
        <p className="text-gray-600">Multi-section portfolio with smooth navigation</p>
      </div>
      {/* Navigation */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === section.id
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content Area */}
      <div className="bg-white rounded-lg p-6 min-h-96">
        {renderSectionContent()}
      </div>
    </div>
  )
}

export default PortfolioDemo 