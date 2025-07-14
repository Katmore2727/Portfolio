#!/bin/bash

# Portfolio Projects Setup Script
# This script helps you create all the GitHub repositories and set up your projects

echo "🚀 Portfolio Projects Setup Script"
echo "=================================="

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username is required!"
    exit 1
fi

# Projects array
projects=(
    "ecommerce-platform"
    "task-management-app"
    "weather-dashboard"
    "blog-platform"
    "portfolio-website"
    "api-gateway"
)

echo ""
echo "📋 Projects to create:"
for project in "${projects[@]}"; do
    echo "  - $project"
done

echo ""
read -p "Do you want to proceed? (y/n): " confirm

if [[ $confirm != [yY] ]]; then
    echo "❌ Setup cancelled."
    exit 0
fi

# Create projects directory
mkdir -p portfolio-projects
cd portfolio-projects

echo ""
echo "🔧 Setting up projects..."

# Setup Weather Dashboard (simplest to start with)
echo "📁 Setting up Weather Dashboard..."
mkdir weather-dashboard
cd weather-dashboard

# Copy template files
cp -r ../../weather-dashboard-template/* .

# Update README with correct username
sed -i "s/yourusername/$GITHUB_USERNAME/g" README.md

# Create package.json for deployment
cat > package.json << EOF
{
  "name": "weather-dashboard",
  "version": "1.0.0",
  "description": "A beautiful weather dashboard with real-time data",
  "main": "index.html",
  "homepage": "https://$GITHUB_USERNAME.github.io/weather-dashboard",
  "scripts": {
    "start": "python -m http.server 8000",
    "dev": "python -m http.server 8000",
    "predeploy": "echo 'Ready to deploy'",
    "deploy": "gh-pages -d ."
  },
  "keywords": ["weather", "dashboard", "api", "javascript"],
  "author": "$GITHUB_USERNAME",
  "license": "MIT",
  "devDependencies": {
    "gh-pages": "^3.2.3"
  }
}
EOF

# Create .gitignore
cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
EOF

# Initialize git
git init
git add .
git commit -m "Initial commit: Weather Dashboard"

echo "✅ Weather Dashboard setup complete!"

cd ..

# Setup other project templates
for project in "${projects[@]:1}"; do
    echo "📁 Setting up $project..."
    mkdir $project
    cd $project
    
    # Create basic structure
    case $project in
        "ecommerce-platform")
            # React frontend + Node.js backend
            npx create-react-app frontend --yes
            mkdir backend
            cd backend
            npm init -y
            npm install express mongoose cors dotenv stripe jsonwebtoken bcryptjs
            cd ..
            ;;
        "task-management-app")
            # React with Firebase
            npx create-react-app . --yes
            npm install firebase @mui/material @emotion/react @emotion/styled redux react-redux
            ;;
        "blog-platform")
            # Next.js with Prisma
            npx create-next-app@latest . --typescript --tailwind --eslint --yes
            npm install prisma @prisma/client next-auth
            ;;
        "portfolio-website")
            # Copy current portfolio
            cp -r ../../src .
            cp ../../package.json .
            cp ../../vite.config.js .
            cp ../../index.html .
            ;;
        "api-gateway")
            # Node.js API gateway
            npm init -y
            npm install express redis jsonwebtoken rate-limiter-flexible cors helmet
            ;;
    esac
    
    # Create README
    cat > README.md << EOF
# $project

A brief description of the $project.

## Features
- Feature 1
- Feature 2
- Feature 3

## Technologies Used
- Technology 1
- Technology 2
- Technology 3

## Live Demo
[View Live Demo](https://$GITHUB_USERNAME.github.io/$project)

## Installation
\`\`\`bash
git clone https://github.com/$GITHUB_USERNAME/$project.git
cd $project
npm install
npm start
\`\`\`

## Usage
Describe how to use the project.

## Contributing
Pull requests are welcome.

## License
MIT
EOF
    
    # Create .gitignore
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/
.next/
out/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
EOF
    
    # Initialize git
    git init
    git add .
    git commit -m "Initial commit: $project"
    
    echo "✅ $project setup complete!"
    cd ..
done

echo ""
echo "🎉 All projects setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Get your OpenWeatherMap API key from https://openweathermap.org/api"
echo "2. Update the API key in weather-dashboard/script.js"
echo "3. Create GitHub repositories for each project:"
for project in "${projects[@]}"; do
    echo "   - https://github.com/new (name: $project)"
done
echo "4. Push each project to its repository:"
echo "   cd portfolio-projects/[project-name]"
echo "   git remote add origin https://github.com/$GITHUB_USERNAME/[project-name].git"
echo "   git push -u origin main"
echo "5. Enable GitHub Pages for each repository"
echo "6. Update your portfolio links in src/components/Projects.jsx"
echo ""
echo "🚀 Happy coding!" 