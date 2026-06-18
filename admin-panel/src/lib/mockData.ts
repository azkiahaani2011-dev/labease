import type { Lab, Patient, Booking, Notification, MonthlyRevenue, TestTypeBooking } from '../types';

export const mockLabs: Lab[] = [
  { id: 'lab1', name: 'Apollo Diagnostics', address: '42 MG Road', city: 'Bangalore', phone: '+91 80 4567 8901', email: 'apollo@labease.com', isNABL: true, status: 'active', testsCount: 85, rating: 4.7, createdAt: '2022-01-15' },
  { id: 'lab2', name: 'SRL Diagnostics', address: '18 Linking Road', city: 'Mumbai', phone: '+91 22 3456 7890', email: 'srl@labease.com', isNABL: true, status: 'active', testsCount: 120, rating: 4.5, createdAt: '2022-02-20' },
  { id: 'lab3', name: 'Metropolis Healthcare', address: '7 Park Street', city: 'Kolkata', phone: '+91 33 2345 6789', email: 'metro@labease.com', isNABL: true, status: 'active', testsCount: 98, rating: 4.6, createdAt: '2022-03-10' },
  { id: 'lab4', name: 'Dr Lal PathLabs', address: '25 Connaught Place', city: 'Delhi', phone: '+91 11 5678 9012', email: 'lal@labease.com', isNABL: true, status: 'active', testsCount: 150, rating: 4.8, createdAt: '2021-11-05' },
  { id: 'lab5', name: 'Thyrocare Technologies', address: '9 Banjara Hills', city: 'Hyderabad', phone: '+91 40 6789 0123', email: 'thyro@labease.com', isNABL: false, status: 'active', testsCount: 60, rating: 4.3, createdAt: '2022-05-18' },
  { id: 'lab6', name: 'Vijaya Diagnostics', address: '33 Anna Salai', city: 'Chennai', phone: '+91 44 7890 1234', email: 'vijaya@labease.com', isNABL: false, status: 'inactive', testsCount: 45, rating: 4.1, createdAt: '2022-07-22' },
];

export const mockPatients: Patient[] = [
  { id: 'p1', name: 'Arjun Sharma', email: 'arjun.s@gmail.com', phone: '+91 98765 43210', dob: '1990-05-15', gender: 'male', totalBookings: 5, lastVisit: '2024-01-10', createdAt: '2023-01-15' },
  { id: 'p2', name: 'Priya Patel', email: 'priya.p@gmail.com', phone: '+91 87654 32109', dob: '1985-08-22', gender: 'female', totalBookings: 8, lastVisit: '2024-01-18', createdAt: '2022-11-20' },
  { id: 'p3', name: 'Rahul Verma', email: 'rahul.v@yahoo.com', phone: '+91 76543 21098', dob: '1978-12-03', gender: 'male', totalBookings: 3, lastVisit: '2024-01-05', createdAt: '2023-03-08' },
  { id: 'p4', name: 'Sunita Mehta', email: 'sunita.m@gmail.com', phone: '+91 65432 10987', dob: '1995-02-28', gender: 'female', totalBookings: 12, lastVisit: '2024-01-20', createdAt: '2022-08-14' },
  { id: 'p5', name: 'Vikram Singh', email: 'vikram.s@gmail.com', phone: '+91 54321 09876', dob: '1982-07-19', gender: 'male', totalBookings: 6, lastVisit: '2023-12-30', createdAt: '2023-02-22' },
  { id: 'p6', name: 'Ananya Krishnan', email: 'ananya.k@gmail.com', phone: '+91 43210 98765', dob: '1993-11-07', gender: 'female', totalBookings: 4, lastVisit: '2024-01-12', createdAt: '2023-05-01' },
  { id: 'p7', name: 'Deepak Joshi', email: 'deepak.j@hotmail.com', phone: '+91 32109 87654', dob: '1975-04-25', gender: 'male', totalBookings: 9, lastVisit: '2024-01-15', createdAt: '2022-06-30' },
  { id: 'p8', name: 'Kavya Nair', email: 'kavya.n@gmail.com', phone: '+91 21098 76543', dob: '1998-09-13', gender: 'female', totalBookings: 2, lastVisit: '2023-12-28', createdAt: '2023-09-15' },
  { id: 'p9', name: 'Ravi Kumar', email: 'ravi.k@gmail.com', phone: '+91 10987 65432', dob: '1988-01-30', gender: 'male', totalBookings: 7, lastVisit: '2024-01-08', createdAt: '2022-12-10' },
  { id: 'p10', name: 'Meera Gupta', email: 'meera.g@gmail.com', phone: '+91 99876 54321', dob: '1991-06-17', gender: 'female', totalBookings: 15, lastVisit: '2024-01-22', createdAt: '2022-04-05' },
  { id: 'p11', name: 'Sanjay Malhotra', email: 'sanjay.m@gmail.com', phone: '+91 88765 43210', dob: '1980-10-08', gender: 'male', totalBookings: 11, lastVisit: '2024-01-19', createdAt: '2022-09-17' },
  { id: 'p12', name: 'Pooja Iyer', email: 'pooja.i@gmail.com', phone: '+91 77654 32109', dob: '1994-03-21', gender: 'female', totalBookings: 6, lastVisit: '2024-01-11', createdAt: '2023-01-28' },
  { id: 'p13', name: 'Amit Agarwal', email: 'amit.a@gmail.com', phone: '+91 66543 21098', dob: '1987-08-14', gender: 'male', totalBookings: 3, lastVisit: '2023-12-20', createdAt: '2023-07-04' },
  { id: 'p14', name: 'Sneha Reddy', email: 'sneha.r@gmail.com', phone: '+91 55432 10987', dob: '1996-12-09', gender: 'female', totalBookings: 8, lastVisit: '2024-01-16', createdAt: '2022-10-12' },
  { id: 'p15', name: 'Nikhil Bose', email: 'nikhil.b@gmail.com', phone: '+91 44321 09876', dob: '1983-05-27', gender: 'male', totalBookings: 10, lastVisit: '2024-01-21', createdAt: '2022-07-19' },
  { id: 'p16', name: 'Lakshmi Pillai', email: 'lakshmi.p@gmail.com', phone: '+91 33210 98765', dob: '1979-02-04', gender: 'female', totalBookings: 14, lastVisit: '2024-01-17', createdAt: '2022-03-25' },
  { id: 'p17', name: 'Karan Kapoor', email: 'karan.k@gmail.com', phone: '+91 22109 87654', dob: '1992-07-31', gender: 'male', totalBookings: 5, lastVisit: '2024-01-09', createdAt: '2023-04-14' },
  { id: 'p18', name: 'Divya Saxena', email: 'divya.s@gmail.com', phone: '+91 11098 76543', dob: '1997-11-16', gender: 'female', totalBookings: 1, lastVisit: '2024-01-03', createdAt: '2023-12-01' },
  { id: 'p19', name: 'Suresh Pandey', email: 'suresh.p@gmail.com', phone: '+91 90987 65432', dob: '1973-09-20', gender: 'male', totalBookings: 18, lastVisit: '2024-01-23', createdAt: '2021-12-08' },
  { id: 'p20', name: 'Nandini Rao', email: 'nandini.r@gmail.com', phone: '+91 89876 54321', dob: '1990-04-12', gender: 'female', totalBookings: 7, lastVisit: '2024-01-14', createdAt: '2023-02-19' },
  { id: 'p21', name: 'Ajay Tiwari', email: 'ajay.t@gmail.com', phone: '+91 78765 43210', dob: '1986-01-06', gender: 'male', totalBookings: 4, lastVisit: '2023-12-25', createdAt: '2023-06-07' },
  { id: 'p22', name: 'Ritu Bansal', email: 'ritu.b@gmail.com', phone: '+91 67654 32109', dob: '1993-06-23', gender: 'female', totalBookings: 9, lastVisit: '2024-01-20', createdAt: '2022-11-30' },
  { id: 'p23', name: 'Manoj Desai', email: 'manoj.d@gmail.com', phone: '+91 56543 21098', dob: '1977-03-18', gender: 'male', totalBookings: 13, lastVisit: '2024-01-18', createdAt: '2022-05-22' },
  { id: 'p24', name: 'Swati Choudhary', email: 'swati.c@gmail.com', phone: '+91 45432 10987', dob: '1995-10-05', gender: 'female', totalBookings: 6, lastVisit: '2024-01-13', createdAt: '2023-03-16' },
  { id: 'p25', name: 'Rohit Mishra', email: 'rohit.m@gmail.com', phone: '+91 34321 09876', dob: '1984-07-29', gender: 'male', totalBookings: 8, lastVisit: '2024-01-16', createdAt: '2022-08-03' },
  { id: 'p26', name: 'Pallavi Jain', email: 'pallavi.j@gmail.com', phone: '+91 23210 98765', dob: '1998-02-11', gender: 'female', totalBookings: 2, lastVisit: '2023-12-15', createdAt: '2023-10-20' },
  { id: 'p27', name: 'Gaurav Sinha', email: 'gaurav.s@gmail.com', phone: '+91 12109 87654', dob: '1981-11-24', gender: 'male', totalBookings: 16, lastVisit: '2024-01-22', createdAt: '2022-01-30' },
  { id: 'p28', name: 'Shweta Dubey', email: 'shweta.d@gmail.com', phone: '+91 91098 76543', dob: '1989-08-07', gender: 'female', totalBookings: 10, lastVisit: '2024-01-19', createdAt: '2022-06-14' },
  { id: 'p29', name: 'Tarun Bhatt', email: 'tarun.b@gmail.com', phone: '+91 80987 65432', dob: '1976-05-02', gender: 'male', totalBookings: 20, lastVisit: '2024-01-24', createdAt: '2021-10-05' },
  { id: 'p30', name: 'Ishaan Chopra', email: 'ishaan.c@gmail.com', phone: '+91 79876 54321', dob: '1999-12-28', gender: 'male', totalBookings: 1, lastVisit: '2024-01-02', createdAt: '2024-01-01' },
];

const tests = [
  { id: 't1', name: 'Complete Blood Count', category: 'Hematology', price: 450 },
  { id: 't2', name: 'Lipid Profile', category: 'Biochemistry', price: 850 },
  { id: 't3', name: 'Thyroid Function Test', category: 'Endocrinology', price: 1200 },
  { id: 't4', name: 'HbA1c', category: 'Diabetes', price: 650 },
  { id: 't5', name: 'Liver Function Test', category: 'Biochemistry', price: 900 },
  { id: 't6', name: 'Kidney Function Test', category: 'Nephrology', price: 750 },
  { id: 't7', name: 'Urine Routine', category: 'Pathology', price: 200 },
  { id: 't8', name: 'COVID RT-PCR', category: 'Microbiology', price: 800 },
  { id: 't9', name: 'Vitamin D', category: 'Nutrition', price: 1100 },
  { id: 't10', name: 'Iron Studies', category: 'Hematology', price: 600 },
];

const statuses: Array<'pending' | 'confirmed' | 'completed' | 'cancelled'> = ['pending', 'confirmed', 'completed', 'cancelled'];
const payStatuses: Array<'pending' | 'paid' | 'refunded' | 'failed'> = ['pending', 'paid', 'refunded', 'failed'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}

const timeSlots = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

export const mockBookings: Booking[] = Array.from({ length: 55 }, (_, i) => {
  const patient = randomItem(mockPatients);
  const lab = randomItem(mockLabs);
  const test = randomItem(tests);
  const status = statuses[i % 4];
  const paymentStatus = status === 'completed' ? 'paid' : status === 'cancelled' ? randomItem(['refunded', 'failed'] as const) : randomItem(payStatuses);
  return {
    id: `BK${String(i + 1001).padStart(4, '0')}`,
    patientId: patient.id,
    patientName: patient.name,
    labId: lab.id,
    labName: lab.name,
    testId: test.id,
    testName: test.name,
    date: randomDate(new Date('2024-01-01'), new Date('2024-01-31')),
    timeSlot: randomItem(timeSlots),
    status,
    paymentStatus,
    amount: test.price,
    reportUrl: status === 'completed' ? `/reports/report_${i + 1}.pdf` : undefined,
    createdAt: randomDate(new Date('2023-12-01'), new Date('2024-01-20')),
  };
});

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'New Booking', message: 'Arjun Sharma booked Complete Blood Count at Apollo Diagnostics', type: 'info', read: false, createdAt: '2024-01-24T09:30:00' },
  { id: 'n2', title: 'Report Uploaded', message: 'Report for BK1005 is ready for download', type: 'success', read: false, createdAt: '2024-01-24T08:15:00' },
  { id: 'n3', title: 'Payment Failed', message: 'Payment failed for booking BK1012', type: 'error', read: false, createdAt: '2024-01-23T17:45:00' },
  { id: 'n4', title: 'Lab Status Changed', message: 'Vijaya Diagnostics has been set to inactive', type: 'warning', read: true, createdAt: '2024-01-23T14:20:00' },
  { id: 'n5', title: 'New Patient', message: 'Ishaan Chopra registered as a new patient', type: 'info', read: true, createdAt: '2024-01-22T11:00:00' },
  { id: 'n6', title: 'Booking Confirmed', message: 'Booking BK1020 has been confirmed by SRL Diagnostics', type: 'success', read: true, createdAt: '2024-01-22T09:00:00' },
  { id: 'n7', title: 'System Maintenance', message: 'Scheduled maintenance on Jan 26 from 2-4 AM', type: 'warning', read: true, createdAt: '2024-01-21T16:30:00' },
];

export const monthlyRevenue: MonthlyRevenue[] = [
  { month: 'Feb 2023', revenue: 142000, bookings: 185 },
  { month: 'Mar 2023', revenue: 168000, bookings: 210 },
  { month: 'Apr 2023', revenue: 155000, bookings: 198 },
  { month: 'May 2023', revenue: 190000, bookings: 245 },
  { month: 'Jun 2023', revenue: 175000, bookings: 220 },
  { month: 'Jul 2023', revenue: 210000, bookings: 268 },
  { month: 'Aug 2023', revenue: 225000, bookings: 290 },
  { month: 'Sep 2023', revenue: 198000, bookings: 255 },
  { month: 'Oct 2023', revenue: 240000, bookings: 310 },
  { month: 'Nov 2023', revenue: 228000, bookings: 295 },
  { month: 'Dec 2023', revenue: 265000, bookings: 340 },
  { month: 'Jan 2024', revenue: 285000, bookings: 368 },
];

export const testTypeBookings: TestTypeBooking[] = [
  { name: 'Hematology', value: 285, color: '#1158A6' },
  { name: 'Biochemistry', value: 340, color: '#0F2D6B' },
  { name: 'Endocrinology', value: 198, color: '#3b82f6' },
  { name: 'Diabetes', value: 225, color: '#60a5fa' },
  { name: 'Pathology', value: 156, color: '#93c5fd' },
  { name: 'Microbiology', value: 120, color: '#bfdbfe' },
  { name: 'Nutrition', value: 210, color: '#dbeafe' },
];

export const patientGrowth = [
  { month: 'Feb', patients: 320 },
  { month: 'Mar', patients: 380 },
  { month: 'Apr', patients: 410 },
  { month: 'May', patients: 450 },
  { month: 'Jun', patients: 490 },
  { month: 'Jul', patients: 540 },
  { month: 'Aug', patients: 610 },
  { month: 'Sep', patients: 660 },
  { month: 'Oct', patients: 730 },
  { month: 'Nov', patients: 790 },
  { month: 'Dec', patients: 850 },
  { month: 'Jan', patients: 920 },
];

export const topLabsData = mockLabs.map(lab => ({
  name: lab.name.split(' ')[0],
  bookings: Math.floor(Math.random() * 150) + 80,
  revenue: Math.floor(Math.random() * 80000) + 40000,
}));
