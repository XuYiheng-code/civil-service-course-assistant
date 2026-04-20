import { motion } from 'framer-motion'

const navItems = [
  { id: 'home', label: '首页', icon: '🏠' },
  { id: 'knowledge', label: '知识巩固', icon: '📚' },
  { id: 'literature', label: '文献汇报', icon: '📄' },
  { id: 'research', label: '研究设计', icon: '🔬' },
  { id: 'policy', label: '政策报告', icon: '📝' },
  { id: 'search', label: '文献检索', icon: '🔍' },
  { id: 'library', label: '我的文献', icon: '📖' },
]

export default function Header({ currentPage, onNavigate }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="gold-line"></div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">🎓</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 font-serif">
                公务员制度课程助手
              </h1>
              <p className="text-xs text-gray-500">
                南京大学政府管理学院
              </p>
            </div>
          </motion.div>

          {/* 导航 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="mr-1">{item.icon}</span>
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* 移动端菜单按钮 */}
          <button className="md:hidden p-2 text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
