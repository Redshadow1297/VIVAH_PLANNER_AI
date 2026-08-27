import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Send,
  Download,
  Search,
  Filter,
  Users,
  UtensilsCrossed,
  Calendar,
  Sparkles,
  Phone,
  ArrowUpDown,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { RsvpStatus, Guest } from '../../types';
import { RsvpBadge, MealBadge } from '../common/StatusBadge';

export const RsvpManagement: React.FC = () => {
  const { guests, updateGuest, events, showToast } = useWedding();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<RsvpStatus | 'all'>('all');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('all');

  // Stats calculation
  const totalGuests = guests.length;
  const attending = guests.filter((g) => g.rsvpStatus === 'attending');
  const attendingPax = attending.reduce((sum, g) => sum + g.membersCount, 0);

  const declined = guests.filter((g) => g.rsvpStatus === 'declined');
  const declinedPax = declined.reduce((sum, g) => sum + g.membersCount, 0);

  const pending = guests.filter((g) => g.rsvpStatus === 'pending');
  const pendingPax = pending.reduce((sum, g) => sum + g.membersCount, 0);

  const tentative = guests.filter((g) => g.rsvpStatus === 'tentative');
  const tentativePax = tentative.reduce((sum, g) => sum + g.membersCount, 0);

  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) || g.phone.includes(searchQuery);
    const matchesStatus = selectedStatus === 'all' || g.rsvpStatus === selectedStatus;
    const matchesEvent = selectedEventFilter === 'all' || g.invitedEvents.includes(selectedEventFilter);
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const handleUpdateRsvp = (id: string, status: RsvpStatus) => {
    updateGuest(id, { rsvpStatus: status });
    showToast(`RSVP status updated to ${status}`);
  };

  const handleBulkRemindPending = () => {
    showToast(`Sent WhatsApp RSVP reminder messages to ${pending.length} pending families!`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Stats */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Swagat & Response
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              RSVP Tracking & Headcount Audit
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Real-time attendance confirmation per ritual, dietary choices, and travel dates.
            </p>
          </div>

          <button
            onClick={handleBulkRemindPending}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <Send className="w-3.5 h-3.5 text-amber-300" />
            <span>Remind Pending ({pending.length})</span>
          </button>
        </div>

        {/* 4 RSVP Metric KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div
            onClick={() => setSelectedStatus('attending')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'attending'
                ? 'bg-emerald-100 border-emerald-500 ring-2 ring-emerald-400/30'
                : 'bg-emerald-50/70 border-emerald-200 hover:bg-emerald-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-800 font-heading">Confirmed Attending</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-950">
              {attendingPax} <span className="text-xs font-normal text-emerald-700">pax ({attending.length} families)</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedStatus('pending')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'pending'
                ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400/30'
                : 'bg-amber-50/70 border-amber-200 hover:bg-amber-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-800 font-heading">Awaiting Reply</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-950">
              {pendingPax} <span className="text-xs font-normal text-amber-700">pax ({pending.length} families)</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedStatus('tentative')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'tentative'
                ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-400/30'
                : 'bg-blue-50/70 border-blue-200 hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-blue-800 font-heading">Tentative / Undecided</span>
              <HelpCircle className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-blue-950">
              {tentativePax} <span className="text-xs font-normal text-blue-700">pax ({tentative.length} families)</span>
            </div>
          </div>

          <div
            onClick={() => setSelectedStatus('declined')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedStatus === 'declined'
                ? 'bg-rose-100 border-rose-500 ring-2 ring-rose-400/30'
                : 'bg-rose-50/70 border-rose-200 hover:bg-rose-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-rose-800 font-heading">Unable to Attend</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="font-heading text-2xl sm:text-3xl font-extrabold text-rose-950">
              {declinedPax} <span className="text-xs font-normal text-rose-700">pax ({declined.length} families)</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === 'all' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
              }`}
            >
              All Responses ({totalGuests})
            </button>
            <select
              value={selectedEventFilter}
              onChange={(e) => setSelectedEventFilter(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-100 border border-stone-200 rounded-lg outline-none font-medium"
            >
              <option value="all">Filter By Ceremony: All</option>
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search RSVP list..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      {/* RSVP Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E8DFD0] text-stone-500 font-heading text-[11px] uppercase tracking-wider">
              <th className="pb-3 px-3">Guest Family</th>
              <th className="pb-3 px-3">Members (Pax)</th>
              <th className="pb-3 px-3">Current RSVP</th>
              <th className="pb-3 px-3">Ceremonies Attending</th>
              <th className="pb-3 px-3">Meal Preference</th>
              <th className="pb-3 px-3">Stay & Room</th>
              <th className="pb-3 px-3 text-right">Change Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredGuests.map((g) => (
              <tr key={g.id} className="hover:bg-[#FAF7F2] transition-colors">
                <td className="py-3 px-3">
                  <div className="font-bold text-stone-900 font-heading">{g.name}</div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-stone-400" />
                    <span>{g.phone}</span>
                  </div>
                </td>

                <td className="py-3 px-3">
                  <span className="font-heading font-bold text-sm text-[#2C1810]">{g.membersCount}</span>
                  <span className="text-[10px] text-stone-400 ml-1">Pax</span>
                </td>

                <td className="py-3 px-3">
                  <RsvpBadge status={g.rsvpStatus} />
                </td>

                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {events.map((e) => {
                      const isInvited = g.invitedEvents.includes(e.id);
                      return (
                        <span
                          key={e.id}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                            isInvited
                              ? 'bg-[#FAF0E1] text-[#7A1C2E] border border-[#D4AF37]/30'
                              : 'bg-stone-100 text-stone-400 opacity-50'
                          }`}
                        >
                          {e.name.split(' ')[0]}
                        </span>
                      );
                    })}
                  </div>
                </td>

                <td className="py-3 px-3">
                  <MealBadge preference={g.mealPreference} />
                </td>

                <td className="py-3 px-3">
                  {g.assignedRoom ? (
                    <span className="font-semibold text-emerald-800">{g.assignedRoom}</span>
                  ) : (
                    <span className="text-stone-400">{g.accommodationRequired ? 'Pending Room' : 'Local'}</span>
                  )}
                </td>

                <td className="py-3 px-3 text-right">
                  <select
                    value={g.rsvpStatus}
                    onChange={(e) => handleUpdateRsvp(g.id, e.target.value as RsvpStatus)}
                    className="px-2 py-1 bg-white border border-[#E2D8C6] rounded-lg text-xs font-semibold outline-none text-stone-700"
                  >
                    <option value="attending">Attending</option>
                    <option value="pending">Pending</option>
                    <option value="tentative">Tentative</option>
                    <option value="declined">Declined</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
