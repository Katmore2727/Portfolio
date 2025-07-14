import React, { useState } from 'react'

const TaskManagementDemo = () => {
  const [boards, setBoards] = useState([
    { 
      id: 'todo', 
      title: "To Do", 
      tasks: [
        { id: 1, text: "Design new logo", priority: "high" },
        { id: 2, text: "Update website content", priority: "medium" },
        { id: 3, text: "Review code changes", priority: "low" }
      ], 
      color: "bg-red-100" 
    },
    { 
      id: 'progress', 
      title: "In Progress", 
      tasks: [
        { id: 4, text: "Implement user authentication", priority: "high" },
        { id: 5, text: "Fix responsive issues", priority: "medium" }
      ], 
      color: "bg-yellow-100" 
    },
    { 
      id: 'completed', 
      title: "Completed", 
      tasks: [
        { id: 6, text: "Setup project structure", priority: "low" },
        { id: 7, text: "Install dependencies", priority: "low" }
      ], 
      color: "bg-green-100" 
    }
  ])
  const [newTask, setNewTask] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        priority: "medium"
      }
      setBoards(boards.map(board => 
        board.id === 'todo' 
          ? { ...board, tasks: [...board.tasks, newTaskObj] }
          : board
      ))
      setNewTask('')
      setShowAddTask(false)
    }
  }

  const moveTask = (taskId, fromBoardId, toBoardId) => {
    const task = boards.find(board => board.id === fromBoardId)?.tasks.find(t => t.id === taskId)
    if (task) {
      setBoards(boards.map(board => {
        if (board.id === fromBoardId) {
          return { ...board, tasks: board.tasks.filter(t => t.id !== taskId) }
        }
        if (board.id === toBoardId) {
          return { ...board, tasks: [...board.tasks, task] }
        }
        return board
      }))
    }
  }

  const deleteTask = (taskId, boardId) => {
    setBoards(boards.map(board => 
      board.id === boardId 
        ? { ...board, tasks: board.tasks.filter(t => t.id !== taskId) }
        : board
    ))
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Task Management App</h3>
        <p className="text-gray-600">Organize tasks with drag-and-drop functionality</p>
      </div>
      
      {/* Header */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-gray-800">My Tasks</h4>
          <button 
            onClick={() => setShowAddTask(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Add New Task</h3>
            <input 
              type="text" 
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task description..."
              className="w-full p-2 border rounded mb-4"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex gap-2">
              <button 
                onClick={() => setShowAddTask(false)}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button 
                onClick={addTask}
                className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Boards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boards.map((board) => (
          <div key={board.id} className="bg-white rounded-lg p-4 shadow-sm">
            <h5 className="font-bold text-gray-800 mb-3">{board.title}</h5>
            <div className={`${board.color} rounded-lg p-3 min-h-32`}>
              {board.tasks.map((task) => (
                <div key={task.id} className="bg-white rounded p-3 mb-2 shadow-sm cursor-move">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{task.text}</span>
                    <button 
                      onClick={() => deleteTask(task.id, board.id)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      ×
                    </button>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
              {board.tasks.length === 0 && (
                <div className="text-gray-400 text-center py-4 text-sm">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskManagementDemo 