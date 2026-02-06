import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronDown, 
  ChevronRight,
  Package,
  Layers
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { StoreIcon } from '../components/StoreIcon';
import { StockBadge } from '../components/StockBadge';
import { products, stores } from '../data/mockData';
import type { Product } from '../types';

export function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedBundles, setExpandedBundles] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'low' | 'bundles'>('all');

  const toggleBundle = (productId: string) => {
    const newExpanded = new Set(expandedBundles);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
    }
    setExpandedBundles(newExpanded);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === 'low') return matchesSearch && product.totalStock <= 15;
    if (filter === 'bundles') return matchesSearch && product.isBundle;
    return matchesSearch;
  });

  const getStockQuantity = (product: Product, storeId: string) => {
    const level = product.stockLevels.find(s => s.storeId === storeId);
    return level?.quantity ?? 0;
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">Manage inventory across all your sales channels</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or SKUs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-3 rounded-xl font-medium transition ${
              filter === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilter('low')}
            className={`px-4 py-3 rounded-xl font-medium transition ${
              filter === 'low'
                ? 'bg-yellow-500 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Low Stock
          </button>
          <button
            onClick={() => setFilter('bundles')}
            className={`px-4 py-3 rounded-xl font-medium transition flex items-center gap-2 ${
              filter === 'bundles'
                ? 'bg-purple-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            Bundles
          </button>
        </div>
      </div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Product</th>
                <th className="text-left px-4 py-4 text-sm font-semibold text-gray-600">SKU</th>
                <th className="text-center px-4 py-4 text-sm font-semibold text-gray-600">Total</th>
                {stores.map(store => (
                  <th key={store.id} className="text-center px-4 py-4">
                    <div className="flex justify-center">
                      <StoreIcon type={store.type} size="sm" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <>
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition ${
                      product.isBundle ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.isBundle ? (
                          <button
                            onClick={() => toggleBundle(product.id)}
                            className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center hover:bg-purple-200 transition"
                          >
                            {expandedBundles.has(product.id) ? (
                              <ChevronDown className="w-5 h-5 text-purple-600" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-purple-600" />
                            )}
                          </button>
                        ) : (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900 flex items-center gap-2">
                            {product.name}
                            {product.isBundle && (
                              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                                Bundle
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600 font-mono">{product.sku}</td>
                    <td className="px-4 py-4 text-center">
                      <StockBadge quantity={product.totalStock} />
                    </td>
                    {stores.map(store => (
                      <td key={store.id} className="px-4 py-4 text-center">
                        <span className={`text-sm font-medium ${
                          getStockQuantity(product, store.id) === 0 
                            ? 'text-red-500' 
                            : getStockQuantity(product, store.id) <= 5
                              ? 'text-yellow-600'
                              : 'text-gray-700'
                        }`}>
                          {getStockQuantity(product, store.id)}
                        </span>
                      </td>
                    ))}
                  </motion.tr>
                  
                  {/* Bundle Components */}
                  <AnimatePresence>
                    {product.isBundle && expandedBundles.has(product.id) && product.bundleComponents && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-purple-50/50"
                      >
                        <td colSpan={3 + stores.length} className="px-6 py-4">
                          <div className="pl-12">
                            <p className="text-sm font-medium text-purple-700 mb-3">Bundle Components:</p>
                            <div className="space-y-2">
                              {product.bundleComponents.map((component) => {
                                const componentProduct = products.find(p => p.id === component.productId);
                                return (
                                  <div key={component.productId} className="flex items-center gap-3 text-sm">
                                    <Package className="w-4 h-4 text-purple-400" />
                                    <span className="text-gray-700">{component.productName}</span>
                                    <span className="text-gray-400">×</span>
                                    <span className="font-medium text-purple-600">{component.quantity}</span>
                                    {componentProduct && (
                                      <span className="text-gray-400 ml-2">
                                        (Available: {componentProduct.totalStock})
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No products found matching your criteria</p>
        </div>
      )}
    </Layout>
  );
}
