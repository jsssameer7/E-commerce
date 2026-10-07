import { UserProfile } from '@/types/ecommerce';

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-demo-1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    address: {
      street: '42 MG Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560038',
    },
  },
  {
    id: 'user-demo-2',
    name: 'Priya Verma (Admin)',
    email: 'priya.admin@shopvibe.in',
    phone: '+91 91234 56789',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    address: {
      street: '108 Connaught Place',
      city: 'New Delhi',
      state: 'Delhi',
      zipCode: '110001',
    },
  },
];
