import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Link as LinkIcon, 
  Unlink,
  Clock,
  Shield,
  Bell,
  Save,
  CheckCircle
} from 'lucide-react';
import { Layout } from '../components/Layout';
import { StoreIcon } from '../components/StoreIcon';
import { stores, defaultSettings } from '../data/mockData';
import type { Settings as SettingsType } from '../types';

export function Settings() {
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);
  const [saved, setSaved] = useState(false);
  const [connectedStores, setConnectedStores] = useState(stores);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleStoreConnection = (storeId: string) => {
    setConnectedStores(prev => prev.map(store => 
      store.id === storeId 
        ? { ...store, connected: !store.connected, status: store.connected ? 'disconnected' : 'synced' }
        : store
    ));
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Configure your inventory sync preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Connected Stores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Connected Stores</h2>
              <p className="text-sm text-gray-500">Manage your store connections</p>
            </div>
          </div>

          <div className="space-y-4">
            {connectedStores.map((store) => (
              <div 
                key={store.id}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  store.connected 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <StoreIcon type={store.type} size="lg" />
                  <div>
                    <p className="font-medium text-gray-900">{store.name}</p>
                    <p className="text-sm text-gray-500">
                      {store.connected ? 'Connected' : 'Disconnected'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleStoreConnection(store.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    store.connected
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {store.connected ? (
                    <>
                      <Unlink className="w-4 h-4" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <LinkIcon className="w-4 h-4" />
                      Connect
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-indigo-400 hover:text-indigo-600 transition flex items-center justify-center gap-2">
            <LinkIcon className="w-5 h-5" />
            Add New Store
          </button>
        </motion.div>

        {/* Sync Settings */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Sync Frequency</h2>
                <p className="text-sm text-gray-500">How often to sync inventory</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(['5min', '15min', '30min', '1hr'] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setSettings(s => ({ ...s, syncFrequency: freq }))}
                  className={`py-3 px-4 rounded-xl font-medium transition ${
                    settings.syncFrequency === freq
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {freq === '5min' && 'Every 5 min'}
                  {freq === '15min' && 'Every 15 min'}
                  {freq === '30min' && 'Every 30 min'}
                  {freq === '1hr' && 'Every hour'}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Buffer Stock</h2>
                <p className="text-sm text-gray-500">Reserve stock to prevent overselling</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buffer quantity (units)
                </label>
                <input
                  type="number"
                  value={settings.bufferStock}
                  onChange={(e) => setSettings(s => ({ ...s, bufferStock: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                  max="100"
                />
                <p className="text-sm text-gray-500 mt-2">
                  This amount will be subtracted from available stock shown to customers
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Stock Alerts</h2>
                <p className="text-sm text-gray-500">When to notify about low stock</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Low stock warning threshold
                </label>
                <input
                  type="number"
                  value={settings.lowStockWarning}
                  onChange={(e) => setSettings(s => ({ ...s, lowStockWarning: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Critical stock warning threshold
                </label>
                <input
                  type="number"
                  value={settings.criticalStockWarning}
                  onChange={(e) => setSettings(s => ({ ...s, criticalStockWarning: parseInt(e.target.value) || 0 }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  min="0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex justify-end"
      >
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Settings
            </>
          )}
        </button>
      </motion.div>
    </Layout>
  );
}
