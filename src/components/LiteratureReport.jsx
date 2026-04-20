import { useState } from 'react'
import { motion } from 'framer-motion'

const topics = [
  { id: 4, name: '公务员制度与民主', description: '政治-行政二分、代表性官僚制、民主行政理论', count: 13 },
  { id: 5, name: '公务员制度分类与专业化', description: '品位分类、职位分类、专业化路径', count: 11 },
  { id: 6, name: '公务员录用', description: '考录制度、选拔任用、精英循环', count: 8 },
  { id: 7, name: '公务员薪酬', description: '工资制度、绩效工资、薪酬改革', count: 8 },
  { id: 8, name: '公务员绩效评估', description: '绩效管理、目标考核、激励机制', count: 9 },
  { id: 9, name: '公务员晋升', description: '晋升机制、锦标赛、选拔标准', count: 10 },
  { id: 10, name: '公务员的责任与控制', description: '行政问责、避责行为、官僚控制', count: 9 },
  { id: 11, name: '中国干部与人事制度', description: '干部管理体制、党政人才、制度比较', count: 10 },
]

export default function LiteratureReport() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [step, setStep] = useState(1) // 1: 选择主题, 2: 生成中, 3: 完成

  const handleGenerate = () => {
    setStep(2)
    // 模拟生成过程
    setTimeout(() => {
      setStep(3)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          文献汇报
        </h1>
        <p className="text-gray-600 mb-8">
          基于主题生成完整文献综述，补充40-50篇高质量文献
        </p>

        {/* 进度条 */}
        <div className="flex items-center mb-8">
          {['选择主题', '生成汇报', '完成'].map((label, idx) => (
            <div key={idx} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step > idx + 1 ? 'bg-green-500 text-white' :
                step === idx + 1 ? 'bg-amber-500 text-white' :
                'bg-gray-200 text-gray-500'
              }`}>
                {step > idx + 1 ? '✓' : idx + 1}
              </div>
              <span className={`ml-2 text-sm ${step >= idx + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                {label}
              </span>
              {idx < 2 && <div className={`w-16 h-0.5 mx-2 ${step > idx + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className={`p-6 bg-white rounded-xl border-2 text-left transition-all ${
                  selectedTopic?.id === topic.id
                    ? 'border-amber-500 shadow-md'
                    : 'border-gray-200 hover:border-amber-300'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded mb-2">
                      主题{topic.id}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{topic.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                  </div>
                  <span className="text-sm text-gray-400">{topic.count}篇</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {selectedTopic && step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-xl p-6 border border-gray-200"
          >
            <h3 className="font-bold text-gray-900 mb-4">确认生成</h3>
            <div className="space-y-2 mb-6">
              <p><span className="text-gray-500">主题：</span>{selectedTopic.name}</p>
              <p><span className="text-gray-500">基本文献：</span>{selectedTopic.count}篇（已内置）</p>
              <p><span className="text-gray-500">补充文献：</span>40-50篇（将检索CNKI）</p>
            </div>
            <motion.button
              onClick={handleGenerate}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              开始生成文献汇报
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <div className="text-center py-20">
            <motion.div
              className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">正在生成文献汇报</h3>
            <p className="text-gray-500">正在分析基本文献，检索补充文献...</p>
          </div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 border border-gray-200"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">文献汇报生成完成</h3>
              <p className="text-gray-500 mt-2">主题：{selectedTopic?.name}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedTopic?.count}</div>
                <div className="text-sm text-gray-600">基本文献</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-600">补充文献</div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">3</div>
                <div className="text-sm text-gray-600">研究问题</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700"
                whileHover={{ scale: 1.02 }}
              >
                查看完整汇报
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                onClick={() => { setStep(1); setSelectedTopic(null) }}
              >
                重新选择
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
