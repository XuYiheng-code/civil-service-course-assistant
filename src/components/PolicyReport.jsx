import { useState } from 'react'
import { motion } from 'framer-motion'

export default function PolicyReport() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    topic: '',
    problem: '',
    reason: '',
    suggestion: '',
  })

  const handleSubmit = () => {
    setStep(2)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          政策报告
        </h1>
        <p className="text-gray-600 mb-8">
          基于研究内容撰写3000-5000字政策建议报告
        </p>

        {step === 1 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-6">填写报告内容</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  报告主题
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="例如：基层公务员激励机制改革研究"
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  问题描述（800字）
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows={4}
                  placeholder="描述你想分析的现实问题..."
                  value={formData.problem}
                  onChange={(e) => setFormData({...formData, problem: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  原因分析（1000字）
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows={4}
                  placeholder="运用理论框架分析问题成因..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  政策建议（1000字）
                </label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  rows={4}
                  placeholder="提出可操作的政策建议..."
                  value={formData.suggestion}
                  onChange={(e) => setFormData({...formData, suggestion: e.target.value})}
                />
              </div>

              <div className="flex justify-end">
                <motion.button
                  onClick={handleSubmit}
                  className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  生成完整报告
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 border border-gray-200"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">政策报告生成完成</h3>
              <p className="text-gray-500 mt-2">约3500字</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-gray-900 mb-4">报告大纲</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2">一、</span>
                  <span>摘要（300字）</span>
                </div>
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2">二、</span>
                  <span>引言：问题的提出</span>
                </div>
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2">三、</span>
                  <span>问题描述</span>
                </div>
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2">四、</span>
                  <span>原因分析</span>
                </div>
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2">五、</span>
                  <span>政策建议</span>
                </div>
                <div className="flex items-start">
                  <span className="text-amber-600 mr-2">六、</span>
                  <span>结论</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <motion.button
                className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700"
                whileHover={{ scale: 1.02 }}
              >
                下载Word文档
              </motion.button>
              <motion.button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                onClick={() => setStep(1)}
              >
                重新填写
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
