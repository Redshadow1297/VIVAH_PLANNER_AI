import React, { useState } from 'react';
import {
  Building2,
  Users,
  Search,
  Plus,
  BedDouble,
  KeyRound,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  Home,
  UserPlus,
  Edit2,
  Trash2,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Room, RoomStatus } from '../../types';
import { RoomBadge } from '../common/StatusBadge';
import { ConfirmModal } from '../common/Toast';

export const AccommodationManagement: React.FC = () => {
  const { rooms, addRoom, updateRoom, deleteRoom, guests, showToast } = useWedding();

  const [selectedStatus, setSelectedStatus] = useState<RoomStatus | 'all'>('all');
  const [selectedHotel, setSelectedHotel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  // Form states
  const [roomNumber, setRoomNumber] = useState('');
  const [hotelName, setHotelName] = useState('The Oberoi Udaivilas');
  const [roomType, setRoomType] = useState<Room['roomType']>('deluxe');
  const [capacity, setCapacity] = useState(2);
  const [floor, setFloor] = useState('1st Floor');
  const [wing, setWing] = useState('North Wing');
  const [status, setStatus] = useState<RoomStatus>('available');
  const [notes, setNotes] = useState('');

  const totalRooms = rooms.length;
  const occupied = rooms.filter((r) => r.status === 'occupied').length;
  const available = rooms.filter((r) => r.status === 'available').length;
  const reserved = rooms.filter((r) => r.status === 'reserved').length;
  const maintenance = rooms.filter((r) => r.status === 'maintenance').length;

  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);

  const filteredRooms = rooms.filter((r) => {
    const matchesSearch =
      r.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.assignedGuestNames && r.assignedGuestNames.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    const matchesHotel = selectedHotel === 'all' || r.hotelName === selectedHotel;
    return matchesSearch && matchesStatus && matchesHotel;
  });

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomNumber.trim()) return;

    if (roomToEdit) {
      updateRoom(roomToEdit.id, {
        roomNumber,
        hotelName,
        roomType,
        capacity: Number(capacity),
        floor,
        wing,
        status,
        notes: notes || undefined,
      });
      setRoomToEdit(null);
    } else {
      addRoom({
        roomNumber,
        hotelName,
        roomType,
        capacity: Number(capacity),
        floor,
        wing,
        status: 'available',
        assignedGuestIds: [],
        assignedGuestNames: [],
        checkInDate: '2026-11-28',
        checkOutDate: '2026-12-02',
        notes: notes || undefined,
      });
    }

    setIsAddModalOpen(false);
    setRoomNumber('');
    setNotes('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & KPI Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Niwas & Hospitality
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Hotel & Room Allotment Grid
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Manage luxury palace rooms, family wings, check-in schedules, and key assignments.
            </p>
          </div>

          <button
            onClick={() => {
              setRoomToEdit(null);
              setIsAddModalOpen(true);
            }}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Add Hotel Room</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-stone-500 font-heading">Total Inventory</span>
              <Building2 className="w-4 h-4 text-stone-600" />
            </div>
            <div className="font-heading text-2xl font-bold text-[#2C1810]">{totalRooms} Rooms</div>
            <div className="text-xs text-stone-500 mt-0.5">{totalCapacity} Total Bed Capacity</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-heading">Assigned & Occupied</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-heading text-2xl font-bold">{occupied} Rooms</div>
            <div className="text-xs text-emerald-700 mt-0.5">Checked In / Handover</div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-heading">Available Ready</span>
              <BedDouble className="w-4 h-4 text-amber-600" />
            </div>
            <div className="font-heading text-2xl font-bold">{available} Rooms</div>
            <div className="text-xs text-amber-700 mt-0.5">Vacant for Assignment</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-heading">VIP Reserved</span>
              <KeyRound className="w-4 h-4 text-blue-600" />
            </div>
            <div className="font-heading text-2xl font-bold">{reserved} Suites</div>
            <div className="text-xs text-blue-700 mt-0.5">Bride/Groom/Elders</div>
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
              All Statuses ({totalRooms})
            </button>
            <button
              onClick={() => setSelectedStatus('occupied')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === 'occupied' ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-50 text-emerald-800'
              }`}
            >
              Occupied ({occupied})
            </button>
            <button
              onClick={() => setSelectedStatus('available')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === 'available' ? 'bg-amber-700 text-white shadow-xs' : 'bg-amber-50 text-amber-800'
              }`}
            >
              Available ({available})
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search room # or guest name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
            />
          </div>
        </div>
      </div>

      {/* Room Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="p-5 rounded-3xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF0E1] text-[#7A1C2E] flex items-center justify-center font-bold text-xs">
                    {room.roomNumber.split(' ')[0]}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#2C1810]">
                      Room {room.roomNumber}
                    </h3>
                    <p className="text-[10px] text-stone-500">{room.hotelName}</p>
                  </div>
                </div>
                <RoomBadge status={room.status} />
              </div>

              <div className="pt-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Room Category:</span>
                  <strong className="text-stone-900 capitalize">{room.roomType} Suite</strong>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Location / Wing:</span>
                  <span>{room.wing} ({room.floor})</span>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Bed Capacity:</span>
                  <span>{room.capacity} Guests</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5]">
                  <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
                    Assigned Family / Guests:
                  </div>
                  {room.assignedGuestNames && room.assignedGuestNames.length > 0 ? (
                    <div className="font-bold text-[#7A1C2E] text-xs">
                      {room.assignedGuestNames.join(', ')}
                    </div>
                  ) : (
                    <div className="text-stone-400 italic text-xs">No guests assigned yet</div>
                  )}
                </div>

                {room.notes && (
                  <p className="text-[11px] text-stone-500 italic">Note: {room.notes}</p>
                )}
              </div>
            </div>

            {/* Room Footer Action Buttons */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <select
                value={room.status}
                onChange={(e) => {
                  updateRoom(room.id, { status: e.target.value as RoomStatus });
                  showToast(`Updated Room ${room.roomNumber} status to ${e.target.value}`);
                }}
                className="px-2 py-1 bg-stone-50 border border-[#E2D8C6] rounded-lg text-xs font-semibold outline-none text-stone-700"
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setRoomToEdit(room);
                    setRoomNumber(room.roomNumber);
                    setHotelName(room.hotelName);
                    setRoomType(room.roomType);
                    setCapacity(room.capacity);
                    setFloor(room.floor);
                    setWing(room.wing);
                    setStatus(room.status);
                    setNotes(room.notes || '');
                    setIsAddModalOpen(true);
                  }}
                  className="p-1.5 hover:bg-stone-100 rounded-lg text-stone-600"
                  title="Edit Room"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setRoomToDelete(room)}
                  className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600"
                  title="Delete Room"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Room Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">
              {roomToEdit ? 'Edit Room' : 'Add Hotel Room'}
            </h3>
            <p className="text-xs text-stone-500 mb-5">Configure palace hotel room & bed allocations</p>

            <form onSubmit={handleSaveRoom} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Room Number
                  </label>
                  <input
                    type="text"
                    required
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    placeholder="e.g. 302"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Bed Capacity
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={6}
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Hotel / Resort Name
                </label>
                <input
                  type="text"
                  required
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Room Category
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as Room['roomType'])}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  >
                    <option value="standard">Standard Deluxe</option>
                    <option value="deluxe">Luxury Lake View</option>
                    <option value="suite">Royal Maharaja Suite</option>
                    <option value="villa">Heritage Pool Villa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Wing / Floor
                  </label>
                  <input
                    type="text"
                    value={wing}
                    onChange={(e) => setWing(e.target.value)}
                    placeholder="North Wing, 2nd Floor"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Special Notes
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Extra baby cot requested, adjoining door"
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
                  Save Room
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!roomToDelete}
        title="Delete Room?"
        message={`Are you sure you want to remove Room ${roomToDelete?.roomNumber}?`}
        confirmLabel="Delete Room"
        isDestructive={true}
        onConfirm={() => {
          if (roomToDelete) {
            deleteRoom(roomToDelete.id);
            setRoomToDelete(null);
          }
        }}
        onCancel={() => setRoomToDelete(null)}
      />
    </div>
  );
};
