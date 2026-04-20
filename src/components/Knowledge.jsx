import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 教师数据
const teachers = {
  weishu: {
    id: 'weishu',
    name: '魏姝老师',
    title: '副教授',
    school: '南京大学政府管理学院',
    avatar: '魏',
    color: 'amber',
    weeks: 'Week 2-3',
    description: '制度逻辑视角',
    topics: [
      { week: 'Week 2', title: '制度逻辑视角：双重制度逻辑' },
      { week: 'Week 2', title: '科层制逻辑 vs 干部制逻辑' },
      { week: 'Week 2', title: '矛盾AB面分析方法' },
      { week: 'Week 2', title: '人才选拔：相马制与赛马制' },
      { week: 'Week 2', title: '薪酬差距：拉大与缩小' },
      { week: 'Week 2', title: '政治化与去政治化' },
      { week: 'Week 3', title: '双重制度逻辑下的改革对策' },
      { week: 'Week 3', title: '政治标准与功绩制' },
      { week: 'Week 3', title: '党管干部原则' },
      { week: 'Week 3', title: '公务员范围与分类' },
    ],
    quickQuestions: [
      '什么是双重制度逻辑？',
      '干部制和科层制有什么区别？',
      '相马制和赛马制是什么？',
      '中国公务员制度有哪些矛盾？',
      '政治标准与功绩制如何平衡？',
      '干部制逻辑的核心特征是什么？'
    ],
    systemPrompt: `你是魏姝老师，南京大学政府管理学院副教授，国家公务员制度课程授课教师。

你的授课风格特点：
1. 互动式教学：常用设问句引导学生思考，喜欢用"矛盾AB面"分析问题
2. 从现实问题出发，引入理论分析
3. 强调"怎么解释这种矛盾现象"
4. 核心框架：双重制度逻辑（科层制逻辑 vs 干部制逻辑）

科层制逻辑的核心特征：
- 法理权威、普遍主义原则、工具理性
- 契约机制、职务常任、政治中立
- 嵌入西方有限政府、三权分立、政治行政二分制度

干部制逻辑的核心特征：
- 组织化克里斯玛权威、原则特殊主义、价值理性
- 使命激励、道义机制、无限责任
- 政治忠诚、价值观形塑、职业前景激励
- 嵌入中国革命教化政体、党政合一政治体制

双重制度逻辑能解释的现实矛盾：
- 人才选拔：相马制↔赛马制的循环
- 薪酬差距：拉大↔缩小的动态调整
- 政治化倾向：去政治化↔再政治化的反复

请用魏姝老师的授课风格回答学生问题，注重互动性和现实案例的运用。`
  },
  yang: {
    id: 'yang',
    name: '杨黎婧老师',
    title: '副教授',
    school: '南京大学政府管理学院',
    avatar: '杨',
    color: 'blue',
    weeks: 'Week 4-6',
    description: '制度主义视角',
    topics: [
      { week: 'Week 4', title: '制度主义分析视角' },
      { week: 'Week 4', title: '新制度主义流派' },
      { week: 'Week 4', title: '制度逻辑与合法性机制' },
      { week: 'Week 4', title: '制度与行为互动' },
      { week: 'Week 5', title: '制度的生成逻辑' },
      { week: 'Week 5', title: '制度的本质' },
      { week: 'Week 5', title: '制度的尺度' },
      { week: 'Week 6', title: '制约结构与行为约束' },
      { week: 'Week 6', title: '正式约束与非正式约束' },
      { week: 'Week 6', title: '官僚自主性' },
    ],
    quickQuestions: [
      '什么是制度主义分析？',
      '新制度主义有哪些流派？',
      '制度如何影响行为？',
      '制度生成的三种机制是什么？',
      '制约结构有哪些层次？',
      '官僚自主性是什么意思？'
    ],
    systemPrompt: `你是杨黎婧老师，南京大学政府管理学院副教授，国家公务员制度课程授课教师。

你的授课风格特点：
1. 学术性强，概念界定清晰
2. 注重理论脉络的梳理
3. 强调分析的层次性
4. 核心框架：制度主义理论、嵌入性分析

新制度主义主要流派：
- 历史制度主义：路径依赖、制度遗产、渐进式变迁
- 组织制度主义：合法性机制、同构压力、理性神话
- 理性选择制度主义：成本-收益计算、制度作为激励
- 社会学制度主义：文化-认知合法性、制度扩散

制度与行为关系：
- 制约作用：制度约束行为选择
- 使能作用：制度提供行动框架
- 建构作用：制度塑造偏好与认同

制度生成三种机制：
- 设计生成：刻意设计的规则体系
- 演化生成：历史积淀形成的惯例
- 涌现生成：多重行动者互动的结果

制约结构层次：
- 正式约束：法律、法规、规章
- 非正式约束：惯例、习俗、道德
- 实施机制：监督、惩罚、激励

请用杨黎婧老师的授课风格回答学生问题，注重理论框架的准确性和概念辨析。`
  }
}

// API配置 Modal
function SettingsModal({ isOpen, onClose, apiKey, setApiKey, model, setModel }) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">API 设置</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Claude API Key</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">选择模型</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="claude-sonnet-4-20250514">Sonnet 4.6</option>
              <option value="claude-opus-4-7">Opus 4.7</option>
              <option value="claude-haiku-4-5-20251001">Haiku 4.5</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            取消
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
          >
            保存
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Knowledge() {
  const [currentTeacher, setCurrentTeacher] = useState('weishu')
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '您好！我是知识巩固助手。请选择一位老师开始学习，可以点击左侧主题或直接提问。' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('claude_api_key') || '')
  const [model, setModel] = useState(() => localStorage.getItem('claude_model') || 'claude-sonnet-4-20250514')
  const messagesEndRef = useRef(null)

  const teacher = teachers[currentTeacher]

  // 保存设置到 localStorage
  useEffect(() => {
    localStorage.setItem('claude_api_key', apiKey)
    localStorage.setItem('claude_model', model)
  }, [apiKey, model])

  // 自动滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const switchTeacher = (teacherId) => {
    setCurrentTeacher(teacherId)
    setMessages([
      { role: 'assistant', content: `欢迎来到${teachers[teacherId].name}的课堂！${teachers[teacherId].weeks} - ${teachers[teacherId].description}。请选择主题或直接提问。` }
    ])
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // 添加思考中的消息
    setMessages(prev => [...prev, { role: 'assistant', content: '...', isTyping: true }])

    try {
      if (!apiKey) {
        throw new Error('请先设置API Key')
      }

      const response = await getAIResponse(userMessage, teacher.systemPrompt)

      // 移除思考中的消息，添加真实回复
      setMessages(prev => prev.filter(m => !m.isTyping).concat({ role: 'assistant', content: response }))
    } catch (error) {
      setMessages(prev => prev.filter(m => !m.isTyping).concat({
        role: 'assistant',
        content: `抱歉，发生了错误：${error.message}`
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const getAIResponse = async (userMessage, systemPrompt) => {
    const history = messages.filter(m => !m.isTyping).slice(-10)
    const messagesForAPI = [
      { role: 'system', content: systemPrompt },
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: userMessage }
    ]

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 4096,
        messages: messagesForAPI
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'API请求失败')
    }

    const data = await response.json()
    return data.content[0].text
  }

  const handleTopicClick = (topicTitle) => {
    setInput(`请讲解：${topicTitle}`)
  }

  const handleQuickQuestion = (question) => {
    setInput(question)
    setTimeout(() => handleSend(), 100)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* 页面标题 */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">
              知识巩固
            </h1>
            <p className="text-gray-600 mt-1">
              课程答疑、知识点梳理、概念辨析
            </p>
          </div>
          <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center gap-2 text-gray-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            设置
          </button>
        </div>

        {/* 教师切换标签 */}
        <div className="flex gap-2 mb-6">
          {Object.values(teachers).map(t => (
            <motion.button
              key={t.id}
              onClick={() => switchTeacher(t.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                currentTeacher === t.id
                  ? t.color === 'amber'
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  {t.avatar}
                </span>
                <div className="text-left">
                  <div>{t.name}</div>
                  <div className="text-xs opacity-80">{t.weeks}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧主题列表 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                课程主题
              </h2>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {teacher.topics.map((topic, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => handleTopicClick(topic.title)}
                    className="w-full text-left p-3 rounded-lg hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all group"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="text-xs text-amber-600 font-medium mb-1">{topic.week}</div>
                    <div className="text-sm text-gray-700 group-hover:text-gray-900">{topic.title}</div>
                  </motion.button>
                ))}
              </div>

              {/* 快捷提问 */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-500 mb-3">快捷提问</h3>
                <div className="flex flex-wrap gap-2">
                  {teacher.quickQuestions.slice(0, 4).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickQuestion(q)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-amber-100 text-gray-600 hover:text-amber-700 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 对话区域 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
              {/* 对话头部 */}
              <div className="p-4 border-b flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  teacher.color === 'amber' ? 'bg-gradient-to-br from-amber-500 to-amber-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'
                }`}>
                  {teacher.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{teacher.name}</div>
                  <div className="text-sm text-gray-500">{teacher.weeks} · {teacher.description}</div>
                </div>
                <div className="ml-auto flex items-center gap-2 text-green-600 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  在线
                </div>
              </div>

              {/* 消息区域 */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white'
                        : msg.isTyping
                          ? 'bg-gray-100 text-gray-400 italic'
                          : 'bg-gray-50 text-gray-800 border border-gray-100'
                    }`}>
                      {msg.isTyping ? (
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                      )}
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* 输入区域 */}
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    placeholder={apiKey ? "输入你的问题..." : "请先在设置中配置API Key"}
                    disabled={!apiKey || isLoading}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={!apiKey || isLoading || !input.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-xl hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    whileHover={apiKey && input.trim() ? { scale: 1.02 } : {}}
                    whileTap={apiKey && input.trim() ? { scale: 0.98 } : {}}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    发送
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 设置Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
        model={model}
        setModel={setModel}
      />
    </div>
  )
}
