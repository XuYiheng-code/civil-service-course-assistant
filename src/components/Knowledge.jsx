import { useState } from 'react'
import { motion } from 'framer-motion'

const concepts = [
  { id: 1, term: '政治-行政二分', definition: '政务官与事务官分离的理论，是公共行政学的基础概念之一。' },
  { id: 2, term: '代表性官僚制', definition: '官僚构成反映人口构成的理论，主张增加公务员队伍的多元代表性。' },
  { id: 3, term: '功绩制', definition: '基于能力和绩效选拔任用公务员的原则，强调公平竞争。' },
  { id: 4, term: '品位分类', definition: '以公务员个人资格为核心的分类方式，注重身份和资历。' },
  { id: 5, term: '职位分类', definition: '以工作岗位为核心的分类方式，注重职责和薪酬。' },
  { id: 6, term: '晋升锦标赛', definition: '基于相对绩效的晋升竞争模式，是理解中国地方官员激励的重要理论。' },
  { id: 7, term: '行政问责', definition: '对行政行为的责任追究机制，包括内部问责和外部问责。' },
  { id: 8, term: '党管干部', definition: '中国干部管理的基本原则，党委（党组）管理干部。' },
]

export default function Knowledge() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '您好！我是知识巩固助手。请问有什么概念需要了解？可以选择以下概念或直接提问。' }
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { role: 'user', content: input }])
    setInput('')
    // 模拟回答
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '这是一个很好的问题。请从上方选择一个概念，或告诉我你想了解的具体内容。'
      }])
    }, 500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          知识巩固
        </h1>
        <p className="text-gray-600 mb-8">
          课程答疑、知识点梳理、概念辨析、随堂测验
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 概念卡片 */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-bold text-gray-900 mb-4">核心概念</h2>
            <div className="space-y-2">
              {concepts.map((concept) => (
                <motion.button
                  key={concept.id}
                  className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-amber-400 hover:shadow-sm transition-all"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setMessages([...messages, { role: 'user', content: concept.term }])}
                >
                  <span className="font-medium text-gray-800">{concept.term}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 对话区域 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[500px] flex flex-col">
              {/* 消息区域 */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 输入区域 */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="输入你的问题..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <motion.button
                    onClick={handleSend}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    发送
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
