import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  Zap
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { StoreIcon } from '../components/StoreIcon';
import { stores, conflicts, syncActivities } from '../data/mockData';

export function SyncStatus() {
  const [resolving, setResolving] = useState<string | null>(null);
  const [resolvedConflicts, setResolvedConflicts] = useState<Set<string>>(new Set());

  const handleResolve = (conflictId: string, _useValue: number) => {
    setResolving(conflictId);
    setTimeout(() => {
      setResolving(null);
      setResolvedConflicts(prev => new Set([...prev, conflictId]));
    }, 1500);
  };

  const statusColors = {
    synced: 'bg-green-100 text-green-700 border-green-200',
    syncing: 'bg-blue-100 text-blue-700 border-blue-200',
    error: 'bg-red-100 text-red-700 border-red-200',
    disconnected: 'bg-gray-100 text-gray-600 border-gray-200',
  };

  const statusIcons = {
    synced: CheckCircle,
    syncing: RefreshCw,
    error: AlertTriangle,
    disconnected: Clock,
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sync Status</h1>
        <p className="text-gray-500 mt-1">Monitor synchronization across all your stores</p>
      </div>

      {/* Store Sync Status */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stores.map((store, index) => {
          const StatusIcon = statusIcons[store.status];
          return (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl p-5 border-2 ${statusColors[store.status]} shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <StoreIcon type={store.type} size="lg" />
                <StatusIcon className={`w-6 h-6 ${
                  store.status === 'syncing' ? 'animate-spin' : ''
                }`} />
              </div>
              <h3 className="font-semibold text-gray-900">{store.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Last sync: {store.lastSync}</p>
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColors[store.status]}`}>
                  {store.status === 'synced' && 'Synced'}
                  {store.status === 'syncing' && 'Syncing...'}
                  {store.status === 'error' && 'Error'}
                  {store.status === 'disconnected' && 'Disconnected'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conflicts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Inventory Conflicts</h2>
                <p className="text-sm text-gray-500">{conflicts.filter(c => !resolvedConflicts.has(c.id)).length} pending</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {conflicts.map((conflict) => {
              const isResolved = resolvedConflicts.has(conflict.id);
              const isResolving = resolving === conflict.id;
              
              return (
                <motion.div
                  key={conflict.id}
                  layout
                  className={`p-4 rounded-xl border ${
                    isResolved 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-orange-50 border-orange-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{conflict.productName}</p>
                      <p className="text-sm text-gray-500">SKU: {conflict.sku}</p>
                    </div>
                    {isResolved && (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Resolved
                      </span>
                    )}
                  </div>
                  
                  {!isResolved && (
                    <>
                      <div className="flex items-center gap-2 mb-4">
                        {conflict.stores.map((store, index) => (
                          <div key={store.storeId} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              {store.storeName}: <span className="text-orange-600">{store.quantity}</span>
                            </span>
                            {index < conflict.stores.length - 1 && (
                              <span className="text-gray-400">vs</span>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2">
                        {conflict.stores.map((store) => (
                          <button
                            key={store.storeId}
                            onClick={() => handleResolve(conflict.id, store.quantity)}
                            disabled={isResolving}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                              isResolving
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {isResolving ? (
                              <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
                            ) : (
                              `Use ${store.storeName} (${store.quantity})`
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              );
            })}

            {conflicts.every(c => resolvedConflicts.has(c.id)) && (
              <div className="text-center py-6">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-gray-500">All conflicts resolved!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sync Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Activity Log</h2>
                <p className="text-sm text-gray-500">Recent sync events</p>
              </div>
            </div>
            <button className="text-sm text-indigo-600 hover:underline">
              Export
            </button>
          </div>

          <div className="space-y-3">
            {syncActivities.map((activity, index) => {
              const store = stores.find(s => s.id === activity.storeId);
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                >
                  {store && <StoreIcon type={store.type} size="sm" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Force Full Sync</h3>
              <p className="text-indigo-100 text-sm">Synchronize all products across all stores immediately</p>
            </div>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition flex items-center gap-2">
            Sync Now
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </Layout>
  );
}
