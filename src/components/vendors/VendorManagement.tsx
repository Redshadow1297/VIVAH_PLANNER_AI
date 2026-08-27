import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Plus,
  Star,
  Phone,
  Mail,
  DollarSign,
  FileText,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Share2,
  Sparkles,
  Camera,
  Music,
  Scissors,
  Building2,
  UtensilsCrossed,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Vendor, VendorCategory } from '../../types';
import { PaymentBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/Toast';

export const VendorManagement: React.FC = () => {
  const { vendors, addVendor, updateVendor, deleteVendor, showToast } = useWedding();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [vendorToEdit, setVendorToEdit] = useState<Vendor | null>(null);
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<VendorCategory>('Photography');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [totalCost, setTotalCost] = useState(500000);
  const [advancePaid, setAdvancePaid] = useState(200000);
  const [paymentStatus, setPaymentStatus] = useState<Vendor['paymentStatus']>('partial');
  const [deliverables, setDeliverables] = useState('');
  const [notes, setNotes] = useState('');

  const totalContractValue = vendors.reduce((sum, v) => sum + v.totalCost, 0);
  const totalPaid = vendors.reduce((sum, v) => sum + v.advancePaid, 0);
  const totalPending = totalContractValue - totalPaid;

  const categories: VendorCategory[] = [
    'Venue',
    'Photography',
    'Decoration',
    'Catering',
    'Makeup & Mehendi',
    'DJ & Music',
    'Priest / Pandit Ji',
    'Choreographer',
    'Fireworks & Dhol',
    'Clothing & Styling',
    'Other',
  ];

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.phone.includes(searchQuery);
    const matchesCat = selectedCategory === 'all' || v.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSaveVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (vendorToEdit) {
      updateVendor(vendorToEdit.id, {
        name,
        category,
        contactPerson,
        phone,
        email: email || undefined,
        totalCost: Number(totalCost),
        advancePaid: Number(advancePaid),
        paymentStatus,
        deliverables: deliverables.split(',').map((d) => d.trim()),
        notes: notes || undefined,
      });
      setVendorToEdit(null);
    } else {
      addVendor({
        name,
        category,
        contactPerson,
        phone,
        email: email || undefined,
        totalCost: Number(totalCost),
        advancePaid: Number(advancePaid),
        paymentStatus,
        rating: 5,
        deliverables: deliverables ? deliverables.split(',').map((d) => d.trim()) : ['Contracted deliverables'],
        notes: notes || undefined,
      });
    }

    setIsAddModalOpen(false);
    setName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setDeliverables('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Financial Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Vyapari & Partners
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Vendor Directory & Contract Master
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Manage photography, decor, royal pandit, DJ, catering deliverables, and payments.
            </p>
          </div>

          <button
            onClick={() => {
              setVendorToEdit(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add Wedding Vendor</span>
          </button>
        </div>

        {/* 3 KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold text-stone-500 font-heading">Total Contracts Value</span>
            <div className="font-heading text-2xl font-extrabold text-[#2C1810] mt-1">
              ₹{(totalContractValue / 100000).toFixed(1)} Lakhs
            </div>
            <div className="text-xs text-stone-500 mt-0.5">{vendors.length} Partnered Vendors</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="text-xs font-bold font-heading">Advances Paid</span>
            <div className="font-heading text-2xl font-extrabold text-emerald-900 mt-1">
              ₹{(totalPaid / 100000).toFixed(1)} Lakhs
            </div>
            <div className="text-xs text-emerald-700 mt-0.5">Cleared via RTGS / Bank</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <span className="text-xs font-bold font-heading">Pending Balance</span>
            <div className="font-heading text-2xl font-extrabold text-amber-900 mt-1">
              ₹{(totalPending / 100000).toFixed(1)} Lakhs
            </div>
            <div className="text-xs text-amber-700 mt-0.5">Due post ceremony handover</div>
          </div>
        </div>

        {/* Filters */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
              }`}
            >
              All Categories ({vendors.length})
            </button>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vendor or person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVendors.map((vendor) => (
          <div
            key={vendor.id}
            className="p-6 rounded-3xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-heading">
                    {vendor.category}
                  </span>
                  <h3 className="font-heading font-bold text-base text-[#2C1810] mt-1">{vendor.name}</h3>
                  <div className="text-xs text-stone-500 mt-0.5">Contact: {vendor.contactPerson}</div>
                </div>
                <PaymentBadge status={vendor.paymentStatus} />
              </div>

              <div className="pt-3 space-y-3 text-xs">
                {/* Cost Breakdown */}
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Total Contract</div>
                    <div className="font-heading font-bold text-sm text-[#2C1810]">
                      ₹{(vendor.totalCost / 1000).toLocaleString('en-IN')}k
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-stone-500 font-bold uppercase">Paid / Advance</div>
                    <div className="font-heading font-bold text-sm text-emerald-800">
                      ₹{(vendor.advancePaid / 1000).toLocaleString('en-IN')}k
                    </div>
                  </div>
                </div>

                {/* Deliverables List */}
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400 mb-1">Key Deliverables</div>
                  <ul className="space-y-1 text-stone-700">
                    {vendor.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {vendor.notes && (
                  <p className="text-[11px] text-stone-500 italic">Notes: {vendor.notes}</p>
                )}
              </div>
            </div>

            {/* Vendor Actions */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${vendor.phone}`}
                  className="px-3 py-1.5 bg-[#FAF0E1] text-[#7A1C2E] hover:bg-[#7A1C2E] hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" /> Call
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${vendor.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setVendorToEdit(vendor);
                    setName(vendor.name);
                    setCategory(vendor.category);
                    setContactPerson(vendor.contactPerson);
                    setPhone(vendor.phone);
                    setEmail(vendor.email || '');
                    setTotalCost(vendor.totalCost);
                    setAdvancePaid(vendor.advancePaid);
                    setPaymentStatus(vendor.paymentStatus);
                    setDeliverables(vendor.deliverables.join(', '));
                    setNotes(vendor.notes || '');
                    setIsAddModalOpen(true);
                  }}
                  className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-600"
                  title="Edit Vendor"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setVendorToDelete(vendor)}
                  className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600"
                  title="Delete Vendor"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Vendor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900 max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">
              {vendorToEdit ? 'Edit Vendor Contract' : 'Add Wedding Vendor'}
            </h3>
            <p className="text-xs text-stone-500 mb-5">Record contractor contacts, deliverables and payments</p>

            <form onSubmit={handleSaveVendor} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Vendor / Business Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Shahi Decor & Florists"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Service Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as VendorCategory)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Vikramaditya Rathore"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Phone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98290..."
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vendor@shadi.com"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Total Contract (₹)
                  </label>
                  <input
                    type="number"
                    value={totalCost}
                    onChange={(e) => setTotalCost(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Advance Paid (₹)
                  </label>
                  <input
                    type="number"
                    value={advancePaid}
                    onChange={(e) => setAdvancePaid(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as Vendor['paymentStatus'])}
                    className="w-full px-2.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="advance_paid">Advance Paid</option>
                    <option value="partial">Partial Paid</option>
                    <option value="paid">Fully Paid</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  placeholder="e.g. Stage Decor, Mandap 1000 flowers, 4 Cinematographers"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special clauses or arrival times..."
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Vendor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={!!vendorToDelete}
        title="Delete Vendor?"
        message={`Are you sure you want to remove ${vendorToDelete?.name} from your vendor directory?`}
        confirmLabel="Delete Vendor"
        isDestructive={true}
        onConfirm={() => {
          if (vendorToDelete) {
            deleteVendor(vendorToDelete.id);
            setVendorToDelete(null);
          }
        }}
        onCancel={() => setVendorToDelete(null)}
      />
    </div>
  );
};
