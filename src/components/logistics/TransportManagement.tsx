import React, { useState } from 'react';
import {
  Car,
  Plane,
  Phone,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Navigation,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { Vehicle, TransportTrip, TripStatus } from '../../types';
import { TripBadge } from '../common/StatusBadge';

export const TransportManagement: React.FC = () => {
  const { vehicles, trips, addVehicle, addTrip, updateTrip, showToast } = useWedding();

  const [activeTab, setActiveTab] = useState<'trips' | 'vehicles'>('trips');
  const [selectedStatus, setSelectedStatus] = useState<TripStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);

  // New Trip form state
  const [pickupPoint, setPickupPoint] = useState('Udaipur Airport (UDR) Terminal 1');
  const [dropPoint, setDropPoint] = useState('The Oberoi Udaivilas, Udaipur');
  const [pickupTime, setPickupTime] = useState('2026-11-28 09:30 AM');
  const [flightOrTrainNumber, setFlightOrTrainNumber] = useState('6E-452 (IndiGo from Delhi)');
  const [passengerNames, setPassengerNames] = useState('Dr. Verma Family (3 pax)');
  const [vehicleId, setVehicleId] = useState(vehicles[0]?.id || '');

  // New Vehicle form state
  const [vehicleName, setVehicleName] = useState('');
  const [model, setModel] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState(7);
  const [vehicleType, setVehicleType] = useState<Vehicle['type']>('innova');

  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.passengerNames.some((name) => name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.pickupPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.flightOrTrainNumber && t.flightOrTrainNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSaveTrip = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedVeh = vehicles.find((v) => v.id === vehicleId) || vehicles[0];

    addTrip({
      pickupPoint,
      dropPoint,
      pickupTime,
      flightOrTrainNumber,
      passengerIds: ['guest-01'],
      passengerNames: passengerNames.split(',').map((s) => s.trim()),
      vehicleId: selectedVeh?.id || 'veh-01',
      vehicleName: selectedVeh?.name || 'Innova Crysta',
      driverName: selectedVeh?.driverName || 'Ramesh Singh',
      driverPhone: selectedVeh?.driverPhone || '+91 98290 11223',
      status: 'scheduled',
    });

    setIsAddTripModalOpen(false);
    showToast('Scheduled new airport/railway pickup trip');
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vehicleName.trim() || !numberPlate.trim()) return;

    addVehicle({
      name: vehicleName,
      type: vehicleType,
      model,
      numberPlate,
      driverName,
      driverPhone,
      seatingCapacity: Number(seatingCapacity),
      isAvailable: true,
      currentDuty: 'Available for pickups',
    });

    setIsAddVehicleModalOpen(false);
    setVehicleName('');
    setNumberPlate('');
    setDriverName('');
    setDriverPhone('');
    showToast('Added vehicle to wedding transport fleet');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Gadi & Vahan
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Transport Fleet & Airport Transfers
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Live airport/station pickup schedules, assigned drivers, and bridal convoy logistics.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsAddVehicleModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] text-stone-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Car className="w-3.5 h-3.5" />
              <span>Add Vehicle</span>
            </button>
            <button
              onClick={() => setIsAddTripModalOpen(true)}
              className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Pickup</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="pt-4 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('trips')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'trips' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Transfer Schedule ({trips.length} Trips)
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'vehicles' ? 'bg-[#7A1C2E] text-white shadow-xs' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Fleet Directory ({vehicles.length} Vehicles)
          </button>
        </div>
      </div>

      {/* 1. Transfer Trips View */}
      {activeTab === 'trips' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrips.map((trip) => (
              <div
                key={trip.id}
                className="p-5 rounded-3xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <span className="text-xs font-bold text-[#7A1C2E] font-heading flex items-center gap-1.5">
                      <Plane className="w-4 h-4" />
                      {trip.flightOrTrainNumber || 'Station Pickup'}
                    </span>
                    <TripBadge status={trip.status} />
                  </div>

                  <div className="pt-3 space-y-3 text-xs">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-400">Scheduled Time</div>
                      <div className="font-heading font-bold text-sm text-[#2C1810] flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        {trip.pickupTime}
                      </div>
                    </div>

                    <div className="space-y-1.5 bg-[#FAF7F2] p-3 rounded-2xl border border-[#EBE3D5]">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
                        <div>
                          <div className="text-[10px] text-stone-400 font-bold uppercase">From (Pickup)</div>
                          <div className="font-semibold text-stone-800">{trip.pickupPoint}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-600 mt-1 shrink-0" />
                        <div>
                          <div className="text-[10px] text-stone-400 font-bold uppercase">To (Drop)</div>
                          <div className="font-semibold text-stone-800">{trip.dropPoint}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] uppercase font-bold text-stone-400">Passengers Assigned</div>
                      <div className="font-bold text-stone-900 mt-0.5">{trip.passengerNames.join(', ')}</div>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                      <div>
                        <div className="font-bold text-stone-900">{trip.vehicleName}</div>
                        <div className="text-[11px] text-stone-500">Driver: {trip.driverName}</div>
                      </div>
                      <a
                        href={`tel:${trip.driverPhone}`}
                        className="p-2 rounded-xl bg-[#FAF0E1] text-[#7A1C2E] hover:bg-[#7A1C2E] hover:text-white transition-colors"
                        title="Call Driver"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <select
                    value={trip.status}
                    onChange={(e) => {
                      updateTrip(trip.id, { status: e.target.value as TripStatus });
                      showToast(`Trip status marked as ${e.target.value}`);
                    }}
                    className="px-2 py-1 bg-stone-50 border border-[#E2D8C6] rounded-lg text-xs font-semibold outline-none text-stone-700"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="en_route">En Route / Picked</option>
                    <option value="completed">Completed / Dropped</option>
                    <option value="delayed">Delayed Flight</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Fleet Directory */}
      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((veh) => (
            <div
              key={veh.id}
              className="p-5 rounded-3xl bg-white border border-[#E8DFD0] shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-2xl bg-[#FAF0E1] text-[#7A1C2E] flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#2C1810]">{veh.name}</h4>
                    <p className="text-[10px] text-stone-500">{veh.model} • {veh.seatingCapacity} Seater</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-stone-100 text-stone-800 border border-stone-300">
                  {veh.numberPlate}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-stone-600">
                  <span>Assigned Chauffeur:</span>
                  <strong className="text-stone-900">{veh.driverName}</strong>
                </div>

                <div className="flex items-center justify-between text-stone-600">
                  <span>Driver Contact:</span>
                  <span className="font-mono text-stone-800">{veh.driverPhone}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EBE3D5] text-[11px] text-[#7A1C2E] font-medium">
                  Current Duty: {veh.currentDuty}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Insured & Cleaned
                </span>
                <a
                  href={`tel:${veh.driverPhone}`}
                  className="px-3 py-1 bg-[#7A1C2E] text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Trip Modal */}
      {isAddTripModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Schedule Airport / Train Pickup</h3>
            <p className="text-xs text-stone-500 mb-5">Assign vehicle, driver and time to arriving guests</p>

            <form onSubmit={handleSaveTrip} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Passenger Names / Family
                </label>
                <input
                  type="text"
                  required
                  value={passengerNames}
                  onChange={(e) => setPassengerNames(e.target.value)}
                  placeholder="e.g. Ramesh Sharma & Family (4 pax)"
                  className="w-full px-3.5 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Flight / Train #
                  </label>
                  <input
                    type="text"
                    value={flightOrTrainNumber}
                    onChange={(e) => setFlightOrTrainNumber(e.target.value)}
                    placeholder="e.g. 6E-204 from Mumbai"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Pickup Date & Time
                  </label>
                  <input
                    type="text"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    placeholder="2026-11-28 11:30 AM"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Pickup Point
                  </label>
                  <input
                    type="text"
                    required
                    value={pickupPoint}
                    onChange={(e) => setPickupPoint(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Drop Point
                  </label>
                  <input
                    type="text"
                    required
                    value={dropPoint}
                    onChange={(e) => setDropPoint(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Assign Fleet Vehicle
                </label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.model} - {v.numberPlate}) • Driver: {v.driverName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsAddTripModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Schedule Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {isAddVehicleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 text-stone-900">
            <h3 className="font-heading text-xl font-bold text-[#2C1810] mb-1">Add Fleet Vehicle</h3>
            <p className="text-xs text-stone-500 mb-5">Register car, chauffeur contact, and capacity</p>

            <form onSubmit={handleSaveVehicle} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Vehicle Name / Tag
                </label>
                <input
                  type="text"
                  required
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  placeholder="e.g. Innova Crysta #4"
                  className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Model
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Toyota Crysta 2.4 VX"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Number Plate
                  </label>
                  <input
                    type="text"
                    required
                    value={numberPlate}
                    onChange={(e) => setNumberPlate(e.target.value)}
                    placeholder="RJ-27-TA-9988"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Sanjay Sharma"
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                    Driver Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    placeholder="+91 98290..."
                    className="w-full px-3 py-2 bg-white border border-[#E2D8C6] rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EBE3D5]">
                <button
                  type="button"
                  onClick={() => setIsAddVehicleModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
