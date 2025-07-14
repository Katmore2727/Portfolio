import React from 'react'

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React.js", level: 90, color: "from-blue-500 to-cyan-500" },
        { name: "JavaScript", level: 85, color: "from-yellow-500 to-orange-500" },
        { name: "HTML/CSS", level: 95, color: "from-orange-500 to-red-500" },
        { name: "Tailwind CSS", level: 88, color: "from-cyan-500 to-blue-500" }
        // { name: "TypeScript", level: 75, color: "from-blue-600 to-blue-800" },
        // { name: "Next.js", level: 80, color: "from-gray-700 to-black" }
      ]
    },
    {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 82, color: "from-green-500 to-green-700" },
        { name: "Express.js", level: 78, color: "from-gray-500 to-gray-700" },
        // { name: "Python", level: 70, color: "from-blue-500 to-yellow-500" },
        { name: "MongoDB", level: 75, color: "from-green-400 to-green-600" },
        // { name: "PostgreSQL", level: 68, color: "from-blue-400 to-blue-600" },
        { name: "REST APIs", level: 85, color: "from-purple-500 to-pink-500" }
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git/GitHub", level: 90, color: "from-gray-700 to-black" },
        // { name: "Docker", level: 65, color: "from-blue-500 to-cyan-500" },
        // { name: "AWS", level: 60, color: "from-orange-500 to-yellow-500" },
        { name: "Figma", level: 70, color: "from-purple-500 to-pink-500" }
        // { name: "Jest", level: 75, color: "from-red-500 to-pink-500" },
        // { name: "Webpack", level: 65, color: "from-blue-400 to-blue-600" }
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            My <span className="text-blue-600">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-blue-600 font-semibold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 text-center mb-8">
            Other Skills & Technologies
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "Redux", "Sass", "Bootstrap", "Material-UI",
              "Socket.io", "Performance", "Accessibility"
            ].map((skill, index) => (
              <div 
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                <span className="text-gray-700 text-sm font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Currently Learning
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              // { name: "Rust", icon: "🦀" },
              // { name: "WebAssembly", icon: "⚡" },
              { name: "Machine Learning", icon: "🤖" },
              { name: "Blockchain", icon: "⛓️" }
            ].map((tech, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-300 rounded-lg p-4 hover:from-blue-500/30 hover:to-blue-600/30 transition-all duration-300"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-blue-600 font-medium">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills 