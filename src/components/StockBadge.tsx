import { motion } from 'framer-motion';

interface StockBadgeProps {
  quantity: number;
  criticalThreshold?: number;
  lowThreshold?: number;
}

export function StockBadge({ 
  quantity, 
  criticalThreshold = 5, 
  lowThreshold = 15 
}: StockBadgeProps) {
  let bgColor = 'bg-green-100 text-green-700';
  let pulseColor = '';
  
  if (quantity <= criticalThreshold) {
    bgColor = 'bg-red-100 text-red-700';
    pulseColor = 'animate-pulse';
  } else if (quantity <= lowThreshold) {
    bgColor = 'bg-yellow-100 text-yellow-700';
  }

  return (
    <motion.span
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium ${bgColor} ${pulseColor}`}
    >
      {quantity}
    </motion.span>
  );
}
