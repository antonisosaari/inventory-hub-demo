export interface Store {
  id: string;
  name: string;
  type: 'shopify' | 'etsy' | 'amazon' | 'woocommerce';
  connected: boolean;
  lastSync: string;
  status: 'synced' | 'syncing' | 'error' | 'disconnected';
}

export interface StockLevel {
  storeId: string;
  quantity: number;
}

export interface BundleComponent {
  productId: string;
  productName: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  image: string;
  totalStock: number;
  stockLevels: StockLevel[];
  isBundle: boolean;
  bundleComponents?: BundleComponent[];
  category: string;
}

export interface SyncActivity {
  id: string;
  storeId: string;
  storeName: string;
  action: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

export interface Conflict {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  stores: {
    storeId: string;
    storeName: string;
    quantity: number;
  }[];
  detectedAt: string;
}

export interface Settings {
  syncFrequency: '5min' | '15min' | '30min' | '1hr';
  bufferStock: number;
  lowStockWarning: number;
  criticalStockWarning: number;
}
