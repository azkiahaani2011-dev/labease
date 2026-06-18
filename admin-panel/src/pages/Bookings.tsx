import React, { useState, useMemo } from 'react';
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import DataTable from '../components/DataTable';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { mockBookings } from '../lib/mockData';
import type { Booking, BookingStatus } from '../types';

const PAGE_SIZE = 10;

export default function Bookings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState(mockBookings);

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const q = search.toLowerCase();
      const matchSearch = !q || b.id.toLowerCase().includes(q) || b.patientName.toLowerCase().includes(q) || b.labName.toLowerCase().includes(q) || b.testName.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || b.status === statusFilter;
      const matchFrom = !dateFrom || b.date >= dateFrom;
      const matchTo = !dateTo || b.date <= dateTo;
      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [bookings, search, statusFilter, dateFrom, dateTo]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateStatus = (id: string, status: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
    setSelected(null);
  };

  const columns = [
    { key: 'id', header: 'Booking ID', render: (b: Booking) => <span className="font-mono text-xs text-accent font-medium">{b.id}</span> },
    { key: 'patientName', header: 'Patient', render: (b: Booking) => <span className="font-medium text-gray-900 dark:text-white">{b.patientName}</span> },
    { key: 'labName', header: 'Lab', render: (b: Booking) => <span className="text-gray-600 dark:text-gray-300">{b.labName.split(' ')[0]}</span> },
    { key: 'testName', header: 'Test', render: (b: Booking) => <span className="max-w-[160px] truncate block text-gray-600 dark:text-gray-300">{b.testName}</span> },
    { key: 'date', header: 'Date', render: (b: Booking) => <span className="text-gray-500 dark:text-gray-400 text-xs">{b.date}</span> },
    { key: 'status', header: 'Status', render: (b: Booking) => <Badge variant={b.status} /> },
    { key: 'paymentStatus', header: 'Payment', render: (b: Booking) => <Badge variant={b.paymentStatus} /> },
    { key: 'amount', header: 'Amount', render: (b: Booking) => <span className="font-medium text-gray-900 dark:text-white">₹{b.amount}</span> },
    {
      key: 'actions', header: 'Actions',
      render: (b: Booking) => (
        <button onClick={() => setSelected(b)} className="p-1.5 rounded-lg text-gray-400 hover:text-accent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
          <Eye className="h-4 w-4" />
        </button>
      )
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage all diagnostic bookings</p>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input className="input pl-9" placeholder="Search by ID, patient, lab or test..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="input w-auto min-w-[140px]" value={statusFilter} onChange={e => { setStatusFilter(e.target.value as BookingStatus | 'all'); setPage(1); }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="flex gap-2">
            <input type="date" className="input w-auto" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }} />
            <input type="date" className="input w-auto" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }} />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} results</span>
        </div>
      </div>

      <div className="card">
        <DataTable
          columns={columns}
          data={paginated}
          page={page}
          pageSize={PAGE_SIZE}
          total={filtered.length}
          onPageChange={setPage}
          rowKey={b => b.id}
        />
      </div>

      {/* View/Edit Modal */}
      {selected && (
        <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Booking ${selected.id}`} size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                ['Patient', selected.patientName],
                ['Lab', selected.labName],
                ['Test', selected.testName],
                ['Date & Time', `${selected.date} ${selected.timeSlot}`],
                ['Amount', `₹${selected.amount}`],
                ['Booked On', selected.createdAt],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">{k}</p>
                  <p className="text-gray-900 dark:text-white font-medium mt-0.5">{v}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Status</p>
                <Badge variant={selected.status} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide mb-1">Payment</p>
                <Badge variant={selected.paymentStatus} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="w-full text-sm font-medium text-gray-700 dark:text-gray-300">Update Status:</p>
              <button onClick={() => updateStatus(selected.id, 'confirmed')} className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-100 transition-colors">
                <CheckCircle className="h-4 w-4" /> Confirm
              </button>
              <button onClick={() => updateStatus(selected.id, 'completed')} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg text-sm hover:bg-green-100 transition-colors">
                <CheckCircle className="h-4 w-4" /> Complete
              </button>
              <button onClick={() => updateStatus(selected.id, 'pending')} className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm hover:bg-yellow-100 transition-colors">
                <Clock className="h-4 w-4" /> Pending
              </button>
              <button onClick={() => updateStatus(selected.id, 'cancelled')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg text-sm hover:bg-red-100 transition-colors">
                <XCircle className="h-4 w-4" /> Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
