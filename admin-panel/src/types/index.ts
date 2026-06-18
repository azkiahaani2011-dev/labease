export type Role = 'super_admin' | 'lab_admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  labId?: string;
  avatar?: string;
}

export interface Lab {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  isNABL: boolean;
  status: 'active' | 'inactive';
  testsCount: number;
  rating: number;
  createdAt: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  totalBookings: number;
  lastVisit: string;
  createdAt: string;
}

export interface Test {
  id: string;
  name: string;
  category: string;
  price: number;
  turnaroundHours: number;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface Booking {
  id: string;
  patientId: string;
  patientName: string;
  labId: string;
  labName: string;
  testId: string;
  testName: string;
  date: string;
  timeSlot: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  amount: number;
  reportUrl?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
  bookings: number;
}

export interface TestTypeBooking {
  name: string;
  value: number;
  color: string;
}
