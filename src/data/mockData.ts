import type { Store, Product, SyncActivity, Conflict, Settings } from '../types';

export const stores: Store[] = [
  {
    id: 'shopify-1',
    name: 'Main Shopify Store',
    type: 'shopify',
    connected: true,
    lastSync: '2 min ago',
    status: 'synced'
  },
  {
    id: 'etsy-1',
    name: 'Etsy Marketplace',
    type: 'etsy',
    connected: true,
    lastSync: '5 min ago',
    status: 'synced'
  },
  {
    id: 'amazon-1',
    name: 'Amazon FBA',
    type: 'amazon',
    connected: true,
    lastSync: '1 min ago',
    status: 'syncing'
  },
  {
    id: 'woo-1',
    name: 'WooCommerce Site',
    type: 'woocommerce',
    connected: false,
    lastSync: '2 hours ago',
    status: 'disconnected'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Wireless Bluetooth Headphones',
    sku: 'WBH-001',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
    totalStock: 145,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 45 },
      { storeId: 'etsy-1', quantity: 30 },
      { storeId: 'amazon-1', quantity: 50 },
      { storeId: 'woo-1', quantity: 20 }
    ],
    isBundle: false,
    category: 'Electronics'
  },
  {
    id: 'p2',
    name: 'Organic Cotton T-Shirt',
    sku: 'OCT-002',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    totalStock: 230,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 80 },
      { storeId: 'etsy-1', quantity: 60 },
      { storeId: 'amazon-1', quantity: 50 },
      { storeId: 'woo-1', quantity: 40 }
    ],
    isBundle: false,
    category: 'Apparel'
  },
  {
    id: 'p3',
    name: 'Handmade Ceramic Mug',
    sku: 'HCM-003',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop',
    totalStock: 12,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 4 },
      { storeId: 'etsy-1', quantity: 3 },
      { storeId: 'amazon-1', quantity: 3 },
      { storeId: 'woo-1', quantity: 2 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  },
  {
    id: 'p4',
    name: 'Premium Yoga Mat',
    sku: 'PYM-004',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
    totalStock: 8,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 2 },
      { storeId: 'etsy-1', quantity: 2 },
      { storeId: 'amazon-1', quantity: 3 },
      { storeId: 'woo-1', quantity: 1 }
    ],
    isBundle: false,
    category: 'Sports'
  },
  {
    id: 'p5',
    name: 'Stainless Steel Water Bottle',
    sku: 'SSW-005',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
    totalStock: 89,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 25 },
      { storeId: 'etsy-1', quantity: 20 },
      { storeId: 'amazon-1', quantity: 30 },
      { storeId: 'woo-1', quantity: 14 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  },
  {
    id: 'p6',
    name: 'Fitness Starter Bundle',
    sku: 'FSB-006',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=100&h=100&fit=crop',
    totalStock: 15,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 5 },
      { storeId: 'etsy-1', quantity: 4 },
      { storeId: 'amazon-1', quantity: 4 },
      { storeId: 'woo-1', quantity: 2 }
    ],
    isBundle: true,
    bundleComponents: [
      { productId: 'p4', productName: 'Premium Yoga Mat', quantity: 1 },
      { productId: 'p5', productName: 'Stainless Steel Water Bottle', quantity: 1 }
    ],
    category: 'Bundles'
  },
  {
    id: 'p7',
    name: 'Natural Soy Candle',
    sku: 'NSC-007',
    image: 'https://images.unsplash.com/photo-1602607753858-f6a2c3c8a1a7?w=100&h=100&fit=crop',
    totalStock: 67,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 20 },
      { storeId: 'etsy-1', quantity: 25 },
      { storeId: 'amazon-1', quantity: 15 },
      { storeId: 'woo-1', quantity: 7 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  },
  {
    id: 'p8',
    name: 'Leather Wallet',
    sku: 'LW-008',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
    totalStock: 42,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 12 },
      { storeId: 'etsy-1', quantity: 10 },
      { storeId: 'amazon-1', quantity: 15 },
      { storeId: 'woo-1', quantity: 5 }
    ],
    isBundle: false,
    category: 'Accessories'
  },
  {
    id: 'p9',
    name: 'Bamboo Cutting Board Set',
    sku: 'BCB-009',
    image: 'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=100&h=100&fit=crop',
    totalStock: 28,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 8 },
      { storeId: 'etsy-1', quantity: 7 },
      { storeId: 'amazon-1', quantity: 8 },
      { storeId: 'woo-1', quantity: 5 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  },
  {
    id: 'p10',
    name: 'Wireless Charging Pad',
    sku: 'WCP-010',
    image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=100&h=100&fit=crop',
    totalStock: 3,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 1 },
      { storeId: 'etsy-1', quantity: 0 },
      { storeId: 'amazon-1', quantity: 2 },
      { storeId: 'woo-1', quantity: 0 }
    ],
    isBundle: false,
    category: 'Electronics'
  },
  {
    id: 'p11',
    name: 'Aromatherapy Diffuser',
    sku: 'AD-011',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=100&h=100&fit=crop',
    totalStock: 54,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 15 },
      { storeId: 'etsy-1', quantity: 18 },
      { storeId: 'amazon-1', quantity: 12 },
      { storeId: 'woo-1', quantity: 9 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  },
  {
    id: 'p12',
    name: 'Home Spa Gift Set',
    sku: 'HSG-012',
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=100&h=100&fit=crop',
    totalStock: 22,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 6 },
      { storeId: 'etsy-1', quantity: 8 },
      { storeId: 'amazon-1', quantity: 5 },
      { storeId: 'woo-1', quantity: 3 }
    ],
    isBundle: true,
    bundleComponents: [
      { productId: 'p7', productName: 'Natural Soy Candle', quantity: 2 },
      { productId: 'p11', productName: 'Aromatherapy Diffuser', quantity: 1 }
    ],
    category: 'Bundles'
  },
  {
    id: 'p13',
    name: 'Minimalist Watch',
    sku: 'MW-013',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop',
    totalStock: 35,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 10 },
      { storeId: 'etsy-1', quantity: 8 },
      { storeId: 'amazon-1', quantity: 12 },
      { storeId: 'woo-1', quantity: 5 }
    ],
    isBundle: false,
    category: 'Accessories'
  },
  {
    id: 'p14',
    name: 'Portable Bluetooth Speaker',
    sku: 'PBS-014',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
    totalStock: 11,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 3 },
      { storeId: 'etsy-1', quantity: 2 },
      { storeId: 'amazon-1', quantity: 4 },
      { storeId: 'woo-1', quantity: 2 }
    ],
    isBundle: false,
    category: 'Electronics'
  },
  {
    id: 'p15',
    name: 'Reusable Shopping Bags (Set of 5)',
    sku: 'RSB-015',
    image: 'https://images.unsplash.com/photo-1591373032196-a9e8d05c5162?w=100&h=100&fit=crop',
    totalStock: 156,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 45 },
      { storeId: 'etsy-1', quantity: 40 },
      { storeId: 'amazon-1', quantity: 50 },
      { storeId: 'woo-1', quantity: 21 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  },
  {
    id: 'p16',
    name: 'Tech Essentials Bundle',
    sku: 'TEB-016',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
    totalStock: 18,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 5 },
      { storeId: 'etsy-1', quantity: 4 },
      { storeId: 'amazon-1', quantity: 6 },
      { storeId: 'woo-1', quantity: 3 }
    ],
    isBundle: true,
    bundleComponents: [
      { productId: 'p1', productName: 'Wireless Bluetooth Headphones', quantity: 1 },
      { productId: 'p10', productName: 'Wireless Charging Pad', quantity: 1 },
      { productId: 'p14', productName: 'Portable Bluetooth Speaker', quantity: 1 }
    ],
    category: 'Bundles'
  },
  {
    id: 'p17',
    name: 'Organic Face Serum',
    sku: 'OFS-017',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&h=100&fit=crop',
    totalStock: 78,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 22 },
      { storeId: 'etsy-1', quantity: 25 },
      { storeId: 'amazon-1', quantity: 18 },
      { storeId: 'woo-1', quantity: 13 }
    ],
    isBundle: false,
    category: 'Beauty'
  },
  {
    id: 'p18',
    name: 'Cotton Throw Blanket',
    sku: 'CTB-018',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    totalStock: 45,
    stockLevels: [
      { storeId: 'shopify-1', quantity: 12 },
      { storeId: 'etsy-1', quantity: 15 },
      { storeId: 'amazon-1', quantity: 10 },
      { storeId: 'woo-1', quantity: 8 }
    ],
    isBundle: false,
    category: 'Home & Kitchen'
  }
];

export const syncActivities: SyncActivity[] = [
  {
    id: 'a1',
    storeId: 'amazon-1',
    storeName: 'Amazon FBA',
    action: 'Inventory sync in progress...',
    timestamp: '1 min ago',
    status: 'warning'
  },
  {
    id: 'a2',
    storeId: 'shopify-1',
    storeName: 'Main Shopify Store',
    action: 'Updated 12 product quantities',
    timestamp: '2 min ago',
    status: 'success'
  },
  {
    id: 'a3',
    storeId: 'etsy-1',
    storeName: 'Etsy Marketplace',
    action: 'Sync completed successfully',
    timestamp: '5 min ago',
    status: 'success'
  },
  {
    id: 'a4',
    storeId: 'woo-1',
    storeName: 'WooCommerce Site',
    action: 'Connection failed - API key expired',
    timestamp: '2 hours ago',
    status: 'error'
  },
  {
    id: 'a5',
    storeId: 'shopify-1',
    storeName: 'Main Shopify Store',
    action: 'Order #1234 reduced stock for SKU WBH-001',
    timestamp: '15 min ago',
    status: 'success'
  }
];

export const conflicts: Conflict[] = [
  {
    id: 'c1',
    productId: 'p3',
    productName: 'Handmade Ceramic Mug',
    sku: 'HCM-003',
    stores: [
      { storeId: 'etsy-1', storeName: 'Etsy', quantity: 5 },
      { storeId: 'shopify-1', storeName: 'Shopify', quantity: 3 }
    ],
    detectedAt: '10 min ago'
  },
  {
    id: 'c2',
    productId: 'p10',
    productName: 'Wireless Charging Pad',
    sku: 'WCP-010',
    stores: [
      { storeId: 'amazon-1', storeName: 'Amazon', quantity: 4 },
      { storeId: 'shopify-1', storeName: 'Shopify', quantity: 1 }
    ],
    detectedAt: '25 min ago'
  }
];

export const defaultSettings: Settings = {
  syncFrequency: '15min',
  bufferStock: 2,
  lowStockWarning: 15,
  criticalStockWarning: 5
};
