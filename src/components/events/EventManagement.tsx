import React, { useState } from 'react';
import {
  CalendarDays,
  ListFilter,
  Clock,
  MapPin,
  Users,
  Plus,
  Copy,
  Trash2,
  Edit2,
  DollarSign,
  UtensilsCrossed,
  Sparkles,
  Camera,
  Shirt,
  Share2,
  Calendar as CalendarIcon,
  ChevronRight,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { WeddingEvent } from '../../types';
import { ConfirmModal } from '../common/Toast';

export const EventManagement: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, duplicateEvent, vendors, mealPlans, showToast } = useWedding();

  const [activeView, setActiveView] = useState<'timeline' | 'calendar' | 'list'>('timeline');
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(events[0] || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<WeddingEvent | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState<WeddingEvent['eventType']>('sangeet');
  const [date, setDate] = useState('2026-11-29');
  const [startTime, setStartTime] = useState('07:00 PM');
  const [endTime, setEndTime] = useState('11:30 PM');
  const [venue, setVenue] = useState('The Oberoi Udaivilas Lawn');
  const [locationDetails, setLocationDetails] = useState('North Lawn Courtyard');
  const [description, setDescription] = useState('');
  const [dressCode, setDressCode] = useState('Royal Ethnic / Traditional');
  const [guestCount, setGuestCount] = useState(300);
  const [budgetAllocated, setBudgetAllocated] = useState(500000);

  const handleSaveNewEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addEvent({
      name,
      eventType,
      date,
      startTime,
      endTime,
      venue,
      locationDetails,
      description,
      dressCode,
      guestCount: Number(guestCount),
      assignedVendors: ['ven-01', 'ven-02'],
      assignedTasks: [],
      budgetAllocated: Number(budgetAllocated),
      status: 'upcoming',
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    });

    setIsAddModalOpen(false);
    setName('');
    setDescription('');
  };

  const handleConfirmDelete = () => {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
      if (selectedEvent?.id === eventToDelete.id) {
        setSelectedEvent(events[0] || null);
      }
      setEventToDelete(null);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Rituals & Ceremonies
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Event Management & Run-Sheets
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Multi-day Indian wedding schedule from Ganesh Puja to Grand Reception banquet.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Switchers */}
            <div className="flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#E2D8C6]">
              <button
                onClick={() => setActiveView('timeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'timeline'
                    ? 'bg-[#7A1C2E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Timeline
              </button>
              <button
                onClick={() => setActiveView('calendar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'calendar'
                    ? 'bg-[#7A1C2E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Calendar
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'list'
                    ? 'bg-[#7A1C2E] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                List View
              </button>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Ceremony</span>
            </button>
          </div>
        </div>

        {/* Ceremonies Overview Bar */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {events.map((evt) => (
            <button
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedEvent?.id === evt.id
                  ? 'bg-[#FAF0E1] text-[#7A1C2E] border-2 border-[#7A1C2E] shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#7A1C2E]"></span>
              <span>{evt.name}</span>
              <span className="text-[10px] text-stone-400 font-normal">
                ({new Date(evt.date).getDate()} {new Date(evt.date).toLocaleString('default', { month: 'short' })})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Event Details Hero & Management Drawer */}
      {selectedEvent && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-stone-100">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FAF0E1] text-[#7A1C2E] border border-[#D4AF37]/40">
                  {selectedEvent.eventType.toUpperCase()} CEREMONY
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Status: {selectedEvent.status}
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
                {selectedEvent.name}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                {selectedEvent.description}
              </p>
            </div>

            {/* Event Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => duplicateEvent(selectedEvent.id)}
                className="p-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Duplicate Event"
              >
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Duplicate</span>
              </button>
              <button
                onClick={() => {
                  updateEvent(selectedEvent.id, {
                    status: selectedEvent.status === 'cancelled' ? 'upcoming' : 'cancelled',
                  });
                }}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedEvent.status === 'cancelled'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                }`}
              >
                {selectedEvent.status === 'cancelled' ? 'Restore Event' : 'Cancel Event'}
              </button>
              <button
                onClick={() => setEventToDelete(selectedEvent)}
                className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors"
                title="Delete Event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase font-heading mb-1">
                <Clock className="w-4 h-4 text-amber-700" />
                Date & Timing
              </div>
              <div className="font-heading font-bold text-base text-[#2C1810]">
                {new Date(selectedEvent.date).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              <div className="text-xs text-amber-800 font-semibold mt-0.5">
                {selectedEvent.startTime} - {selectedEvent.endTime}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase font-heading mb-1">
                <MapPin className="w-4 h-4 text-rose-700" />
                Venue & Spot
              </div>
              <div className="font-heading font-bold text-base text-[#2C1810] truncate">
                {selectedEvent.venue}
              </div>
              <div className="text-xs text-stone-500 truncate mt-0.5">{selectedEvent.locationDetails}</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase font-heading mb-1">
                <Shirt className="w-4 h-4 text-indigo-700" />
                Dress Code & Theme
              </div>
              <div className="font-bold text-xs text-[#2C1810] leading-snug">
                {selectedEvent.dressCode}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
              <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase font-heading mb-1">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                Budget & Guests
              </div>
              <div className="font-heading font-bold text-base text-emerald-800">
                ₹{(selectedEvent.budgetAllocated / 100000).toFixed(1)} Lakhs
              </div>
              <div className="text-xs text-stone-500 mt-0.5">{selectedEvent.guestCount} Invited Guests</div>
            </div>
          </div>

          {/* Attached Vendors & Catering Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-[#E8DFD0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-bold uppercase text-stone-500">
                  Assigned Vendors ({selectedEvent.assignedVendors.length})
                </span>
                <span className="text-[11px] text-[#7A1C2E] font-semibold">Decor & Photo Crew</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedEvent.assignedVendors.map((vid) => {
                  const ven = vendors.find((v) => v.id === vid);
                  return (
                    <span
                      key={vid}
                      className="px-2.5 py-1 rounded-xl text-xs font-medium bg-stone-100 text-stone-800 border border-stone-200"
                    >
                      {ven?.name || 'Assigned Vendor'} ({ven?.category})
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E8DFD0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-heading text-xs font-bold uppercase text-stone-500">
                  Meal Plan & Banquets
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold">Gourmet Feast</span>
              </div>
              <p className="text-xs text-stone-600">
                Linked to master banquet menu with live counters, Jain segregations, and beverage bar.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Timeline or Calendar or List representation */}
      {activeView === 'timeline' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-6">
          <h3 className="font-heading text-lg font-bold text-[#2C1810]">Chronological Run-Sheet</h3>
          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D4AF37]/50 space-y-8">
            {events.map((evt, idx) => (
              <div
                key={evt.id}
                onClick={() => setSelectedEvent(evt)}
                className="relative group cursor-pointer"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-[#7A1C2E] border-4 border-white shadow-md flex items-center justify-center text-white text-[10px] font-bold">
                  {idx + 1}
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-heading text-base font-bold text-[#2C1810] group-hover:text-[#7A1C2E] transition-colors">
                      {evt.name}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-[#7A1C2E] border border-[#E2D8C6] self-start sm:self-center">
                      {new Date(evt.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      • {evt.startTime}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mb-3">{evt.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      {evt.venue}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-amber-800 font-medium">
                      <Shirt className="w-3.5 h-3.5 text-amber-600" />
                      {evt.dressCode}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{evt.guestCount} Guests</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'list' && (
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8DFD0] text-stone-500 font-heading text-[11px] uppercase tracking-wider">
                <th className="pb-3 px-3">Ceremony</th>
                <th className="pb-3 px-3">Date & Time</th>
                <th className="pb-3 px-3">Venue</th>
                <th className="pb-3 px-3">Guest Count</th>
                <th className="pb-3 px-3">Budget</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {events.map((evt) => (
                <tr
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className="hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-900 font-heading">{evt.name}</div>
                    <div className="text-[10px] text-stone-500 uppercase">{evt.eventType}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-stone-800">{evt.date}</div>
                    <div className="text-stone-500">{evt.startTime}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-stone-700">{evt.venue}</td>
                  <td className="py-3 px-3 font-bold text-[#7A1C2E]">{evt.guestCount} pax</td>
                  <td className="py-3 px-3 font-bold text-emerald-800">
                    ₹{(evt.budgetAllocated / 100000).toFixed(1)}L
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {evt.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateEvent(evt.id);
                      }}
                      className="p-1 text-stone-400 hover:text-stone-700"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeView === 'calendar' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
          <h3 className="font-heading text-lg font-bold text-[#2C1810] mb-4">Wedding Week Calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {['2026-11-28', '2026-11-29', '2026-11-30', '2026-12-01'].map((dayStr) => {
              const dayEvents = events.filter((e) => e.date === dayStr);
              return (
                <div key={dayStr} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD0] space-y-3">
                  <div className="border-b border-[#E2D8C6] pb-2">
                    <div className="text-xs uppercase font-bold text-stone-500 font-heading">
                      {new Date(dayStr).toLocaleDateString('en-IN', { weekday: 'long' })}
                    </div>
                    <div className="font-heading text-lg font-extrabold text-[#7A1C2E]">
                      {new Date(dayStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {dayEvents.map((e) => (
                      <div
                        key={e.id}
                        onClick={() => setSelectedEvent(e)}
                        className="p-2.5 rounded-xl bg-white border border-[#D4AF37]/40 shadow-2xs hover:shadow-sm cursor-pointer"
                      >
                        <div className="font-bold text-xs text-[#2C1810]">{e.name}</div>
                        <div className="text-[10px] text-amber-800 font-semibold mt-0.5">
                          {e.startTime}
                        </div>
                        <div className="text-[10px] text-stone-500 truncate">{e.venue}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900 max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Add Ceremony / Event</h3>
            <p className="text-xs text-stone-500 mb-5">Configure ritual details, timings and venue setup</p>

            <form onSubmit={handleSaveNewEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sufi & Cocktail Night"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Ceremony Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as WeddingEvent['eventType'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="engagement">Engagement / Welcome</option>
                    <option value="mehendi">Mehendi</option>
                    <option value="haldi">Haldi</option>
                    <option value="sangeet">Sangeet Night</option>
                    <option value="wedding">Wedding / Pheras</option>
                    <option value="reception">Reception Banquet</option>
                    <option value="cocktail">Cocktail Party</option>
                    <option value="custom">Custom Ritual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    placeholder="07:00 PM"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    placeholder="11:30 PM"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Venue Location
                </label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Zenana Mahal Lawns, Udaipur"
                  className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={dressCode}
                  onChange={(e) => setDressCode(e.target.value)}
                  placeholder="e.g. Velvet Lehengas & Tuxedos"
                  className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Expected Guests
                  </label>
                  <input
                    type="number"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Allocated Budget (₹)
                  </label>
                  <input
                    type="number"
                    value={budgetAllocated}
                    onChange={(e) => setBudgetAllocated(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Ceremony Description
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Summary of rituals, music performances, anchor..."
                  className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
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
                  Add Ceremony
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!eventToDelete}
        title="Delete Ceremony?"
        message={`Are you sure you want to permanently delete "${eventToDelete?.name}"?`}
        confirmLabel="Delete Ceremony"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setEventToDelete(null)}
      />
    </div>
  );
};
