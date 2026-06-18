import React, { useState } from 'react';
import { Upload, Download, FileText, Search, CheckCircle, AlertCircle } from 'lucide-react';
import Badge from '../components/Badge';
import { mockBookings } from '../lib/mockData';

interface ReportEntry {
  bookingId: string;
  fileName: string;
  uploadedAt: string;
  size: string;
}

export default function Reports() {
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState('');
  const [reports, setReports] = useState<ReportEntry[]>(
    mockBookings.filter(b => b.reportUrl).slice(0, 8).map(b => ({
      bookingId: b.id,
      fileName: `report_${b.id}.pdf`,
      uploadedAt: b.createdAt,
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
    }))
  );

  const completedBookings = mockBookings.filter(b => b.status === 'completed');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setUploading(true);
    setTimeout(() => {
      const booking = mockBookings.find(b => b.id === selectedBooking);
      if (booking) {
        setReports(prev => [{
          bookingId: booking.id,
          fileName: `report_${booking.id}_${Date.now()}.pdf`,
          uploadedAt: new Date().toISOString().split('T')[0],
          size: '1.2 MB',
        }, ...prev]);
      }
      setUploading(false);
      setUploadSuccess(true);
      setSelectedBooking('');
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 1500);
  };

  const handleDownload = (report: ReportEntry) => {
    alert(`Downloading ${report.fileName}...`);
  };

  const filteredReports = reports.filter(r => {
    const q = search.toLowerCase();
    const b = mockBookings.find(bk => bk.id === r.bookingId);
    return !q || r.bookingId.toLowerCase().includes(q) || (b && b.patientName.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Upload and manage diagnostic reports</p>
      </div>

      <div className="card p-6">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Upload className="h-5 w-5 text-accent" /> Upload Report
        </h2>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Link to Booking</label>
              <select className="input" value={selectedBooking} onChange={e => setSelectedBooking(e.target.value)} required>
                <option value="">Select a completed booking...</option>
                {completedBookings.slice(0, 20).map(b => (
                  <option key={b.id} value={b.id}>{b.id} — {b.patientName} ({b.testName})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">PDF Report File</label>
              <input type="file" accept=".pdf" className="input py-1.5 text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-accent file:text-white hover:file:bg-primary-700 cursor-pointer" />
            </div>
          </div>
          <button type="submit" disabled={uploading || !selectedBooking} className="btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
            {uploading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? 'Uploading...' : 'Upload Report'}
          </button>
          {uploadSuccess && (
            <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
              <CheckCircle className="h-4 w-4" /> Report uploaded successfully!
            </div>
          )}
        </form>
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Uploaded Reports</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input className="input pl-9 w-48" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {['Booking ID', 'Patient', 'Test', 'Report File', 'Size', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredReports.map(r => {
                const booking = mockBookings.find(b => b.id === r.bookingId);
                if (!booking) return null;
                return (
                  <tr key={r.bookingId + r.uploadedAt} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-4 py-3 font-mono text-xs text-accent font-medium">{booking.id}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{booking.patientName}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300 max-w-[160px] truncate">{booking.testName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <FileText className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-xs truncate max-w-[140px]">{r.fileName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{r.size}</td>
                    <td className="px-4 py-3"><Badge variant="completed" label="Ready" /></td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDownload(r)} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg text-xs hover:bg-primary-700 transition-colors">
                        <Download className="h-3.5 w-3.5" /> Download
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filteredReports.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500">No reports found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: reports.length, icon: FileText, color: 'text-accent' },
          { label: 'This Month', value: reports.filter(r => r.uploadedAt.startsWith('2024-01')).length, icon: CheckCircle, color: 'text-green-500' },
          { label: 'Pending Upload', value: Math.max(0, completedBookings.length - reports.length), icon: AlertCircle, color: 'text-yellow-500' },
          { label: 'Completed Bookings', value: completedBookings.length, icon: FileText, color: 'text-purple-500' },
        ].map(s => (
          <div key={s.label} className="card p-4 flex items-center gap-4">
            <s.icon className={`h-8 w-8 ${s.color}`} />
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
