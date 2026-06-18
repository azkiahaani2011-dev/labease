import React, { useState } from 'react';
import { Plus, Edit2, ToggleLeft, ToggleRight, Star, TestTube, MapPin, Phone } from 'lucide-react';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import type { Lab } from '../types';
import { mockLabs } from '../lib/mockData';

interface LabForm {
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  isNABL: boolean;
}

const emptyForm: LabForm = { name: '', address: '', city: '', phone: '', email: '', isNABL: false };

export default function Labs() {
  const [labs, setLabs] = useState<Lab[]>(mockLabs);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Lab | null>(null);
  const [form, setForm] = useState<LabForm>(emptyForm);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setModalOpen(true); };
  const openEdit = (lab: Lab) => { setEditing(lab); setForm({ name: lab.name, address: lab.address, city: lab.city, phone: lab.phone, email: lab.email, isNABL: lab.isNABL }); setModalOpen(true); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setLabs(prev => prev.map(l => l.id === editing.id ? { ...l, ...form } : l));
    } else {
      const newLab: Lab = {
        id: `lab${Date.now()}`, ...form, status: 'active', testsCount: 0, rating: 0, createdAt: new Date().toISOString().split('T')[0],
      };
      setLabs(prev => [...prev, newLab]);
    }
    setModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setLabs(prev => prev.map(l => l.id === id ? { ...l, status: l.status === 'active' ? 'inactive' : 'active' } : l));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Labs</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage diagnostic labs</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm">
          <Plus className="h-4 w-4" /> Add Lab
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {labs.map(lab => (
          <div key={lab.id} className="card p-5 hover:shadow-card-hover transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{lab.name}</h3>
                  {lab.isNABL && <Badge variant="nabl" label="NABL" />}
                </div>
                <Badge variant={lab.status} className="mt-1" />
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(lab)} className="p-1.5 rounded-lg text-gray-400 hover:text-accent hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <Edit2 className="h-4 w-4" />
                </button>
                <button onClick={() => toggleStatus(lab.id)} className={`p-1.5 rounded-lg transition-colors ${lab.status === 'active' ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                  {lab.status === 'active' ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400">
                <MapPin className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                <span>{lab.address}, {lab.city}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{lab.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                <TestTube className="h-4 w-4 text-accent" />
                <span className="font-medium">{lab.testsCount}</span> tests
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{lab.rating}</span>
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">Since {lab.createdAt.split('-')[0]}</span>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Lab' : 'Add New Lab'} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lab Name</label>
            <input className="input" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Apollo Diagnostics" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
              <input className="input" required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Bangalore" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input className="input" required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 80 4567 8901" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
            <input className="input" required value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="42 MG Road" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input type="email" className="input" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="lab@labease.com" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isNABL} onChange={e => setForm(f => ({ ...f, isNABL: e.target.checked }))} className="w-4 h-4 accent-accent" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">NABL Accredited</span>
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">{editing ? 'Update Lab' : 'Add Lab'}</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
