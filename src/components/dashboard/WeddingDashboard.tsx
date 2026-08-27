import React from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Building2,
  Car,
  UtensilsCrossed,
  DollarSign,
  Plus,
  ArrowUpRight,
  Sparkles,
  Heart,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Send,
  UserPlus,
  Briefcase,
  CheckSquare,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { RsvpBadge, MealBadge } from '../common/StatusBadge';

export const WeddingDashboard: React.FC = () => {
  const {
    wedding,
    events,
    guests,
    tasks,
    expenses,
    rooms,
    vehicles,
    trips,
    mealPlans,
    setActiveTab,
    notifications,
    showToast,
  } = useWedding();

  // Date Countdown calculations
  const weddingDateObj = new Date(wedding.weddingDate);
  const today = new Date();
  const diffTime = weddingDateObj.getTime() - today.getTime();
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const diffMonths = Math.floor(diffDays / 30);
  const remainingDays = diffDays % 30;

  // Guest & RSVP stats
  const totalGuestsCount = guests.reduce((sum, g) => sum + g.membersCount, 0);
  const attendingGuests = guests.filter((g) => g.rsvpStatus === 'attending');
  const attendingCount = attendingGuests.reduce((sum, g) => sum + g.membersCount, 0);
  const declinedGuests = guests.filter((g) => g.rsvpStatus === 'declined');
  const declinedCount = declinedGuests.reduce((sum, g) => sum + g.membersCount, 0);
  const pendingGuests = guests.filter((g) => g.rsvpStatus === 'pending');
  const pendingCount = pendingGuests.reduce((sum, g) => sum + g.membersCount, 0);

  // Budget stats
  const totalBudget = wedding.totalBudget;
  const spentAmount = expenses.reduce((sum, e) => (e.paymentStatus === 'paid' ? sum + e.amount : sum), 0);
  const pendingPayments = expenses.reduce((sum, e) => (e.paymentStatus === 'pending' ? sum + e.amount : sum), 0);
  const remainingBudget = totalBudget - spentAmount;
  const spentPercentage = Math.min(100, Math.round((spentAmount / totalBudget) * 100));

  // Tasks stats
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const pendingTasksList = tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress');
  const pendingTasksCount = pendingTasksList.length;

  // Accommodation stats
  const totalRoomsCount = rooms.length;
  const occupiedRoomsCount = rooms.filter((r) => r.status === 'occupied').length;
  const availableRoomsCount = rooms.filter((r) => r.status === 'available').length;
  const reservedRoomsCount = rooms.filter((r) => r.status === 'reserved').length;

  // Transport stats
  const totalVehiclesCount = vehicles.length;
  const activeTripsCount = trips.filter((t) => t.status === 'scheduled' || t.status === 'en_route').length;

  // Upcoming 3 events
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Couple Banner with Luxury Maroon/Gold Frame & Countdown */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/50 bg-gradient-to-r from-[#7A1C2E] via-[#5B1220] to-[#3B0A13] text-white">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#D4AF37]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Couple Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="relative">
              <img
                src={wedding.weddingImage}
                alt={`${wedding.brideName} & ${wedding.groomName}`}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover ring-4 ring-[#D4AF37]/80 shadow-2xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#D4AF37] to-amber-200 text-[#7A1C2E] p-2 rounded-2xl shadow-lg">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-amber-200 text-xs font-bold font-heading">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{wedding.weddingTheme} Celebration</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {wedding.brideName} <span className="text-amber-300 font-display italic font-normal">&</span> {wedding.groomName}
              </h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-1 gap-x-4 text-xs sm:text-sm text-amber-100/90 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-300" />
                  {new Date(wedding.weddingDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-300" />
                  {wedding.weddingLocation}
                </span>
              </div>
              <div className="pt-1">
                <span className="font-mono text-xs font-semibold px-3 py-1 bg-black/30 rounded-lg text-amber-300 border border-amber-300/30">
                  {wedding.hashtag}
                </span>
              </div>
            </div>
          </div>

          {/* Countdown Clock Card */}
          <div className="bg-[#FAF7F2]/95 text-stone-900 rounded-2xl p-5 shadow-2xl border border-[#D4AF37] flex flex-col items-center justify-center min-w-[240px] sm:min-w-[280px]">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#7A1C2E] font-heading mb-3">
              Shaadi Countdown
            </span>
            <div className="grid grid-cols-3 gap-3 text-center w-full">
              <div className="bg-[#F4EDE2] p-2.5 rounded-xl border border-[#E2D8C6]">
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7A1C2E] leading-none">
                  {diffMonths}
                </div>
                <div className="text-[10px] uppercase font-bold text-stone-500 mt-1">Months</div>
              </div>
              <div className="bg-[#F4EDE2] p-2.5 rounded-xl border border-[#E2D8C6]">
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7A1C2E] leading-none">
                  {remainingDays}
                </div>
                <div className="text-[10px] uppercase font-bold text-stone-500 mt-1">Days</div>
              </div>
              <div className="bg-[#F4EDE2] p-2.5 rounded-xl border border-[#E2D8C6]">
                <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#7A1C2E] leading-none">
                  {events.length}
                </div>
                <div className="text-[10px] uppercase font-bold text-stone-500 mt-1">Ceremonies</div>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('command-center')}
              className="mt-4 w-full py-2 bg-[#7A1C2E] hover:bg-[#601323] text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Day Command Center</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions Bar */}
      <div className="bg-white/80 border border-[#E8DFD0] rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-xs font-extrabold uppercase tracking-wider text-stone-500">
            Quick Actions
          </h3>
          <span className="text-[11px] text-stone-400">One-click management shortcuts</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          <button
            onClick={() => setActiveTab('events')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C1810]">Add Event</div>
              <div className="text-[10px] text-stone-500">Ritual / Ceremony</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('guests')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C1810]">Add Guest</div>
              <div className="text-[10px] text-stone-500">Single or Family</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('invitations')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Send className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C1810]">Send Invites</div>
              <div className="text-[10px] text-stone-500">WhatsApp / Card</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CheckSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C1810]">Add Task</div>
              <div className="text-[10px] text-stone-500">Assign Checklist</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C1810]">Add Vendor</div>
              <div className="text-[10px] text-stone-500">Decor / Photo</div>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#FAF0E1] border border-[#E8DFD0] hover:border-[#D4AF37] transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#2C1810]">Log Expense</div>
              <div className="text-[10px] text-stone-500">Record Payment</div>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Primary KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Guest & RSVP Stats */}
        <div
          onClick={() => setActiveTab('guests')}
          className="p-5 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-heading">
              Total Guests
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-[#7A1C2E] group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-[#2C1810]">{totalGuestsCount}</span>
            <span className="text-xs text-stone-500">({guests.length} families)</span>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> {attendingCount} Attending
            </span>
            <span className="flex items-center gap-1 text-amber-700 font-semibold">
              <HelpCircle className="w-3.5 h-3.5" /> {pendingCount} Pending
            </span>
          </div>
        </div>

        {/* Budget Overview */}
        <div
          onClick={() => setActiveTab('budget')}
          className="p-5 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-heading">
              Budget Status
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-[#7A1C2E] group-hover:text-white transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              ₹{(spentAmount / 100000).toFixed(1)}L
            </span>
            <span className="text-xs text-stone-500">of ₹{(totalBudget / 100000).toFixed(0)}L</span>
          </div>

          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#7A1C2E] rounded-full transition-all"
                style={{ width: `${spentPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1.5 font-medium">
              <span>{spentPercentage}% Utilized</span>
              <span className="text-emerald-700 font-bold">₹{(remainingBudget / 100000).toFixed(1)}L Left</span>
            </div>
          </div>
        </div>

        {/* Tasks & Milestones */}
        <div
          onClick={() => setActiveTab('tasks')}
          className="p-5 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-heading">
              Tasks & Milestones
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center group-hover:bg-[#7A1C2E] group-hover:text-white transition-colors">
              <CheckSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-[#2C1810]">{completedTasks}</span>
            <span className="text-xs text-stone-500">/ {tasks.length} Completed</span>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-rose-700 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" /> {pendingTasksCount} To-Do
            </span>
            <span className="text-[#7A1C2E] font-bold">View Kanban →</span>
          </div>
        </div>

        {/* Accommodation & Hospitality */}
        <div
          onClick={() => setActiveTab('accommodation')}
          className="p-5 rounded-2xl bg-white border border-[#E8DFD0] hover:border-[#D4AF37] shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-heading">
              Room Allotment
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:bg-[#7A1C2E] group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading text-3xl font-extrabold text-[#2C1810]">{occupiedRoomsCount}</span>
            <span className="text-xs text-stone-500">/ {totalRoomsCount} Rooms Assigned</span>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold">{availableRoomsCount} Available</span>
            <span className="text-blue-700 font-semibold">{reservedRoomsCount} Reserved VIP</span>
          </div>
        </div>
      </div>

      {/* 4. Upcoming Events + Pending Tasks Multi-column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Ceremonies Timeline */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#2C1810]">
                Upcoming Wedding Ceremonies
              </h3>
              <p className="text-xs text-stone-500">Timeline of rituals, venues and dress codes</p>
            </div>
            <button
              onClick={() => setActiveTab('events')}
              className="text-xs font-bold text-[#7A1C2E] hover:underline flex items-center gap-1"
            >
              View Full Itinerary ({events.length}) →
            </button>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((evt, idx) => (
              <div
                key={evt.id}
                onClick={() => setActiveTab('events')}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF6F0]/80 hover:bg-[#FAF0E1] border border-[#E8DFD0] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#7A1C2E] text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-amber-200 leading-none">
                      {new Date(evt.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="font-heading text-lg font-bold leading-none mt-0.5">
                      {new Date(evt.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#2C1810] group-hover:text-[#7A1C2E] transition-colors">
                      {evt.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 mt-1">
                      <span className="flex items-center gap-1 text-amber-800 font-medium">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        {evt.startTime} - {evt.endTime}
                      </span>
                      <span className="flex items-center gap-1 text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {evt.venue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white border border-[#E2D8C6] text-[#7A1C2E]">
                    {evt.guestCount} Guests
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#7A1C2E] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Tasks & Urgent Action Items */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs flex flex-col">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#2C1810]">Action Items</h3>
              <p className="text-xs text-stone-500">{pendingTasksCount} pending tasks</p>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-bold text-[#7A1C2E] hover:underline"
            >
              All Tasks →
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-96">
            {pendingTasksList.slice(0, 5).map((tsk) => (
              <div
                key={tsk.id}
                className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-stone-900 leading-snug">{tsk.title}</div>
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span className="text-amber-800 font-medium">Due: {tsk.dueDate}</span>
                    <span>•</span>
                    <span className="text-stone-600">{tsk.assignedTo}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${
                    tsk.priority === 'urgent'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : tsk.priority === 'high'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {tsk.priority}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setActiveTab('tasks')}
            className="mt-4 w-full py-2.5 bg-[#FAF0E1] hover:bg-[#F4E3C9] text-[#7A1C2E] font-bold text-xs rounded-xl border border-[#D4AF37]/50 transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Task</span>
          </button>
        </div>
      </div>

      {/* 5. Logistics Trio: Fleet & Transport + Hospitality Summary + Recent Live Activities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Transport Fleet Status */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-blue-700" />
              <h4 className="font-heading text-sm font-bold text-[#2C1810]">Fleet & Transport</h4>
            </div>
            <button
              onClick={() => setActiveTab('transport')}
              className="text-xs text-[#7A1C2E] font-bold hover:underline"
            >
              Manage →
            </button>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
              <span className="text-stone-600 font-medium">Vehicles Registered</span>
              <span className="font-bold text-stone-900">{totalVehiclesCount} units (BMW, Innovas, Coaches)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50">
              <span className="text-stone-600 font-medium">Active Trips Scheduled</span>
              <span className="font-bold text-emerald-700">{activeTripsCount} airport & station runs</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF0E1] border border-[#D4AF37]/30 text-[11px] text-[#7A1C2E]">
              <span className="font-bold">Next Trip:</span> Innova RJ-27-TA-8822 picking Dr. Verma at UDR Airport (09:45 AM).
            </div>
          </div>
        </div>

        {/* Meal & Banquet Planning */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-4 h-4 text-amber-700" />
              <h4 className="font-heading text-sm font-bold text-[#2C1810]">Banquets & Meals</h4>
            </div>
            <button
              onClick={() => setActiveTab('meals')}
              className="text-xs text-[#7A1C2E] font-bold hover:underline"
            >
              Menu →
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-stone-50">
              <span className="text-stone-600 font-medium">Total Meal Plans</span>
              <span className="font-bold text-stone-900">{mealPlans.length} master menus</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center pt-1">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <div className="font-bold text-base">75%</div>
                <div className="text-[10px]">Pure Veg</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                <div className="font-bold text-base">15%</div>
                <div className="text-[10px]">Strict Jain</div>
              </div>
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Segregated Jain kitchens & live Chaat/Puran Poli counters locked.
            </p>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#7A1C2E]" />
              <h4 className="font-heading text-sm font-bold text-[#2C1810]">Recent Activity</h4>
            </div>
            <span className="text-[11px] text-stone-400">Live feed</span>
          </div>
          <div className="space-y-3 text-xs">
            {notifications.slice(0, 3).map((notif) => (
              <div key={notif.id} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#7A1C2E] shrink-0 mt-1.5"></span>
                <div>
                  <p className="font-semibold text-stone-900 leading-tight">{notif.title}</p>
                  <p className="text-[10px] text-stone-500 mt-0.5">{notif.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
