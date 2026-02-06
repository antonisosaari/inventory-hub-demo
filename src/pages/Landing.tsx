import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Layers, 
  RefreshCw, 
  Package, 
  AlertTriangle, 
  Zap,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { StoreIcon } from '../components/StoreIcon';

const features = [
  {
    icon: RefreshCw,
    title: 'Real-Time Sync',
    description: 'Automatic inventory updates across all your sales channels in seconds.'
  },
  {
    icon: Package,
    title: 'Bundle Management',
    description: 'Create and manage product bundles with automatic component tracking.'
  },
  {
    icon: AlertTriangle,
    title: 'Low Stock Alerts',
    description: 'Never miss a reorder with smart notifications and threshold settings.'
  },
  {
    icon: Zap,
    title: 'Conflict Resolution',
    description: 'Instantly detect and resolve inventory discrepancies across stores.'
  }
];

const storeTypes: Array<'shopify' | 'etsy' | 'amazon' | 'woocommerce'> = [
  'shopify', 'etsy', 'amazon', 'woocommerce'
];

export function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900">InventoryHub</span>
        </div>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition"
        >
          Go to Dashboard →
        </Link>
      </header>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <CheckCircle className="w-4 h-4" />
            Trusted by 2,500+ multi-channel sellers
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Stop overselling.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Sync inventory in real-time.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            One dashboard to manage inventory across Shopify, Etsy, Amazon, and WooCommerce. 
            Never lose a sale to stock discrepancies again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/25"
            >
              Try Demo Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition">
              Watch Video
            </button>
          </div>

          {/* Store Icons */}
          <div className="flex items-center justify-center gap-6">
            <span className="text-sm text-gray-500">Integrates with:</span>
            <div className="flex gap-3">
              {storeTypes.map((type) => (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StoreIcon type={type} size="lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to stay in sync
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Powerful features designed for multi-channel sellers who want to scale without the chaos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to take control of your inventory?
            </h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">
              Join thousands of sellers who've eliminated overselling and streamlined their operations.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition"
            >
              Explore the Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>InventoryHub Demo</span>
          </div>
          <span>UI Demo • Not a real product</span>
        </div>
      </footer>
    </div>
  );
}
