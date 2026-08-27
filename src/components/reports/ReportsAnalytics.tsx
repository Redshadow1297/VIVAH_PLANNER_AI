import React from 'react';
import {
  FileBarChart,
  Download,
  Users,
  Building2,
  UtensilsCrossed,
  DollarSign,
  PieChart,
  CheckCircle2,
  Calendar,
  Share2,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const ReportsAnalytics: React.FC = () => {
  const { wedding, guests, events, rooms, vendors, expenses, showToast } = useWedding();

  const totalGuests = guests.length;
  const attendingGuests = guests.filter((g) => g.rsvpStatus === 'attending');
  const attendingPax = attendingGuests.reduce((sum, g) => sum + g.membersCount, 0);

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === 'occupied').length;
  const roomOccupancyPercent = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const totalBudget = wedding.totalBudget;
  const totalPaid = expenses.reduce((sum, e) => (e.paymentStatus === 'paid' ? sum + e.amount : sum), 0);
  const budgetUtilization = totalBudget > 0 ? Math.round((totalPaid / totalBudget) * 100) : 0;

  const vegGuests = guests.filter((g) => g.mealPreference === 'veg').reduce((sum, g) => sum + g.membersCount, 0);
  const jainGuests = guests.filter((g) => g.mealPreference === 'jain').reduce((sum, g) => sum + g.membersCount, 0);
  const nonVegGuests = guests.filter((g) => g.mealPreference === 'non_veg').reduce((sum, g) => sum + g.membersCount, 0);

  const handleExportDossier = () => {
    showToast('Comprehensive 48-Page Master Wedding Dossier generated for print/PDF!', 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Export Dossier CTA */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Ganan & Vivaran
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Wedding Dossier & Analytical Reports
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Consolidated summaries for wedding planners, bride & groom families, and venue managers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportDossier}
              className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Export Master Dossier (PDF)</span>
            </button>
          </div>
        </div>

        {/* 4 Analytical KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-xs font-bold text-stone-500 font-heading">RSVP Attendance Rate</span>
            <div className="font-heading text-2xl font-extrabold text-[#2C1810] mt-1">
              {Math.round((attendingGuests.length / totalGuests) * 100)}%
            </div>
            <div className="text-xs text-stone-500 mt-0.5">{attendingPax} Confirmed Attendees</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span className="text-xs font-bold font-heading text-emerald-800">Hotel Room Fill Rate</span>
            <div className="font-heading text-2xl font-extrabold mt-1">{roomOccupancyPercent}%</div>
            <div className="text-xs text-emerald-700 mt-0.5">{occupiedRooms} of {totalRooms} Rooms Assigned</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950">
            <span className="text-xs font-bold font-heading text-amber-800">Budget Utilized</span>
            <div className="font-heading text-2xl font-extrabold mt-1">{budgetUtilization}%</div>
            <div className="text-xs text-amber-700 mt-0.5">₹{(totalPaid / 100000).toFixed(1)}L of ₹{(totalBudget / 100000).toFixed(1)}L</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950">
            <span className="text-xs font-bold font-heading text-blue-800">Ceremonies Scheduled</span>
            <div className="font-heading text-2xl font-extrabold mt-1">{events.length} Rituals</div>
            <div className="text-xs text-blue-700 mt-0.5">Spanning 4 Days in Udaipur</div>
          </div>
        </div>
      </div>

      {/* Analytical Breakdown Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dietary Distribution */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-base font-bold text-[#2C1810]">Dietary & Kitchen Planning</h3>
              <p className="text-xs text-stone-500">Catering headcount breakdown across families</p>
            </div>
            <UtensilsCrossed className="w-5 h-5 text-[#7A1C2E]" />
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-emerald-800">Pure Vegetarian (Non-Jain)</span>
                <span className="text-stone-900">{vegGuests} Pax ({Math.round((vegGuests / (vegGuests + jainGuests + nonVegGuests || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${Math.round((vegGuests / (vegGuests + jainGuests + nonVegGuests || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-amber-800">Strict Jain (No Onion/Garlic/Root)</span>
                <span className="text-stone-900">{jainGuests} Pax ({Math.round((jainGuests / (vegGuests + jainGuests + nonVegGuests || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${Math.round((jainGuests / (vegGuests + jainGuests + nonVegGuests || 1)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-rose-800">Non-Vegetarian / Cocktail Snacks</span>
                <span className="text-stone-900">{nonVegGuests} Pax ({Math.round((nonVegGuests / (vegGuests + jainGuests + nonVegGuests || 1)) * 100)}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-rose-600 rounded-full"
                  style={{ width: `${Math.round((nonVegGuests / (vegGuests + jainGuests + nonVegGuests || 1)) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Deliverable Completion */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-base font-bold text-[#2C1810]">Vendor Contract Status</h3>
              <p className="text-xs text-stone-500">Advance disbursements and payment clearances</p>
            </div>
            <FileBarChart className="w-5 h-5 text-[#7A1C2E]" />
          </div>

          <div className="space-y-3">
            {vendors.map((v) => {
              const paidPercent = Math.round((v.advancePaid / v.totalCost) * 100);
              return (
                <div key={v.id} className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">{v.name} ({v.category})</span>
                    <span className="font-mono font-bold text-stone-700">{paidPercent}% Paid</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-stone-200 overflow-hidden">
                    <div className="h-full bg-[#7A1C2E] rounded-full" style={{ width: `${paidPercent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
