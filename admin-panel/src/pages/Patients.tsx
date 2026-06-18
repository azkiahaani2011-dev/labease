import React, { useState, useMemo } from 'react';
import { Search, User, Phone, Mail, Calendar } from 'lucide-react';
import { mockPatients, mockBookings } from '../lib/mockData';
import type { Patient } from '../types';

const PAGE_SIZE = 12;

export default function Patients() {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return mockPatients.filter(p => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.phone.includes(q);
      const matchGender = genderFilter === 'all' || p.gender === genderFilter;
      return matchSearch && matchGender;
    });
  }, [search, genderFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  function getAge(dob: string) {
    return new Date().getFullYear() - new Date(dob).getFullYear();
  }

  const patientBookings = (id: string) => mockBookings.filter(b => b.patientId === id);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patients</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage patient records</p>
      </div>

      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input className="input pl-9" placeholder="Search by name, email or phone..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <select className="input w-auto" value={genderFilter} onChange={e => { setGenderFilter(e.target.value); setPage(1); }}>
            <option value="all">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{filtered.length} patients found</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginated.map((p: Patient) => {
          const bks = patientBookings(p.id);
          const completed = bks.filter(b => b.status === 'completed').length;
          return (
            <div key={p.id} className="card p-5 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{p.name}</h3>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${p.gender === 'male' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : p.gender === 'female' ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' : 'bg-gray-100 text-gray-600'}`}>
                    {p.gender} · {getAge(p.dob)}y
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{p.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{p.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>Last visit: {p.lastVisit}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{bks.length || p.totalBookings}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">{completed}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{bks.filter(b => b.status === 'pending').length}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Pending</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40">Prev</button>
          <span className="text-sm text-gray-500 dark:text-gray-400">{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="btn-secondary text-sm px-3 py-1.5 disabled:opacity-40">Next</button>
        </div>
      )}
    </div>
  );
}
