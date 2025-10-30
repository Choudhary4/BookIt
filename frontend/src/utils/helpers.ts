export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    month: 'short',
    day: 'numeric',
  }).format(date);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    adventure: 'bg-orange-100 text-orange-700',
    cultural: 'bg-purple-100 text-purple-700',
    nature: 'bg-green-100 text-green-700',
    food: 'bg-red-100 text-red-700',
    wellness: 'bg-blue-100 text-blue-700',
    sightseeing: 'bg-yellow-100 text-yellow-700',
  };
  return colors[category] || 'bg-gray-100 text-gray-700';
};
