import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Edit2, Calendar, Clock, User, AlertCircle, CheckCircle, ArrowRight, ChevronUp, ChevronDown, Filter, List } from 'lucide-react'

const MainFeature = ({ activeView, projectId }) => {
  // Sample data for tasks
  const initialColumns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [
        { id: 't1', title: 'Research competitors', description: 'Analyze top 5 competitors', priority: 'Medium', assignee: 'Alex', dueDate: '2023-12-10' },
        { id: 't2', title: 'Create wireframes', description: 'Design initial wireframes for homepage', priority: 'High', assignee: 'Sarah', dueDate: '2023-12-05' },
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [
        { id: 't3', title: 'Develop API endpoints', description: 'Create RESTful API for user authentication', priority: 'High', assignee: 'Mike', dueDate: '2023-12-08' },
        { id: 't4', title: 'Design system setup', description: 'Create color palette and typography', priority: 'Medium', assignee: 'Sarah', dueDate: '2023-12-03' },
      ]
    },
    {
      id: 'review',
      title: 'Review',
      tasks: [
        { id: 't5', title: 'Code review', description: 'Review authentication module', priority: 'Medium', assignee: 'John', dueDate: '2023-12-02' },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: [
        { id: 't6', title: 'Project setup', description: 'Initialize repository and project structure', priority: 'Low', assignee: 'Mike', dueDate: '2023-11-28' },
        { id: 't7', title: 'Requirements gathering', description: 'Document initial requirements', priority: 'Medium', assignee: 'Alex', dueDate: '2023-11-25' },
      ]
    }
  ]

  const [columns, setColumns] = useState(initialColumns)
  const [activeTask, setActiveTask] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignee: '',
    dueDate: ''
  })
  const [draggedTask, setDraggedTask] = useState(null)
  const [draggedOverColumn, setDraggedOverColumn] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [filterStatus, setFilterStatus] = useState('all')

  // Reset columns when project changes
  useEffect(() => {
    setColumns(initialColumns)
  }, [projectId])

  const handleDragStart = (task, columnId) => {
    setDraggedTask({ task, sourceColumnId: columnId })
  }

  const handleDragOver = (e, columnId) => {
    e.preventDefault()
    setDraggedOverColumn(columnId)
  }

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault()
    
    if (!draggedTask) return
    
    const { task, sourceColumnId } = draggedTask
    
    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null)
      setDraggedOverColumn(null)
      return
    }
    
    // Remove task from source column
    const updatedColumns = columns.map(column => {
      if (column.id === sourceColumnId) {
        return {
          ...column,
          tasks: column.tasks.filter(t => t.id !== task.id)
        }
      }
      return column
    })
    
    // Add task to target column
    const finalColumns = updatedColumns.map(column => {
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, task]
        }
      }
      return column
    })
    
    setColumns(finalColumns)
    setDraggedTask(null)
    setDraggedOverColumn(null)
  }

  const handleTaskClick = (task) => {
    setActiveTask(task)
    setShowTaskModal(true)
  }

  const handleNewTaskSubmit = (e) => {
    e.preventDefault()
    
    if (!newTask.title.trim()) return
    
    const task = {
      id: `t${Date.now()}`,
      ...newTask
    }
    
    // Add to "To Do" column
    const updatedColumns = columns.map(column => {
      if (column.id === 'todo') {
        return {
          ...column,
          tasks: [...column.tasks, task]
        }
      }
      return column
    })
    
    setColumns(updatedColumns)
    setNewTask({
      title: '',
      description: '',
      priority: 'Medium',
      assignee: '',
      dueDate: ''
    })
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-accent/20 text-accent dark:bg-accent/30'
      case 'Medium':
        return 'bg-secondary-light/20 text-secondary-dark dark:bg-secondary-dark/30 dark:text-secondary-light'
      case 'Low':
        return 'bg-primary-light/20 text-primary-dark dark:bg-primary-dark/30 dark:text-primary-light'
      default:
        return 'bg-surface-200 text-surface-700 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  // Get all tasks from all columns
  const getAllTasks = () => {
    const allTasks = []
    columns.forEach(column => {
      column.tasks.forEach(task => {
        allTasks.push({
          ...task,
          status: column.title
        })
      })
    })
    return allTasks
  }

  // Sort tasks based on sort configuration
  const getSortedTasks = (tasks) => {
    if (!sortConfig.key) return tasks

    return [...tasks].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }

  // Handle sorting when a table header is clicked
  const requestSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  // Get sorted icon for table header
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null
    return sortConfig.direction === 'ascending' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
  }

  // Render Kanban Board View
  const renderKanbanBoard = () => (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {columns.map(column => (
          <div
            key={column.id}
            className={`w-72 flex-shrink-0 bg-surface-100/50 dark:bg-surface-800/50 rounded-xl ${
              draggedOverColumn === column.id ? 'ring-2 ring-primary/50' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="p-3 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{column.title}</h3>
                <span className="text-xs px-2 py-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                  {column.tasks.length}
                </span>
              </div>
            </div>
            
            <div className="p-2 min-h-[200px]">
              {column.tasks.map(task => (
                <motion.div
                  key={task.id}
                  layoutId={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  onClick={() => handleTaskClick(task)}
                  className="bg-white dark:bg-surface-700 p-3 rounded-lg shadow-sm mb-2 cursor-pointer border border-surface-200 dark:border-surface-600 hover:shadow-md transition-shadow duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-medium mb-2 line-clamp-2">{task.title}</h4>
                  
                  <div className="flex justify-between items-center mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    
                    <div className="flex items-center text-xs text-surface-500 dark:text-surface-400">
                      <Clock size={12} className="mr-1" />
                      <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {column.id === 'todo' && (
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="w-full p-2 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg text-surface-500 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors duration-200 flex items-center justify-center"
                >
                  <Plus size={16} className="mr-1" />
                  <span>Add Task</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Render Table View
  const renderTableView = () => {
    const allTasks = getAllTasks()
    const filteredTasks = filterStatus === 'all' 
      ? allTasks 
      : allTasks.filter(task => task.status === filterStatus)
    const sortedTasks = getSortedTasks(filteredTasks)

    return (
      <div className="bg-white dark:bg-surface-800 rounded-lg">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex justify-between items-center">
          <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400">
            <Filter size={16} />
            <span>Filter by status:</span>
            <select 
              className="input py-1 px-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              {columns.map(column => (
                <option key={column.id} value={column.title}>{column.title}</option>
              ))}
            </select>
          </div>
          <button 
            onClick={() => setShowTaskModal(true)}
            className="btn btn-primary flex items-center gap-2 py-1"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-100 dark:bg-surface-700">
              <tr>
                <th 
                  className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300 cursor-pointer"
                  onClick={() => requestSort('title')}
                >
                  <div className="flex items-center gap-1">
                    <span>Task</span>
                    {getSortIcon('title')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300 cursor-pointer"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    {getSortIcon('status')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300 cursor-pointer"
                  onClick={() => requestSort('priority')}
                >
                  <div className="flex items-center gap-1">
                    <span>Priority</span>
                    {getSortIcon('priority')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300 cursor-pointer"
                  onClick={() => requestSort('assignee')}
                >
                  <div className="flex items-center gap-1">
                    <span>Assignee</span>
                    {getSortIcon('assignee')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-medium text-surface-700 dark:text-surface-300 cursor-pointer"
                  onClick={() => requestSort('dueDate')}
                >
                  <div className="flex items-center gap-1">
                    <span>Due Date</span>
                    {getSortIcon('dueDate')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map(task => (
                <tr 
                  key={task.id}
                  className="border-b border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-700/50 cursor-pointer transition-colors duration-150"
                  onClick={() => handleTaskClick(task)}
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-surface-500 dark:text-surface-400 line-clamp-1">{task.description}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-surface-200 dark:bg-surface-600">
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs mr-2">
                        {task.assignee.charAt(0)}
                      </div>
                      <span>{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center text-surface-500 dark:text-surface-400">
                      <Calendar size={14} className="mr-2" />
                      <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {sortedTasks.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-surface-500 dark:text-surface-400">
                    No tasks found. Add a new task or change your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Render Gantt Chart View (simplified for MVP)
  const renderGanttChart = () => (
    <div className="bg-white dark:bg-surface-800 rounded-lg p-6 text-center">
      <div className="flex items-center justify-center h-40">
        <div className="text-surface-500 dark:text-surface-400">
          <Calendar size={48} className="mx-auto mb-4 opacity-50" />
          <p>Gantt Chart view will be available in the next update.</p>
          <button className="mt-4 btn btn-outline">Request Early Access</button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="border-b border-surface-200 dark:border-surface-700 px-6 py-4 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeView === 'kanban' 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            Kanban Board
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeView === 'table' 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            <div className="flex items-center gap-1">
              <List size={16} />
              <span>Table View</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('gantt')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              activeView === 'gantt' 
                ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
            }`}
          >
            Gantt Chart
          </button>
        </div>
      </div>
      
      {activeView === 'kanban' && renderKanbanBoard()}
      {activeView === 'table' && renderTableView()}
      {activeView === 'gantt' && renderGanttChart()}
      
      {/* Task Modal */}
      <AnimatePresence>
        {showTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowTaskModal(false)
              setActiveTask(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-surface-200 dark:border-surface-700">
                <h3 className="text-lg font-semibold">
                  {activeTask ? 'Task Details' : 'Create New Task'}
                </h3>
                <button 
                  onClick={() => {
                    setShowTaskModal(false)
                    setActiveTask(null)
                  }}
                  className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors duration-200"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-4">
                {activeTask ? (
                  <div>
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2">{activeTask.title}</h2>
                      <p className="text-surface-600 dark:text-surface-400">{activeTask.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <AlertCircle size={16} className="mr-2 text-surface-500 dark:text-surface-400" />
                        <div>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Priority</p>
                          <p className="font-medium">{activeTask.priority}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-surface-500 dark:text-surface-400" />
                        <div>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Assignee</p>
                          <p className="font-medium">{activeTask.assignee}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-surface-500 dark:text-surface-400" />
                        <div>
                          <p className="text-xs text-surface-500 dark:text-surface-400">Due Date</p>
                          <p className="font-medium">{new Date(activeTask.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {activeTask.status && (
                        <div className="flex items-center">
                          <CheckCircle size={16} className="mr-2 text-surface-500 dark:text-surface-400" />
                          <div>
                            <p className="text-xs text-surface-500 dark:text-surface-400">Status</p>
                            <p className="font-medium">{activeTask.status}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-end gap-2 mt-6">
                      <button className="btn btn-outline flex items-center gap-1">
                        <Edit2 size={16} />
                        <span>Edit</span>
                      </button>
                      <button className="btn btn-primary flex items-center gap-1">
                        <ArrowRight size={16} />
                        <span>Move Forward</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleNewTaskSubmit}>
                    <div className="mb-4">
                      <label htmlFor="title" className="label">Task Title</label>
                      <input
                        id="title"
                        type="text"
                        className="input"
                        placeholder="Enter task title"
                        value={newTask.title}
                        onChange={e => setNewTask({...newTask, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="description" className="label">Description</label>
                      <textarea
                        id="description"
                        className="input min-h-[100px]"
                        placeholder="Enter task description"
                        value={newTask.description}
                        onChange={e => setNewTask({...newTask, description: e.target.value})}
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="priority" className="label">Priority</label>
                        <select
                          id="priority"
                          className="input"
                          value={newTask.priority}
                          onChange={e => setNewTask({...newTask, priority: e.target.value})}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="assignee" className="label">Assignee</label>
                        <input
                          id="assignee"
                          type="text"
                          className="input"
                          placeholder="Enter assignee name"
                          value={newTask.assignee}
                          onChange={e => setNewTask({...newTask, assignee: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="dueDate" className="label">Due Date</label>
                      <input
                        id="dueDate"
                        type="date"
                        className="input"
                        value={newTask.dueDate}
                        onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowTaskModal(false)}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary flex items-center gap-1"
                      >
                        <CheckCircle size={16} />
                        <span>Create Task</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature