import React, { useState, useEffect } from 'react'

const ApiGatewayDemo = () => {
  const [requests, setRequests] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    error: 0,
    avgResponseTime: 0
  })

  useEffect(() => {
    // Simulate incoming API requests
    const interval = setInterval(() => {
      const newRequest = {
        id: Date.now(),
        method: ['GET', 'POST', 'PUT', 'DELETE'][Math.floor(Math.random() * 4)],
        endpoint: ['/api/users', '/api/products', '/api/orders', '/api/auth'][Math.floor(Math.random() * 4)],
        status: Math.random() > 0.1 ? 200 : 500,
        responseTime: Math.floor(Math.random() * 1000) + 100,
        timestamp: new Date().toISOString()
      }
      
      setRequests(prev => [newRequest, ...prev.slice(0, 9)])
      
      // Update stats
      setStats(prev => ({
        total: prev.total + 1,
        success: prev.success + (newRequest.status === 200 ? 1 : 0),
        error: prev.error + (newRequest.status !== 200 ? 1 : 0),
        avgResponseTime: Math.round((prev.avgResponseTime * prev.total + newRequest.responseTime) / (prev.total + 1))
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status) => {
    return status === 200 ? 'text-green-600' : 'text-red-600'
  }

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-blue-100 text-blue-700',
      POST: 'bg-green-100 text-green-700',
      PUT: 'bg-yellow-100 text-yellow-700',
      DELETE: 'bg-red-100 text-red-700'
    }
    return colors[method] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">API Gateway</h3>
        <p className="text-gray-600">Real-time API request monitoring and analytics</p>
      </div>
      
      {/* Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Requests</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.success}</div>
          <div className="text-sm text-gray-600">Successful</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{stats.error}</div>
          <div className="text-sm text-gray-600">Errors</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.avgResponseTime}ms</div>
          <div className="text-sm text-gray-600">Avg Response</div>
        </div>
      </div>

      {/* Live Requests */}
      <div className="bg-white rounded-lg p-4">
        <h4 className="font-bold text-gray-800 mb-4">Live Requests</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(request.method)}`}>
                  {request.method}
                </span>
                <span className="text-sm font-mono text-gray-700">{request.endpoint}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
                <span className="text-sm text-gray-500">{request.responseTime}ms</span>
                <span className="text-xs text-gray-400">
                  {new Date(request.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="bg-white rounded-lg p-4 mt-4">
        <h4 className="font-bold text-gray-800 mb-4">Available Endpoints</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { method: 'GET', endpoint: '/api/users', description: 'Get all users' },
            { method: 'POST', endpoint: '/api/users', description: 'Create new user' },
            { method: 'GET', endpoint: '/api/products', description: 'Get all products' },
            { method: 'PUT', endpoint: '/api/products/:id', description: 'Update product' },
            { method: 'GET', endpoint: '/api/orders', description: 'Get all orders' },
            { method: 'DELETE', endpoint: '/api/orders/:id', description: 'Delete order' }
          ].map((endpoint, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(endpoint.method)}`}>
                {endpoint.method}
              </span>
              <span className="text-sm font-mono text-gray-700">{endpoint.endpoint}</span>
              <span className="text-xs text-gray-500">{endpoint.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ApiGatewayDemo 