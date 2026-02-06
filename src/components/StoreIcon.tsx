import type { Store } from '../types';

interface StoreIconProps {
  type: Store['type'];
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const storeColors = {
  shopify: 'bg-green-500',
  etsy: 'bg-orange-500',
  amazon: 'bg-yellow-500',
  woocommerce: 'bg-purple-500',
};

const storeLabels = {
  shopify: 'S',
  etsy: 'E',
  amazon: 'A',
  woocommerce: 'W',
};

const sizeClasses = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-12 h-12 text-lg',
};

export function StoreIcon({ type, size = 'md', className = '' }: StoreIconProps) {
  return (
    <div
      className={`${storeColors[type]} ${sizeClasses[size]} rounded-lg flex items-center justify-center text-white font-bold shadow-sm ${className}`}
      title={type.charAt(0).toUpperCase() + type.slice(1)}
    >
      {storeLabels[type]}
    </div>
  );
}
