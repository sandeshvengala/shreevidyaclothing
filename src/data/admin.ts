export const dashboardMetrics = {
  revenue: '₹4.8L',
  orders: 124,
  customers: 436,
  products: 82,
  lowStock: 12,
};

export const adminCredentials = {
  id: import.meta.env.VITE_ADMIN_ID,
  password: import.meta.env.VITE_ADMIN_PASSWORD,
};

export const orderStatuses = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
  'Returned',
];
