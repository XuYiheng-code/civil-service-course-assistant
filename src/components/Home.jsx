import { motion } from 'framer-motion'

const features = [
  {
    id: 'knowledge',
    title: '知识巩固',
    description: '课程答疑、知识点梳理、概念辨析、随堂测验',
    icon: '📚',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'literature',
    title: '文献汇报',
    description: '基于主题生成完整文献综述，补充40-50篇高质量文献',
    icon: '📄',
    color: 'from-amber-500 to-amber-600',
  },
  {
    id: 'research',
    title: '研究设计',
    description: '悖论发现、理论盲区、方法选择、研究问题与框架',
    icon: '🔬',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'policy',
    title: '政策报告',
    description: '问题描述、原因分析、政策建议，3000-5000字',
    icon: '📝',
    color: 'from-purple-500 to-purple-600',
  },
]

const topics = [
  { id: 4, name: '公务员制度与民主', count: 13 },
  { id: 5, name: '公务员制度分类与专业化', count: 11 },
  { id: 6, name: '公务员录用', count: 8 },
  { id: 7, name: '公务员薪酬', count: 8 },
  { id: 8, name: '公务员绩效评估', count: 9 },
  { id: 9, name: '公务员晋升', count: 10 },
  { id: 10, name: '公务员的责任与控制', count: 9 },
  { id: 11, name: '中国干部与人事制度', count: 10 },
]

export default function Home({ onNavigate }) {
  return (
    <div className="min-h-screen">
      {/* Hero区域 */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              公务员制度课程助手
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              南京大学政府管理学院
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              专为公共管理硕士生设计的学习工具，帮助掌握《国家公务员制度》课程知识，
              完成高质量的课堂报告和研究设计。
            </p>
          </motion.div>
        </div>
      </section>

      {/* 功能卡片 */}
      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={feature.id}
              onClick={() => onNavigate(feature.id)}
              className="bg-white rounded-xl shadow-lg p-6 text-left card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 课程主题 */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 font-serif">
              课程主题
            </h2>
            <span className="text-sm text-gray-500">
              共 {topics.length} 个主题，{topics.reduce((sum, t) => sum + t.count, 0)} 篇文献
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <motion.button
                key={topic.id}
                onClick={() => onNavigate('literature')}
                className="bg-white rounded-lg border border-gray-200 p-4 text-left hover:border-amber-400 hover:shadow-md transition-all"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-amber-600 font-bold">主题{topic.id}</span>
                  <span className="text-xs text-gray-400">{topic.count}篇</span>
                </div>
                <p className="text-sm text-gray-700 mt-2">{topic.name}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 使用指南 */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 font-serif text-center mb-12">
            使用指南
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                1️⃣
              </div>
              <h3 className="font-bold text-gray-900 mb-2">选择功能</h3>
              <p className="text-sm text-gray-600">
                从上方功能卡片选择你需要的服务
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                2️⃣
              </div>
              <h3 className="font-bold text-gray-900 mb-2">交互完成</h3>
              <p className="text-sm text-gray-600">
                按照引导完成各项学习任务
              </p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                3️⃣
              </div>
              <h3 className="font-bold text-gray-900 mb-2">获取成果</h3>
              <p className="text-sm text-gray-600">
                获得文献汇报、研究设计、政策报告
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 公务员制度课程助手 | 南京大学政府管理学院
          </p>
        </div>
      </footer>
    </div>
  )
}
