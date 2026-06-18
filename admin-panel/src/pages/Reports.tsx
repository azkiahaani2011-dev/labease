import { useState } from 'react';
import { mockBookings } from '../lib/mockData';
import Badge from '../components/Badge';
import { Upload, Download, CheckCircle } from 'lucide-react';

export default function Reports() {
  const [filter, setFilter] = useState<'all'|'has'|'needs'>('all');
  const [uploaded, setUploaded] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState('');

  const completed = mockBookings.filter(b => b.status === 'completed');
  const filtered = completed.filter(b => {
    if (filter === 'has') return b.reportUrl || uploaded.has(b.id);
    if (filter === 'needs') return !b.reportUrl && !uploaded.has(b.id);
    return true;
  });

  const handleUpload = (id: string) => {
    setUploaded(prev => new Set([...prev, id]));
    setToast('Report uploaded successfully!');
    setTimeout(() => setToast(''), 3000);
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2">
          <CheckCircle size={16} /> {toast}
        </div>
      )}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and upload patient diagnostic reports</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-5">
          {(['all','has','needs'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
              {f === 'all' ? 'All' : f === 'has' ? 'Has Report' : 'Needs Report'}
            </button>
          ))}
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">{filtered.length} bookings</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                {['Booking ID','Patient','Lab','Test','Date','Status','Report'].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700/50">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-xs text-gray-500 dark:text-gray-400">{b.id}</td>
                  <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{b.patientName}</td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{b.labName}</td>
                  <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{b.testName}</td>
                  <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{b.date}</td>
                  <td className="py-3 px-3"><Badge variant={b.status} /></td>
                  <td className="py-3 px-3">
                    {b.reportUrl || uploaded.has(b.id) ? (
                      <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-xs">
                        <Download size={13} /> Download
                      </button>
                    ) : (
                      <button onClick={() => handleUpload(b.id)}
                        className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors">
                        <Upload size={13} /> Upload
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
