import { UserData, Currency } from '../types';

// Default user data for Joy
const defaultUserData: UserData = {
  name: 'Joy',
  accessCode: '4327',
  currentPhase: 'Design Phase',
  selectedCurrency: 'USD',
  scopeItems: [
    { id: '1', text: 'Finalising contracts', completed: false, month: 1 },
    { id: '2', text: 'E-commerce platform architecture planning', completed: false, month: 1 },
    { id: '3', text: 'User experience wireframes', completed: false, month: 2 },
    { id: '4', text: 'Visual design concepts', completed: false, month: 2 },
    { id: '5', text: 'Product catalog setup', completed: false, month: 3 },
    { id: '6', text: 'Payment gateway integration', completed: false, month: 3 }
  ],
  features: [
    { 
      id: '1', 
      name: 'E-commerce Platform', 
      description: 'Product listing, shopping cart, checkout, payment integration', 
      price: 550, 
      mandatory: true, 
      selected: true 
    },
    { 
      id: '2', 
      name: 'Responsive Design', 
      description: 'Mobile-friendly design that works on all devices', 
      price: 150, 
      mandatory: true, 
      selected: true 
    },
    { 
      id: '3', 
      name: 'Dashboard & Content Management System', 
      description: 'Intuitive admin panel to manage products, orders, and content', 
      price: 350, 
      mandatory: false, 
      selected: false 
    },
    { 
      id: '4', 
      name: 'Progressive Web App', 
      description: 'App-like experience with offline capabilities and home screen installation', 
      price: 250, 
      mandatory: false, 
      selected: false 
    },
    { 
      id: '5', 
      name: 'Brand Design', 
      description: 'Professional logo, fonts, color schemes, and mockups', 
      price: 250, 
      mandatory: false, 
      selected: false 
    },
    { 
      id: '6', 
      name: 'Social Media Managing', 
      description: 'Content creation, scheduling, and engagement across platforms', 
      price: 400, 
      mandatory: false, 
      selected: false,
      recurring: true
    }
  ],
  milestones: [
    { id: '1', name: 'Project Kickoff', status: 'Complete' },
    { id: '2', name: 'Design Approval', status: 'In Progress' },
    { id: '3', name: 'Development Phase', status: 'Pending' },
    { id: '4', name: 'Content Integration', status: 'Pending' },
    { id: '5', name: 'Testing & QA', status: 'Pending' },
    { id: '6', name: 'Launch', status: 'Pending' }
  ],
  documents: [
    { 
      id: '1', 
      name: 'Website Contract', 
      type: 'download', 
      url: 'https://ecommerce-africa.tiiny.site', 
      date: '2025-01-15' 
    },
    { 
      id: '2', 
      name: 'Social Media Contract', 
      type: 'download', 
      url: 'https://ecommerce-africa.tiiny.site', 
      date: '2025-01-20' 
    },
    { 
      id: '3', 
      name: 'Technical Requirements', 
      type: 'download', 
      url: 'https://ecommerce-africa.tiiny.site', 
      date: '2025-01-25' 
    }
  ],
  notes: [
    {
      id: '1',
      type: 'Priority',
      content: 'Finalize brand colors by next week',
      date: '2025-01-15'
    }
  ],
  demoStatus: 'offline'
};

// Currency conversion rates (as of the current date)
export const conversionRates = {
  USD: 1,
  KES: 129.5, // 1 USD = 129.5 KES
  GHS: 13.8   // 1 USD = 13.8 GHS
};

// Save user data to localStorage
export const saveUserData = (userData: UserData): void => {
  localStorage.setItem('ecommerceProposalUserData', JSON.stringify(userData));
};

// Get user data from localStorage
export const getUserData = (): UserData => {
  const storedData = localStorage.getItem('ecommerceProposalUserData');
  if (storedData) {
    return JSON.parse(storedData);
  }
  
  // If no data exists, save and return default data
  saveUserData(defaultUserData);
  return defaultUserData;
};

// Verify access code
export const verifyAccessCode = (code: string): boolean => {
  const userData = getUserData();
  return userData.accessCode === code;
};

// Convert price based on selected currency
export const convertPrice = (price: number, currency: Currency): number => {
  const rate = conversionRates[currency];
  return Math.round(price * rate);
};

// Format price with currency symbol
export const formatPrice = (price: number, currency: Currency): string => {
  switch (currency) {
    case 'USD':
      return `$${price}`;
    case 'KES':
      return `KSh ${price}`;
    case 'GHS':
      return `₵${price}`;
    default:
      return `$${price}`;
  }
};