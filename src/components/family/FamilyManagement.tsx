import React, { useState } from 'react';
import {
  Users2,
  GitBranch,
  ListFilter,
  Plus,
  Search,
  Phone,
  Mail,
  Home,
  Car,
  Calendar,
  Heart,
  Crown,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { FamilyMember, FamilySide } from '../../types';
import { RsvpBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/Toast';

export const FamilyManagement: React.FC = () => {
  const { familyMembers, addFamilyMember, updateFamilyMember, deleteFamilyMember, events, showToast } = useWedding();

  const [activeView, setActiveView] = useState<'tree' | 'list'>('tree');
  const [selectedSide, setSelectedSide] = useState<FamilySide | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<FamilyMember | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [generation, setGeneration] = useState<FamilyMember['generation']>('parents');
  const [familySide, setFamilySide] = useState<FamilySide>('bride');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [accommodationRequired, setAccommodationRequired] = useState(true);
  const [assignedRoom, setAssignedRoom] = useState('');
  const [transportRequired, setTransportRequired] = useState(true);

  const filteredMembers = familyMembers.filter((m) => {
    const matchesSide = selectedSide === 'all' || m.familySide === selectedSide || m.familySide === 'both';
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.relation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);
    return matchesSide && matchesSearch;
  });

  // Group by generation for the tree view
  const grandparents = filteredMembers.filter((m) => m.generation === 'grandparents');
  const parentsAndUncles = filteredMembers.filter((m) => m.generation === 'parents');
  const coupleAndSiblings = filteredMembers.filter((m) => m.generation === 'couple_and_siblings');

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addFamilyMember({
      name,
      relation,
      generation,
      familySide,
      phone,
      email: email || undefined,
      events: events.map((e) => e.id),
      rsvpStatus: 'attending',
      accommodationRequired,
      assignedRoom: assignedRoom || undefined,
      transportRequired,
    });

    setIsAddModalOpen(false);
    setName('');
    setRelation('');
    setPhone('');
    setEmail('');
    setAssignedRoom('');
  };

  const handleConfirmDelete = () => {
    if (memberToDelete) {
      deleteFamilyMember(memberToDelete.id);
      setMemberToDelete(null);
      if (selectedMember?.id === memberToDelete.id) {
        setSelectedMember(null);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Khandaan & Lineage
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Family Management & Visual Tree
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Visualize generations of Ladkiwale & Ladkewale, room assignments & ritual responsibilities.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Switcher: Tree vs List */}
            <div className="flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#E2D8C6]">
              <button
                onClick={() => setActiveView('tree')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'tree' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>Family Tree</span>
              </button>
              <button
                onClick={() => setActiveView('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeView === 'list' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Directory List</span>
              </button>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-500 font-heading">Family Side:</span>
            <button
              onClick={() => setSelectedSide('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSide === 'all'
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              All ({familyMembers.length})
            </button>
            <button
              onClick={() => setSelectedSide('bride')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSide === 'bride'
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              Bride's Side (Sharma Ji)
            </button>
            <button
              onClick={() => setSelectedSide('groom')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedSide === 'groom'
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
              }`}
            >
              Groom's Side (Shinde Parivar)
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search family member..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none focus:ring-2 focus:ring-[#7A1C2E]/20"
            />
          </div>
        </div>
      </div>

      {/* Main Content: Tree View OR List View */}
      {activeView === 'tree' ? (
        <div className="space-y-8 bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#E8DFD0] shadow-xs relative overflow-hidden">
          {/* Generation 1: Grandparents (Elders & Mentors) */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider font-heading">
              <Crown className="w-3.5 h-3.5 text-amber-700" />
              <span>Generation I: Grandparents & Patriarchs / Matriarchs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {grandparents.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group ${
                    selectedMember?.id === member.id
                      ? 'bg-white border-[#7A1C2E] ring-2 ring-[#7A1C2E]/30 shadow-md'
                      : 'bg-white/90 border-[#E8DFD0] hover:border-[#D4AF37] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        member.familySide === 'bride'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {member.familySide === 'bride' ? "Bride's Side" : "Groom's Side"}
                    </span>
                    <RsvpBadge status={member.rsvpStatus} />
                  </div>
                  <div className="font-heading font-bold text-sm text-[#2C1810] group-hover:text-[#7A1C2E] transition-colors">
                    {member.name}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">{member.relation}</div>
                  {member.assignedRoom && (
                    <div className="mt-2 text-[11px] text-[#7A1C2E] font-semibold flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      <span>{member.assignedRoom}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Connection Divider Arrow */}
          <div className="flex justify-center text-[#D4AF37]">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Generation 2: Parents & Uncles/Aunts */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF0E1] border border-[#D4AF37]/50 text-[#7A1C2E] text-xs font-extrabold uppercase tracking-wider font-heading">
              <Users2 className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Generation II: Parents & Chacha / Chachi / Mama / Mami</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {parentsAndUncles.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group ${
                    selectedMember?.id === member.id
                      ? 'bg-white border-[#7A1C2E] ring-2 ring-[#7A1C2E]/30 shadow-md'
                      : 'bg-white/90 border-[#E8DFD0] hover:border-[#D4AF37] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        member.familySide === 'bride'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {member.familySide === 'bride' ? "Bride's Side" : "Groom's Side"}
                    </span>
                    <RsvpBadge status={member.rsvpStatus} />
                  </div>
                  <div className="font-heading font-bold text-sm text-[#2C1810] group-hover:text-[#7A1C2E] transition-colors">
                    {member.name}
                  </div>
                  <div className="text-xs text-stone-500 font-medium">{member.relation}</div>
                  <div className="mt-2 text-[11px] text-stone-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-stone-400" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Divider Arrow */}
          <div className="flex justify-center text-[#D4AF37]">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>

          {/* Generation 3: Couple, Siblings & Cousins */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-rose-100/80 border border-rose-300 text-rose-900 text-xs font-extrabold uppercase tracking-wider font-heading">
              <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
              <span>Generation III: The Bride, Groom, Siblings & Cousins</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {coupleAndSiblings.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer group ${
                    member.relation.includes('Bride') || member.relation.includes('Groom')
                      ? 'bg-gradient-to-tr from-[#FAF0E1] to-white border-[#D4AF37] ring-2 ring-[#D4AF37]/50 shadow-md'
                      : selectedMember?.id === member.id
                      ? 'bg-white border-[#7A1C2E] ring-2 ring-[#7A1C2E]/30 shadow-md'
                      : 'bg-white/90 border-[#E8DFD0] hover:border-[#D4AF37] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7A1C2E] text-white">
                      {member.relation}
                    </span>
                    <RsvpBadge status={member.rsvpStatus} />
                  </div>
                  <div className="font-heading font-bold text-sm text-[#2C1810]">
                    {member.name}
                  </div>
                  <div className="text-[11px] text-stone-500">{member.phone}</div>
                  {member.assignedRoom && (
                    <div className="mt-2 text-[11px] text-[#7A1C2E] font-semibold flex items-center gap-1">
                      <Home className="w-3 h-3" />
                      <span>{member.assignedRoom}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List Directory View */
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8DFD0] text-stone-500 font-heading text-[11px] uppercase tracking-wider">
                <th className="pb-3 px-3">Name & Relation</th>
                <th className="pb-3 px-3">Side & Gen</th>
                <th className="pb-3 px-3">Contact</th>
                <th className="pb-3 px-3">Room Allotment</th>
                <th className="pb-3 px-3">Transport</th>
                <th className="pb-3 px-3">RSVP</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-[#FAF7F2] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-stone-900 font-heading">{m.name}</div>
                    <div className="text-[11px] text-stone-500">{m.relation}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        m.familySide === 'bride' ? 'bg-rose-50 text-rose-800' : 'bg-amber-50 text-amber-800'
                      }`}
                    >
                      {m.familySide === 'bride' ? "Bride" : "Groom"} • {m.generation}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-stone-600">{m.phone}</td>
                  <td className="py-3 px-3">
                    {m.assignedRoom ? (
                      <span className="font-semibold text-emerald-800">{m.assignedRoom}</span>
                    ) : (
                      <span className="text-stone-400">Not Assigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {m.transportRequired ? (
                      <span className="text-blue-700 font-semibold">Airport Pickup Req.</span>
                    ) : (
                      <span className="text-stone-400">Self Travel</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <RsvpBadge status={m.rsvpStatus} />
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600"
                        title="View Profile"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setMemberToDelete(m)}
                        className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600"
                        title="Delete Member"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Profile Drawer / Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EBE3D5]">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#7A1C2E] font-heading">
                  Family Member Profile
                </span>
                <h3 className="font-heading text-xl font-bold text-[#2C1810]">{selectedMember.name}</h3>
                <p className="text-xs text-stone-500">{selectedMember.relation} • {selectedMember.familySide} side</p>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8DFD0]">
                <span className="text-stone-600 font-medium">RSVP Attendance:</span>
                <RsvpBadge status={selectedMember.rsvpStatus} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8DFD0]">
                <span className="text-stone-600 font-medium">Contact Phone:</span>
                <span className="font-mono font-bold text-stone-900">{selectedMember.phone}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8DFD0]">
                <span className="text-stone-600 font-medium">Room Allocation:</span>
                <span className="font-bold text-[#7A1C2E]">
                  {selectedMember.assignedRoom || 'Pending Allotment'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8DFD0]">
                <span className="text-stone-600 font-medium">Transport Pickup:</span>
                <span className="font-bold text-stone-900">
                  {selectedMember.transportRequired ? 'Required (Airport & Station)' : 'Self Arranged'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF0E1] border border-[#D4AF37]/30 text-[11px] text-[#7A1C2E]">
                <span className="font-bold">Events Invited:</span> All {events.length} Ceremonies (Ganesh Puja, Mehendi, Haldi, Sangeet, Vivah, Reception)
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setMemberToDelete(selectedMember)}
                className="px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl"
              >
                Remove
              </button>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Family Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Add Family Member</h3>
            <p className="text-xs text-stone-500 mb-5">Include elder, parents, siblings or cousins in family tree</p>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Relation
                  </label>
                  <input
                    type="text"
                    required
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="e.g. Maternal Uncle (Mama)"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Generation Level
                  </label>
                  <select
                    value={generation}
                    onChange={(e) => setGeneration(e.target.value as FamilyMember['generation'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="grandparents">Grandparents / Elders</option>
                    <option value="parents">Parents / Aunts / Uncles</option>
                    <option value="couple_and_siblings">Bride/Groom/Siblings/Cousins</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Family Side
                  </label>
                  <select
                    value={familySide}
                    onChange={(e) => setFamilySide(e.target.value as FamilySide)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="bride">Bride's Side (Sharma)</option>
                    <option value="groom">Groom's Side (Shinde)</option>
                    <option value="both">Both Families / Mentor</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98200..."
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Assigned Room (Optional)
                  </label>
                  <input
                    type="text"
                    value={assignedRoom}
                    onChange={(e) => setAssignedRoom(e.target.value)}
                    placeholder="e.g. 201 - Royal Suite"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
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
                  Add to Family Tree
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!memberToDelete}
        title="Remove Family Member?"
        message={`Are you sure you want to remove ${memberToDelete?.name} from the family tree?`}
        confirmLabel="Remove Member"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setMemberToDelete(null)}
      />
    </div>
  );
};
