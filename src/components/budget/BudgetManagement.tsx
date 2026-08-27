import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  PieChart,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Building2,
  UtensilsCrossed,
  Sparkles,
  Camera,
  Shirt,
  Car,
  Gift,
  ShieldAlert,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Expense } from '../../types';
import { PaymentBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/Toast';

export const BudgetManagement: React.FC = () => {
  const { wedding, expenses, addExpense, deleteExpense, showToast } = useWedding();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  // New expense form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Expense['category']>('Venue');
  const [amount, setAmount] = useState(150000);
  const [paidDate, setPaidDate] = useState('2026-11-20');
  const [paymentMethod, setPaymentMethod] = useState<Expense['paymentMethod']>('Bank Transfer / NEFT');
  const [paymentStatus, setPaymentStatus] = useState<Expense['paymentStatus']>('paid');
  const [paidBy, setPaidBy] = useState(`Groom (${wedding.groomName.split(' ')[0]})`);
  const [vendorName, setVendorName] = useState('The Oberoi Udaivilas');
  const [notes, setNotes] = useState('');

  const totalBudget = wedding.totalBudget;
  const totalPaid = expenses.reduce((sum, e) => (e.paymentStatus === 'paid' ? sum + e.amount : sum), 0);
  const totalPending = expenses.reduce((sum, e) => (e.paymentStatus === 'pending' ? sum + e.amount : sum), 0);
  const remainingBudget = totalBudget - totalPaid;
  const spentPercent = Math.min(100, Math.round((totalPaid / totalBudget) * 100));

  const categories: { name: Expense['category']; icon: React.ReactNode; color: string }[] = [
    { name: 'Venue', icon: <Building2 className="w-4 h-4" />, color: 'bg-rose-500' },
    { name: 'Catering', icon: <UtensilsCrossed className="w-4 h-4" />, color: 'bg-amber-500' },
    { name: 'Decor', icon: <Sparkles className="w-4 h-4" />, color: 'bg-purple-500' },
    { name: 'Photography', icon: <Camera className="w-4 h-4" />, color: 'bg-blue-500' },
    { name: 'Clothing & Jewellery', icon: <Shirt className="w-4 h-4" />, color: 'bg-pink-500' },
    { name: 'Travel & Stay', icon: <Car className="w-4 h-4" />, color: 'bg-emerald-500' },
    { name: 'Gifts & Mithai', icon: <Gift className="w-4 h-4" />, color: 'bg-indigo-500' },
    { name: 'Entertainment', icon: <Sparkles className="w-4 h-4" />, color: 'bg-orange-500' },
    { name: 'Emergency Contingency', icon: <ShieldAlert className="w-4 h-4" />, color: 'bg-stone-500' },
  ];

  // Category totals
  const categoryBreakdown = categories.map((cat) => {
    const catExpenses = expenses.filter((e) => e.category === cat.name);
    const total = catExpenses.reduce((sum, e) => sum + e.amount, 0);
    const percentOfBudget = totalBudget > 0 ? Math.round((total / totalBudget) * 100) : 0;
    return { ...cat, total, percentOfBudget, count: catExpenses.length };
  });

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.vendorName && e.vendorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      e.paidBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategoryFilter === 'all' || e.category === selectedCategoryFilter;
    const matchesStatus = selectedStatusFilter === 'all' || e.paymentStatus === selectedStatusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addExpense({
      title,
      category,
      amount: Number(amount),
      paidDate,
      paymentMethod,
      paymentStatus,
      paidBy,
      vendorName: vendorName || undefined,
      notes: notes || undefined,
    });

    setIsAddExpenseModalOpen(false);
    setTitle('');
    setNotes('');
    showToast('Logged new wedding expense');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Main Financial Meter */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Kosh & Kharcha
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Budget Calculator & Expense Ledger
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Track multi-lakh allocations, category spend caps, payment methods, and pending dues.
            </p>
          </div>

          <button
            onClick={() => setIsAddExpenseModalOpen(true)}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Record Expense</span>
          </button>
        </div>

        {/* Big Financial Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
            <span className="text-xs font-bold text-stone-500 font-heading uppercase tracking-wider">
              Total Wedding Budget
            </span>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810] mt-1">
              ₹{(totalBudget / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-xs text-stone-500 mt-0.5">Approved by both families</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-emerald-800">
              Total Cleared & Paid
            </span>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold mt-1">
              ₹{(totalPaid / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-xs text-emerald-700 mt-0.5">{spentPercent}% of total fund utilized</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-amber-800">
              Pending Settlements
            </span>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold mt-1">
              ₹{(totalPending / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-xs text-amber-700 mt-0.5">Invoices awaiting final sign-off</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
            <span className="text-xs font-bold font-heading uppercase tracking-wider text-blue-800">
              Available Reserve
            </span>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold mt-1">
              ₹{(remainingBudget / 100000).toFixed(2)} Lakhs
            </div>
            <div className="text-xs text-blue-700 mt-0.5">Unallocated balance</div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-stone-700">Budget Consumption:</span>
            <span className="text-[#7A1C2E]">{spentPercent}% Paid Out</span>
          </div>
          <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden border border-stone-200 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 to-[#7A1C2E] transition-all"
              style={{ width: `${spentPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Breakdown Visual Cards */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
        <h3 className="font-heading text-base font-bold text-[#2C1810]">
          Category Spend Analysis
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.name}
              onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === cat.name ? 'all' : cat.name)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                selectedCategoryFilter === cat.name
                  ? 'border-[#7A1C2E] bg-[#FAF0E1] ring-2 ring-[#7A1C2E]/20'
                  : 'border-[#E8DFD0] bg-[#FAF7F2] hover:bg-[#FAF0E1]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${cat.color} text-white flex items-center justify-center`}>
                    {cat.icon}
                  </div>
                  <span className="font-heading font-bold text-xs text-[#2C1810]">{cat.name}</span>
                </div>
                <span className="text-xs font-bold text-stone-700">₹{(cat.total / 1000).toLocaleString('en-IN')}k</span>
              </div>

              <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full`}
                  style={{ width: `${Math.min(100, cat.percentOfBudget * 2)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-stone-500 mt-1">
                <span>{cat.count} recorded payments</span>
                <span>{cat.percentOfBudget}% of total budget</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100">
          <h3 className="font-heading text-base font-bold text-[#2C1810]">
            Detailed Expense Ledger ({filteredExpenses.length} entries)
          </h3>

          <div className="flex items-center gap-2">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none font-medium text-stone-700"
            >
              <option value="all">Status: All</option>
              <option value="paid">Paid & Cleared</option>
              <option value="pending">Pending</option>
              <option value="advance_paid">Advance Paid</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E8DFD0] text-stone-500 font-heading text-[11px] uppercase tracking-wider">
              <th className="pb-3 px-3">Expense Title & Vendor</th>
              <th className="pb-3 px-3">Category</th>
              <th className="pb-3 px-3">Amount (₹)</th>
              <th className="pb-3 px-3">Payment Method</th>
              <th className="pb-3 px-3">Paid By & Date</th>
              <th className="pb-3 px-3">Status</th>
              <th className="pb-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredExpenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-[#FAF7F2] transition-colors">
                <td className="py-3 px-3">
                  <div className="font-bold text-stone-900 font-heading">{exp.title}</div>
                  <div className="text-[11px] text-stone-500">{exp.vendorName || 'General Supplier'}</div>
                </td>

                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 text-stone-800">
                    {exp.category}
                  </span>
                </td>

                <td className="py-3 px-3 font-heading font-bold text-sm text-[#2C1810]">
                  ₹{exp.amount.toLocaleString('en-IN')}
                </td>

                <td className="py-3 px-3 text-stone-600">{exp.paymentMethod}</td>

                <td className="py-3 px-3">
                  <div className="font-semibold text-stone-800">{exp.paidBy}</div>
                  <div className="text-[10px] text-stone-400">{exp.paidDate}</div>
                </td>

                <td className="py-3 px-3">
                  <PaymentBadge status={exp.paymentStatus} />
                </td>

                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => setExpenseToDelete(exp)}
                    className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600"
                    title="Delete Entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Record Expense Modal */}
      {isAddExpenseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900 max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Record Wedding Expense</h3>
            <p className="text-xs text-stone-500 mb-5">Log voucher, bank transfers, cash payments or advances</p>

            <form onSubmit={handleSaveExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Expense Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sangeet Fireworks & Cold Pyro Stage Setup"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Expense['category'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Payment Method
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as Expense['paymentMethod'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="UPI / QR">UPI / QR Code</option>
                    <option value="Bank Transfer / NEFT">Bank Transfer / NEFT / RTGS</option>
                    <option value="Cash Voucher">Cash Voucher</option>
                    <option value="Cheque">Bank Cheque</option>
                    <option value="Credit Card">Credit Card</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as Expense['paymentStatus'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="paid">Paid & Cleared</option>
                    <option value="pending">Pending Payment</option>
                    <option value="advance_paid">Advance Paid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Paid By (Family / Person)
                  </label>
                  <input
                    type="text"
                    value={paidBy}
                    onChange={(e) => setPaidBy(e.target.value)}
                    placeholder="e.g. Bride Father (Mr. Sharma)"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Payment Date
                  </label>
                  <input
                    type="date"
                    value={paidDate}
                    onChange={(e) => setPaidDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Vendor / Payee Name
                </label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder="e.g. Royal Decorators Pvt Ltd"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsAddExpenseModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={!!expenseToDelete}
        title="Delete Expense Entry?"
        message={`Are you sure you want to delete "${expenseToDelete?.title}" (₹${expenseToDelete?.amount})?`}
        confirmLabel="Delete Expense"
        isDestructive={true}
        onConfirm={() => {
          if (expenseToDelete) {
            deleteExpense(expenseToDelete.id);
            setExpenseToDelete(null);
          }
        }}
        onCancel={() => setExpenseToDelete(null)}
      />
    </div>
  );
};
