import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  UserPlus,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building2,
  Car,
  UtensilsCrossed,
  Sparkles,
  Trash2,
  Edit2,
  Share2,
  FileSpreadsheet,
  Send,
  MoreVertical,
  CheckSquare,
  Square,
  Tag,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Guest, FamilySide, RsvpStatus, MealPreference } from '../../types';
import { RsvpBadge, MealBadge, CategoryBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/Toast';

export const GuestManagement: React.FC = () => {
  const {
    guests,
    addGuest,
    updateGuest,
    deleteGuest,
    bulkUpdateGuests,
    events,
    rooms,
    showToast,
  } = useWedding();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSide, setSelectedSide] = useState<FamilySide | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRsvp, setSelectedRsvp] = useState<RsvpStatus | 'all'>('all');
  const [selectedMeal, setSelectedMeal] = useState<MealPreference | 'all'>('all');

  // Multi-selection for bulk operations
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState(false);
  const [guestToEdit, setGuestToEdit] = useState<Guest | null>(null);
  const [guestToDelete, setGuestToDelete] = useState<Guest | null>(null);

  // New guest state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [familySide, setFamilySide] = useState<FamilySide>('bride');
  const [category, setCategory] = useState<Guest['category']>('Close Family');
  const [membersCount, setMembersCount] = useState(2);
  const [mealPreference, setMealPreference] = useState<MealPreference>('veg');
  const [accommodationRequired, setAccommodationRequired] = useState(true);
  const [transportRequired, setTransportRequired] = useState(true);
  const [notes, setNotes] = useState('');

  // Filter logic
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.phone.includes(searchQuery) ||
      (g.email && g.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.assignedRoom && g.assignedRoom.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSide = selectedSide === 'all' || g.familySide === selectedSide || g.familySide === 'both';
    const matchesCategory = selectedCategory === 'all' || g.category === selectedCategory;
    const matchesRsvp = selectedRsvp === 'all' || g.rsvpStatus === selectedRsvp;
    const matchesMeal = selectedMeal === 'all' || g.mealPreference === selectedMeal;

    return matchesSearch && matchesSide && matchesCategory && matchesRsvp && matchesMeal;
  });

  const totalPax = filteredGuests.reduce((sum, g) => sum + g.membersCount, 0);

  const handleSelectAll = () => {
    if (selectedGuestIds.length === filteredGuests.length) {
      setSelectedGuestIds([]);
    } else {
      setSelectedGuestIds(filteredGuests.map((g) => g.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedGuestIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkRsvp = (status: RsvpStatus) => {
    bulkUpdateGuests(selectedGuestIds, { rsvpStatus: status });
    setSelectedGuestIds([]);
    showToast(`Updated RSVP to ${status} for ${selectedGuestIds.length} guests`);
  };

  const handleBulkReminder = () => {
    showToast(`Dispatched WhatsApp RSVP reminders to ${selectedGuestIds.length} families!`, 'info');
    setSelectedGuestIds([]);
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'FamilySide', 'Category', 'Members', 'RSVP', 'Meal', 'Room', 'Transport'];
    const rows = filteredGuests.map((g) => [
      `"${g.name}"`,
      `"${g.phone}"`,
      `"${g.email || ''}"`,
      g.familySide,
      g.category,
      g.membersCount,
      g.rsvpStatus,
      g.mealPreference,
      `"${g.assignedRoom || ''}"`,
      g.transportRequired ? 'Yes' : 'No',
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Wedding_Guest_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Guest List CSV exported successfully');
  };

  const handleImportSample = () => {
    // Adds a batch of sample imported guests
    const newGuestsData: Omit<Guest, 'id'>[] = [
      {
        name: 'Sunil & Sunita Mittal',
        phone: '+91 98200 99887',
        email: 'sunil.mittal@corp.com',
        familySide: 'groom',
        relation: 'Family Friend',
        category: 'VIP',
        invitedEvents: events.map((e) => e.id),
        rsvpStatus: 'attending',
        membersCount: 3,
        mealPreference: 'veg',
        accommodationRequired: true,
        assignedRoom: 'Room 205 - Oberoi Suite',
        transportRequired: true,
        invitationSent: true,
        notes: 'VIP Business Partner of Groom father',
      },
      {
        name: 'Dr. Kabir & Ananya Mehta',
        phone: '+91 98111 22334',
        email: 'kabir.m@hospital.org',
        familySide: 'bride',
        relation: 'Doctor Friend',
        category: 'Friends',
        invitedEvents: events.map((e) => e.id),
        rsvpStatus: 'attending',
        membersCount: 2,
        mealPreference: 'jain',
        accommodationRequired: true,
        transportRequired: false,
        invitationSent: true,
        notes: 'Childhood doctor friend',
      },
    ];

    newGuestsData.forEach((g) => addGuest(g));
    showToast('Imported 2 guest families from file sample');
  };

  const handleSaveGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    if (guestToEdit) {
      updateGuest(guestToEdit.id, {
        name,
        phone,
        email: email || undefined,
        familySide,
        category,
        membersCount: Number(membersCount),
        mealPreference,
        accommodationRequired,
        transportRequired,
        notes: notes || undefined,
      });
      setGuestToEdit(null);
    } else {
      addGuest({
        name,
        phone,
        email: email || undefined,
        familySide,
        category,
        invitedEvents: events.map((e) => e.id),
        rsvpStatus: 'pending',
        membersCount: Number(membersCount),
        mealPreference,
        accommodationRequired,
        transportRequired,
        invitationSent: false,
        notes: notes || undefined,
      });
    }

    setIsAddGuestModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header with Title and Global Actions */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Mehmaan & Atithi
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Guest List & Hospitality Register
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Manage family heads, plus-ones, meal preferences, RSVP status, and room allotments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleImportSample}
              className="px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-stone-500" />
              <span>Import Excel</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                setGuestToEdit(null);
                setIsAddGuestModalOpen(true);
              }}
              className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Guest</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, phone, room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none focus:ring-2 focus:ring-[#7A1C2E]/20"
            />
          </div>

          {/* Family Side */}
          <div>
            <select
              value={selectedSide}
              onChange={(e) => setSelectedSide(e.target.value as FamilySide | 'all')}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none font-medium text-stone-700"
            >
              <option value="all">Side: All Families</option>
              <option value="bride">Bride's Side (Sharma)</option>
              <option value="groom">Groom's Side (Shinde)</option>
              <option value="both">Both Families / Mutual</option>
            </select>
          </div>

          {/* RSVP Status */}
          <div>
            <select
              value={selectedRsvp}
              onChange={(e) => setSelectedRsvp(e.target.value as RsvpStatus | 'all')}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none font-medium text-stone-700"
            >
              <option value="all">RSVP: All Statuses</option>
              <option value="attending">Attending</option>
              <option value="declined">Declined</option>
              <option value="pending">Pending Response</option>
              <option value="tentative">Tentative</option>
            </select>
          </div>

          {/* Meal Preference */}
          <div>
            <select
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(e.target.value as MealPreference | 'all')}
              className="w-full px-3 py-2 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none font-medium text-stone-700"
            >
              <option value="all">Diet: All Diets</option>
              <option value="veg">Pure Vegetarian</option>
              <option value="jain">Strict Jain (No root veg)</option>
              <option value="non_veg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
        </div>

        {/* Live Filter Summary & Bulk Bar */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <span className="font-bold text-stone-900">{filteredGuests.length}</span> families found (
            <span className="font-bold text-[#7A1C2E]">{totalPax}</span> total guests)
          </div>

          {selectedGuestIds.length > 0 && (
            <div className="flex items-center gap-2 bg-[#FAF0E1] px-3 py-1.5 rounded-xl border border-[#D4AF37]">
              <span className="font-bold text-[#7A1C2E] text-xs">
                {selectedGuestIds.length} Selected:
              </span>
              <button
                onClick={() => handleBulkRsvp('attending')}
                className="px-2 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-semibold hover:bg-emerald-700"
              >
                Mark Attending
              </button>
              <button
                onClick={() => handleBulkRsvp('declined')}
                className="px-2 py-0.5 bg-rose-600 text-white rounded text-[11px] font-semibold hover:bg-rose-700"
              >
                Mark Declined
              </button>
              <button
                onClick={handleBulkReminder}
                className="px-2 py-0.5 bg-[#7A1C2E] text-white rounded text-[11px] font-semibold hover:bg-[#621423] flex items-center gap-1"
              >
                <Send className="w-3 h-3" /> WhatsApp Reminder
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E8DFD0] text-stone-500 font-heading text-[11px] uppercase tracking-wider">
              <th className="pb-3 px-3 w-8">
                <button
                  onClick={handleSelectAll}
                  className="text-stone-400 hover:text-stone-700"
                >
                  {selectedGuestIds.length === filteredGuests.length && filteredGuests.length > 0 ? (
                    <CheckSquare className="w-4 h-4 text-[#7A1C2E]" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th className="pb-3 px-3">Guest / Family Head</th>
              <th className="pb-3 px-3">Side & Category</th>
              <th className="pb-3 px-3">Pax Count</th>
              <th className="pb-3 px-3">RSVP Status</th>
              <th className="pb-3 px-3">Diet & Meal</th>
              <th className="pb-3 px-3">Room Allotment</th>
              <th className="pb-3 px-3">Transport</th>
              <th className="pb-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredGuests.map((g) => {
              const isSelected = selectedGuestIds.includes(g.id);
              return (
                <tr
                  key={g.id}
                  className={`hover:bg-[#FAF7F2] transition-colors ${
                    isSelected ? 'bg-[#FAF0E1]/50' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleToggleSelect(g.id)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#7A1C2E]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-900 font-heading">{g.name}</div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-1.5 mt-0.5">
                      <span>{g.phone}</span>
                      {g.email && <span>• {g.email}</span>}
                    </div>
                    {g.plusOnes && g.plusOnes.length > 0 && (
                      <div className="text-[10px] text-stone-400 mt-0.5">
                        Plus ones: {g.plusOnes.map((p) => `${p.name} (${p.relation})`).join(', ')}
                      </div>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <div className="space-y-1">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          g.familySide === 'bride'
                            ? 'bg-rose-50 text-rose-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {g.familySide === 'bride' ? "Bride" : "Groom"}
                      </span>
                      <div>
                        <CategoryBadge category={g.category} />
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-heading font-bold text-sm text-[#2C1810]">
                      {g.membersCount} <span className="text-xs font-normal text-stone-500">pax</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <RsvpBadge status={g.rsvpStatus} />
                  </td>

                  <td className="py-3 px-3">
                    <MealBadge preference={g.mealPreference} />
                  </td>

                  <td className="py-3 px-3">
                    {g.assignedRoom ? (
                      <span className="font-semibold text-emerald-800 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-emerald-600" />
                        {g.assignedRoom}
                      </span>
                    ) : (
                      <span className="text-stone-400">
                        {g.accommodationRequired ? 'Needs Room' : 'Local Stay'}
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    {g.transportRequired ? (
                      <span className="text-blue-700 font-semibold flex items-center gap-1">
                        <Car className="w-3 h-3" /> Pickup Needed
                      </span>
                    ) : (
                      <span className="text-stone-400">Self Travel</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setGuestToEdit(g);
                          setName(g.name);
                          setPhone(g.phone);
                          setEmail(g.email || '');
                          setFamilySide(g.familySide);
                          setCategory(g.category);
                          setMembersCount(g.membersCount);
                          setMealPreference(g.mealPreference);
                          setAccommodationRequired(g.accommodationRequired);
                          setTransportRequired(g.transportRequired);
                          setNotes(g.notes || '');
                          setIsAddGuestModalOpen(true);
                        }}
                        className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600"
                        title="Edit Guest"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setGuestToDelete(g)}
                        className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600"
                        title="Delete Guest"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Guest Modal */}
      {isAddGuestModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900 max-h-[90vh] overflow-y-auto">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">
              {guestToEdit ? 'Edit Guest Details' : 'Add Guest / Family'}
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Register contact info, total headcounts, dietary choices, and hospitality needs.
            </p>

            <form onSubmit={handleSaveGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Primary Guest / Family Head Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mr. Rajesh & Sunita Kapoor"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Mobile Phone (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200..."
                    className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Family Side
                  </label>
                  <select
                    value={familySide}
                    onChange={(e) => setFamilySide(e.target.value as FamilySide)}
                    className="w-full px-2.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="bride">Bride's Side</option>
                    <option value="groom">Groom's Side</option>
                    <option value="both">Both / Mutual</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Guest['category'])}
                    className="w-full px-2.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Close Family">Close Family</option>
                    <option value="Relatives">Relatives</option>
                    <option value="Friends">Friends</option>
                    <option value="Colleagues">Colleagues</option>
                    <option value="Neighbors">Neighbors</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Total Pax (Members)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={15}
                    value={membersCount}
                    onChange={(e) => setMembersCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none font-bold text-center"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Dietary Preference
                  </label>
                  <select
                    value={mealPreference}
                    onChange={(e) => setMealPreference(e.target.value as MealPreference)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="veg">Pure Vegetarian</option>
                    <option value="jain">Strict Jain (No Root Veg)</option>
                    <option value="non_veg">Non-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end space-y-1.5 pb-1">
                  <label className="flex items-center gap-2 text-xs text-stone-700 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={accommodationRequired}
                      onChange={(e) => setAccommodationRequired(e.target.checked)}
                      className="rounded text-[#7A1C2E]"
                    />
                    Requires Room Stay
                  </label>
                  <label className="flex items-center gap-2 text-xs text-stone-700 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={transportRequired}
                      onChange={(e) => setTransportRequired(e.target.checked)}
                      className="rounded text-[#7A1C2E]"
                    />
                    Requires Airport Pickup
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Hospitality Notes & Special Requests
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Ground floor room preferred for senior grandmother"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsAddGuestModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  {guestToEdit ? 'Save Changes' : 'Add to Guest List'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!guestToDelete}
        title="Remove Guest?"
        message={`Are you sure you want to remove ${guestToDelete?.name} from the guest register?`}
        confirmLabel="Remove Guest"
        isDestructive={true}
        onConfirm={() => {
          if (guestToDelete) {
            deleteGuest(guestToDelete.id);
            setGuestToDelete(null);
          }
        }}
        onCancel={() => setGuestToDelete(null)}
      />
    </div>
  );
};
