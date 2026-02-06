import { motion } from 'framer-motion';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { StoreIcon } from '../components/StoreIcon';
import { stores, products, syncActivities } from '../data/mockData';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const totalStock = products.reduce((sum, p) => sum + p.totalStock, 0);
  const lowStockCount = products.filter(p => p.totalStock <= 15).length;
  const connectedStores = stores.filter(s => s.connected).length;

  const statusColors = {
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-100 text-yellow-600',
    error: 'bg-red-100 text-red-600',
  };

  const statusIcons = {
    success: CheckCircle,
    warning: Clock,
    error: AlertTriangle,
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your inventory across all channels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-sm text-green-600 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +12%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{products.length}</p>
          <p className="text-gray-500 text-sm">Total Products</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalStock.toLocaleString()}</p>
          <p className="text-gray-500 text-sm">Total Stock Units</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <Link to="/products" className="text-sm text-indigo-600 hover:underline">
              View →
            </Link>
          </div>
          <p className="text-3xl font-bold text-gray-900">{lowStockCount}</p>
          <p className="text-gray-500 text-sm">Low Stock Alerts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{connectedStores}/{stores.length}</p>
          <p className="text-gray-500 text-sm">Connected Stores</p>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Connected Stores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Connected Stores</h2>
            <Link to="/settings" className="text-sm text-indigo-600 hover:underline">
              Manage
            </Link>
          </div>
          <div className="space-y-4">
            {stores.map((store) => (
              <div key={store.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <StoreIcon type={store.type} size="md" />
                  <div>
                    <p className="font-medium text-gray-900">{store.name}</p>
                    <p className="text-sm text-gray-500">Last sync: {store.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {store.status === 'synced' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Synced
                    </span>
                  )}
                  {store.status === 'syncing' && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium animate-pulse">
                      Syncing...
                    </span>
                  )}
                  {store.status === 'error' && (
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      Error
                    </span>
                  )}
                  {store.status === 'disconnected' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      Disconnected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Sync Activity</h2>
            <Link to="/sync" className="text-sm text-indigo-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {syncActivities.map((activity) => {
              const StatusIcon = statusIcons[activity.status];
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${statusColors[activity.status]}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                    <p className="text-sm text-gray-500">{activity.storeName} • {activity.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
