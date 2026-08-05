import React from 'react'
import userImg from '../assets/YashIMG.jpg'

const About = () => {
  const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Completed' },
    { number: '2+', label: 'Happy Clients' },
    { number: '100%', label: 'Client Satisfaction' }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            About <span className="text-blue-600">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-80 h-80 mx-auto relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full blur-xl opacity-30"></div>
                <img src={userImg} alt="Profile" loading="lazy" className="relative w-48 h-48 rounded-full object-cover border-4 border-blue-200 shadow-lg z-10" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Building thoughtful digital products with clean engineering and strong product intuition
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              I’m a full-stack software engineer with a strong design mindset, delivering products that feel polished and function reliably. I build interfaces grounded in clear UX, accessible interactions, and maintainable React architecture.
            </p>

            <p className="text-gray-600 leading-relaxed">
              My work is focused on fast-loading experiences, intuitive navigation, and a thoughtful product-first approach. I value clear communication, smooth developer workflows, and delivering solutions that users and stakeholders appreciate.
            </p>

            <p className="text-gray-600 leading-relaxed">
              I enjoy collaborating on projects that bridge frontend craftsmanship with backend reliability. When I work on a feature, I prioritize practical delivery, quality engineering, and a great end-user experience.
            </p>

            {/* Skills Preview */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">What I do:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">Web Development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">UI/UX Design</span>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">Mobile Development</span>
                </div> */}
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-600">API Development</span>
                </div>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="mt-8">
              <a href="/Yash-Katmore-Resume.pdf" download className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block">
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 