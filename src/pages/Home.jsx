import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Plus, Star, Calendar, Clock } from 'lucide-react'
import MainFeature from '../components/MainFeature'

const projects = [
  {
    id: 'p1',
    name: 'Website Redesign',
    description: 'Revamp the company website with modern design and improved UX',
    progress: 75,
    dueDate: '2023-12-15',
    team: [
      { id: 'u1', name: 'Alex Johnson', avatar: 'A' },
      { id: 'u2', name: 'Sarah Miller', avatar: 'S' },
      { id: 'u3', name: 'Mike Chen', avatar: 'M' }
    ],
    color: 'from-primary to-primary-dark',
    favorite: true
  },
  {
    id: 'p2',
    name: 'Mobile App Development',
    description: 'Create a new mobile application for customer engagement',
    progress: 45,
    dueDate: '2024-01-20',
    team: [
      { id: 'u3', name: 'Mike Chen', avatar: 'M' },
      { id: 'u4', name: 'Jessica Wong', avatar: 'J' }
    ],
    color: 'from-secondary to-secondary-dark',
    favorite: false
  },
  {
    id: 'p3',
    name: 'Marketing Campaign',
    description: 'Q1 marketing campaign for product launch',
    progress: 20,
    dueDate: '2024-02-05',
    team: [
      { id: 'u2', name: 'Sarah Miller', avatar: 'S' },
      { id: 'u5', name: 'David Park', avatar: 'D' },
      { id: 'u6', name: 'Emily Clark', avatar: 'E' }
    ],
    color: 'from-neon to-neon-dark',
    favorite: false
  },
  {
    id: 'p4',
    name: 'Product Feature Expansion',
    description: 'Add new features to existing product based on user feedback',
    progress: 60,
    dueDate: '2023-12-30',
    team: [
      { id: 'u1', name: 'Alex Johnson', avatar: 'A' },
      { id: 'u3', name: 'Mike Chen', avatar: 'M' },
      { id: 'u7', name: 'Ryan Lewis', avatar: 'R' }
    ],
    color: 'from-electric to-electric-dark',
    favorite: true
  }
]

const Home = ({ onTaskCompletion }) => {
  const [activeProject, setActiveProject] = useState(projects[0])
  const [activeView, setActiveView] = useState('kanban')
  
  const handleProjectSelect = (project) => {
    setActiveProject(project)
  }

  const handleViewChange = (view) => {
    setActiveView(view)
  }

  // Check if all tasks are completed in the Done column
  const checkAllTasksCompleted = (columns) => {
    // If all tasks are in the "done" column, call onTaskCompletion
    let totalTasks = 0
    let doneTasks = 0
    
    columns.forEach(column => {
      totalTasks += column.tasks.length
      if (column.id === 'done') {
        doneTasks = column.tasks.length
      }
    })
    
    if (totalTasks > 0 && totalTasks === doneTasks) {
      if (onTaskCompletion) onTaskCompletion(true)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm border border-surface-200 dark:border-surface-700">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Projects</h2>
              <button className="p-1.5 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light hover:bg-primary/20 dark:hover:bg-primary/30 transition-colors duration-200">
                <Plus size={18} />
              </button>
            </div>
            
            <div className="space-y-2">
              {projects.map(project => (
                <motion.button
                  key={project.id}
                  onClick={() => handleProjectSelect(project)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    activeProject.id === project.id
                      ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light'
                      : 'hover:bg-surface-50 dark:hover:bg-surface-700'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{project.name}</span>
                    {project.favorite && <Star size={16} className="text-amber-400 fill-amber-400" />}
                  </div>
                  <div className="mt-1 flex justify-between items-center">
                    <div className="text-xs text-surface-500 dark:text-surface-400 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map(member => (
                        <div 
                          key={member.id}
                          className="h-6 w-6 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center text-xs font-medium ring-2 ring-white dark:ring-surface-800"
                        >
                          {member.avatar}
                        </div>
                      ))}
                      {project.team.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-surface-200 dark:bg-surface-600 flex items-center justify-center text-xs font-medium ring-2 ring-white dark:ring-surface-800">
                          +{project.team.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-electric to-neon rounded-xl p-5 text-white shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Premium Features</h3>
            <p className="text-sm opacity-90 mb-4">Unlock advanced project management tools and insights with our premium plan.</p>
            <button className="btn bg-white/20 hover:bg-white/30 text-white flex items-center gap-1">
              <span>Explore Premium</span>
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-sm border border-surface-200 dark:border-surface-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">{activeProject.name}</h1>
                <p className="text-surface-600 dark:text-surface-400">{activeProject.description}</p>
              </div>
              <button className="btn btn-primary self-start sm:self-center flex items-center gap-1">
                <span>Project Settings</span>
                <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg">
                <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Progress</div>
                <div className="flex items-center gap-3">
                  <div className="text-xl font-semibold">{activeProject.progress}%</div>
                  <div className="flex-1 h-2 bg-surface-200 dark:bg-surface-600 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${activeProject.color}`}
                      style={{ width: `${activeProject.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg">
                <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Due Date</div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary dark:text-primary-light" />
                  <div className="text-lg font-medium">
                    {new Date(activeProject.dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
              
              <div className="bg-surface-50 dark:bg-surface-700/50 p-4 rounded-lg">
                <div className="text-sm text-surface-500 dark:text-surface-400 mb-1">Team</div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {activeProject.team.map(member => (
                      <div 
                        key={member.id}
                        className="h-8 w-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light flex items-center justify-center font-medium ring-2 ring-white dark:ring-surface-800"
                      >
                        {member.avatar}
                      </div>
                    ))}
                  </div>
                  <button className="text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
            
            <MainFeature 
              activeView={activeView} 
              projectId={activeProject.id} 
              onViewChange={handleViewChange}
              onTaskUpdate={checkAllTasksCompleted}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm border border-surface-200 dark:border-surface-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent Activity</h3>
                <button className="text-sm text-primary dark:text-primary-light">View All</button>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-surface-800 dark:text-surface-200">
                      <span className="font-medium">Sarah</span> updated task status to "In Progress"
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <Plus size={16} />
                  </div>
                  <div>
                    <p className="text-surface-800 dark:text-surface-200">
                      <span className="font-medium">Mike</span> added a new task "Create API documentation"
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400">Yesterday</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-surface-800 rounded-xl p-4 shadow-sm border border-surface-200 dark:border-surface-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Upcoming Deadlines</h3>
                <button className="text-sm text-primary dark:text-primary-light">View Calendar</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <Calendar size={20} className="text-primary dark:text-primary-light" />
                    </div>
                    <div>
                      <p className="font-medium">Design Review</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Project: Website Redesign</p>
                    </div>
                  </div>
                  <div className="text-accent font-medium">Tomorrow</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-surface-50 dark:bg-surface-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-electric/10 dark:bg-electric/20 flex items-center justify-center">
                      <Calendar size={20} className="text-electric dark:text-electric-light" />
                    </div>
                    <div>
                      <p className="font-medium">API Integration</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Project: Mobile App Development</p>
                    </div>
                  </div>
                  <div className="text-surface-600 dark:text-surface-400 font-medium">Dec 8</div>
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