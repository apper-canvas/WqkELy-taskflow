import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ChevronDown, Clock, CheckCircle2, AlertCircle, BarChart2 } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const Home = () => {
  const [activeTab, setActiveTab] = useState('kanban')
  const [showProjectMenu, setShowProjectMenu] = useState(false)
  
  // Sample project data
  const projects = [
    { id: 1, name: "Website Redesign", tasks: 12, completed: 5, dueDate: "2023-12-15" },
    { id: 2, name: "Mobile App Development", tasks: 24, completed: 18, dueDate: "2023-11-30" },
    { id: 3, name: "Marketing Campaign", tasks: 8, completed: 2, dueDate: "2023-12-05" }
  ]
  
  const [selectedProject, setSelectedProject] = useState(projects[0])
  
  // Sample task statistics
  const taskStats = [
    { name: "To Do", count: 7, color: "bg-surface-400" },
    { name: "In Progress", count: 4, color: "bg-primary" },
    { name: "Review", count: 3, color: "bg-secondary" },
    { name: "Done", count: 5, color: "bg-green-500" }
  ]
  
  // Sample upcoming tasks
  const upcomingTasks = [
    { id: 1, title: "Design homepage mockup", priority: "High", dueDate: "Today", status: "In Progress" },
    { id: 2, title: "API integration", priority: "Medium", dueDate: "Tomorrow", status: "To Do" },
    { id: 3, title: "User testing", priority: "High", dueDate: "In 2 days", status: "To Do" }
  ]
  
  const handleProjectChange = (project) => {
    setSelectedProject(project)
    setShowProjectMenu(false)
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-800 dark:text-surface-100">Project Dashboard</h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Manage your projects and tasks efficiently</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setShowProjectMenu(!showProjectMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg shadow-sm hover:bg-surface-50 dark:hover:bg-surface-600 transition-colors duration-200"
            >
              <span className="font-medium">{selectedProject.name}</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${showProjectMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {showProjectMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg shadow-lg z-10"
              >
                <div className="py-1">
                  {projects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => handleProjectChange(project)}
                      className="w-full text-left px-4 py-2 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-600 transition-colors duration-200"
                    >
                      {project.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={18} />
            <span>New Task</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {taskStats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 flex items-center"
          >
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-white`}>
              {stat.name === "To Do" && <Clock size={24} />}
              {stat.name === "In Progress" && <BarChart2 size={24} />}
              {stat.name === "Review" && <AlertCircle size={24} />}
              {stat.name === "Done" && <CheckCircle2 size={24} />}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold">{stat.count}</h3>
              <p className="text-surface-500 dark:text-surface-400 text-sm">{stat.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="border-b border-surface-200 dark:border-surface-700 px-6 py-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('kanban')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'kanban' 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  Kanban Board
                </button>
                <button
                  onClick={() => setActiveTab('table')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'table' 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setActiveTab('gantt')}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeTab === 'gantt' 
                      ? 'bg-primary/10 text-primary dark:bg-primary/20' 
                      : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  Gantt Chart
                </button>
              </div>
            </div>
            <div className="p-6">
              <MainFeature activeView={activeTab} projectId={selectedProject.id} />
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <div className="border-b border-surface-200 dark:border-surface-700 px-6 py-4">
              <h2 className="text-lg font-semibold">Upcoming Tasks</h2>
            </div>
            <div className="p-4">
              {upcomingTasks.map(task => (
                <div 
                  key={task.id}
                  className="p-4 border-b border-surface-200 dark:border-surface-700 last:border-0"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{task.title}</h3>
                    <span className={`badge ${
                      task.priority === 'High' ? 'badge-accent' : 
                      task.priority === 'Medium' ? 'badge-secondary' : 'badge-primary'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-surface-500 dark:text-surface-400">
                    <span>Due: {task.dueDate}</span>
                    <span>{task.status}</span>
                  </div>
                </div>
              ))}
              
              <div className="p-4">
                <button className="w-full btn btn-outline flex items-center justify-center gap-2">
                  <Plus size={16} />
                  <span>Add Task</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="card mt-6">
            <div className="border-b border-surface-200 dark:border-surface-700 px-6 py-4">
              <h2 className="text-lg font-semibold">Project Progress</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-surface-600 dark:text-surface-400">Completion</span>
                  <span className="text-sm font-medium">
                    {Math.round((selectedProject.completed / selectedProject.tasks) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(selectedProject.completed / selectedProject.tasks) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Total Tasks</p>
                  <p className="font-medium text-lg">{selectedProject.tasks}</p>
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Completed</p>
                  <p className="font-medium text-lg">{selectedProject.completed}</p>
                </div>
                <div>
                  <p className="text-surface-500 dark:text-surface-400">Due Date</p>
                  <p className="font-medium text-lg">{new Date(selectedProject.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home