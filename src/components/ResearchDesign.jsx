import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  { id: 1, name: '制造冲突', description: '将研究主题转化为公共管理悖论' },
  { id: 2, name: '寻找盲区', description: '证明现有理论无法解释悖论' },
  { id: 3, name: '校准航向', description: '确定适合的研究方法' },
  { id: 4, name: '现实敲打', description: '验证研究问题的经验可行性' },
  { id: 5, name: '结构封装', description: '确立主研究问题和子问题' },
]

export default function ResearchDesign() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    topic: '',
    paradox: '',
    theoryGap: '',
    method: '',
    question: '',
  })

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">步骤1：制造冲突</h3>
            <p className="text-gray-600 mb-6">
              将你的研究主题转化为具有张力的公共管理悖论。
              <br/>例如：政府强调专业化提升效率，但公众满意度并未提升。
            </p>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={4}
              placeholder="描述你观察到的反常现象..."
              value={formData.paradox}
              onChange={(e) => setFormData({...formData, paradox: e.target.value})}
            />
          </div>
        )
      case 2:
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">步骤2：寻找盲区</h3>
            <p className="text-gray-600 mb-6">
              分析现有理论为何无法解释这个悖论，找出理论缺口。
            </p>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              rows={4}
              placeholder="描述你认为现有理论的不足..."
              value={formData.theoryGap}
              onChange={(e) => setFormData({...formData, theoryGap: e.target.value})}
            />
          </div>
        )
      case 3:
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">步骤3：校准航向</h3>
            <p className="text-gray-600 mb-6">
              确定适合的研究方法。
            </p>
            <div className="space-y-3">
              {['定量研究', '定性研究', '混合方法'].map((method) => (
                <label key={method} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="method"
                    value={method}
                    checked={formData.method === method}
                    onChange={(e) => setFormData({...formData, method: e.target.value})}
                    className="mr-3"
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">步骤4：现实敲打</h3>
            <p className="text-gray-600 mb-6">
              验证研究问题的经验可行性。考虑数据获取、调研渠道等因素。
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-yellow-800">
                <strong>提示：</strong>MPA论文需要考虑实际可行性。建议选择你能接触到调研对象的领域。
              </p>
            </div>
          </div>
        )
      case 5:
        return (
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">步骤5：结构封装</h3>
            <p className="text-gray-600 mb-6">
              最终研究设计框架已生成！
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">研究设计框架</h4>
              <div className="space-y-3 text-sm">
                <p><strong>研究主题：</strong>{formData.topic || '待填写'}</p>
                <p><strong>核心悖论：</strong>{formData.paradox || '待填写'}</p>
                <p><strong>理论缺口：</strong>{formData.theoryGap || '待填写'}</p>
                <p><strong>研究方法：</strong>{formData.method || '待填写'}</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          研究设计
        </h1>
        <p className="text-gray-600 mb-8">
          五步法帮你完成研究问题提炼与研究设计
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 步骤指示器 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 border border-gray-200 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">五步法</h3>
              <div className="space-y-2">
                {steps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      currentStep === step.id
                        ? 'bg-amber-50 border-l-4 border-amber-500'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`font-medium ${currentStep === step.id ? 'text-amber-700' : 'text-gray-700'}`}>
                      {step.id}. {step.name}
                    </div>
                    <div className="text-xs text-gray-500">{step.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 主要内容区 */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              {renderStep()}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  上一步
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentStep === 5}
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-700"
                >
                  {currentStep === 5 ? '完成' : '下一步'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
