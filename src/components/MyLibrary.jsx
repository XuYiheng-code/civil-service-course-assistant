import { useState } from 'react'
import { motion } from 'framer-motion'

const myLiterature = [
  { id: 1, topic: '主题4', title: '公务员制度与民主', count: 13, date: '2024-01-15' },
  { id: 2, topic: '主题5', title: '公务员制度分类与专业化', count: 11, date: '2024-01-20' },
  { id: 3, topic: '主题9', title: '公务员晋升', count: 10, date: '2024-02-01' },
]

export default function MyLibrary() {
  const [activeTab, setActiveTab] = useState('reports')

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          我的文献
        </h1>
        <p className="text-gray-600 mb-8">
          管理你的文献库、研究报告和政策报告
        </p>

        {/* 标签页 */}
        <div className="flex border-b border-gray-200 mb-6">
          {[
            { id: 'reports', label: '文献汇报', count: 3 },
            { id: 'research', label: '研究设计', count: 1 },
            { id: 'policy', label: '政策报告', count: 1 },
            { id: 'notes', label: '我的笔记', count: 45 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* 内容 */}
        {activeTab === 'reports' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myLiterature.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
                    {item.topic}
                  </span>
                  <span className="text-xs text-gray-400">{item.date}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{item.count}篇文献</p>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 text-sm bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100">
                    查看
                  </button>
                  <button className="px-3 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
                    编辑
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'research' && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">我的研究设计</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">公务员专业化、效率与满意度关系研究</h4>
                <p className="text-sm text-gray-500 mt-1">创建于 2024-02-10</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policy' && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">我的政策报告</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">从效率到满意：如何提升政务服务公众满意度？</h4>
                <p className="text-sm text-gray-500 mt-1">约3500字 | 创建于 2024-02-12</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">我的笔记</h3>
              <button className="px-4 py-2 text-sm bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                + 添加笔记
              </button>
            </div>
            <div className="text-center py-12 text-gray-400">
              <p>共45篇笔记</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
