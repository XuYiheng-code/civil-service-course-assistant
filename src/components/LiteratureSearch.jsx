import { useState } from 'react'
import { motion } from 'framer-motion'

export default function LiteratureSearch() {
  const [keyword, setKeyword] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)

  const handleSearch = () => {
    if (!keyword.trim()) return
    setSearching(true)
    // 模拟搜索
    setTimeout(() => {
      setResults([
        { id: 1, title: '公务员专业化与公众满意度关系研究', author: '张三', year: '2023', journal: '中国行政管理' },
        { id: 2, title: '我国公务员分类制度改革的路径选择', author: '李四', year: '2022', journal: '公共管理学报' },
        { id: 3, title: '西方国家公务员专业化建设的经验与启示', author: '王五', year: '2021', journal: '当代世界与社会主义' },
      ])
      setSearching(false)
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 font-serif mb-2">
          文献检索
        </h1>
        <p className="text-gray-600 mb-8">
          检索CNKI等数据库，补充高质量学术文献
        </p>

        {/* 搜索框 */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="输入检索关键词..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <motion.button
              onClick={handleSearch}
              disabled={searching}
              className="px-8 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {searching ? '搜索中...' : '搜索'}
            </motion.button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">热门搜索：</span>
            {['公务员专业化', '绩效管理', '晋升机制', '行政问责'].map((tag) => (
              <button
                key={tag}
                onClick={() => { setKeyword(tag); handleSearch() }}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 搜索结果 */}
        {searching && (
          <div className="text-center py-12">
            <motion.div
              className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-gray-500">正在检索CNKI数据库...</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">搜索结果（{results.length}篇）</h3>
            {results.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-amber-400 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-500">
                  <span>作者：{item.author}</span>
                  <span>•</span>
                  <span>年份：{item.year}</span>
                  <span>•</span>
                  <span>期刊：{item.journal}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="px-3 py-1 text-sm bg-amber-50 text-amber-700 rounded-full hover:bg-amber-100">
                    添加到文献库
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 text-gray-600 rounded-full hover:bg-gray-50">
                    查看详情
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!searching && results.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <span className="text-4xl">🔍</span>
            <p className="mt-4">输入关键词开始检索文献</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
