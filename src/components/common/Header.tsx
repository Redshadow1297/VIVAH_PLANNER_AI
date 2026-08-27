import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Bell,
  Smartphone,
  Monitor,
  UserCheck,
  Plus,
  Calendar,
  UserPlus,
  CheckSquare,
  DollarSign,
  Briefcase,
  Sparkles,
  ChevronDown,
  LogOut,
  SlidersHorizontal,
  Crown,
  HeartHandshake,
  CheckCircle,
  Menu,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { UserRole, ActiveTab } from '../../types';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    wedding,
    activeRole,
    setActiveRole,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    searchQuery,
    setSearchQuery,
    setAuthScreen,
    showToast,
  } = useWedding();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const quickAddRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter((n) => !n.isRead);

  // Calculate days remaining to wedding
  const weddingDateObj = new Date(wedding.weddingDate);
  const today = new Date();
  const diffDays = Math.ceil((weddingDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (quickAddRef.current && !quickAddRef.current.contains(event.target as Node)) {
        setIsQuickAddOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const rolesList: { id: UserRole; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'owner',
      label: 'Wedding Owner (Bride & Groom)',
      desc: 'Full administrative & financial control',
      icon: <Crown className="w-4 h-4 text-amber-600" />,
    },
    {
      id: 'coordinator',
      label: 'Wedding Coordinator / Planner',
      desc: 'Vendor, transport, and live run-sheet ops',
      icon: <SlidersHorizontal className="w-4 h-4 text-[#7A1C2E]" />,
    },
    {
      id: 'family',
      label: 'Family Member',
      desc: 'Family tree, rituals, and guest assistance',
      icon: <HeartHandshake className="w-4 h-4 text-emerald-700" />,
    },
    {
      id: 'guest',
      label: 'Invited Guest',
      desc: 'Itinerary, RSVP, room pass & meal info',
      icon: <UserCheck className="w-4 h-4 text-sky-700" />,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FCFAF6]/90 backdrop-blur-md border-b border-[#E8DFD0] px-4 lg:px-7 py-3 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button + Breadcrumb / Title */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              id="sidebar-toggle-btn"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition-colors"
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#92400E] font-bold font-heading">
                {wedding.hashtag}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF0E1] text-[#7A1C2E] border border-[#D4AF37]/40 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                {diffDays > 0 ? `${diffDays} Days to Shaadi` : 'Wedding Day!'}
              </span>
            </div>
            <h1 className="font-heading text-lg lg:text-xl font-bold text-[#2C1810] tracking-tight leading-tight capitalize">
              {activeTab === 'command-center'
                ? 'Wedding Day Command Center'
                : `${activeTab.replace('-', ' ')}`}
            </h1>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search guests, events, vendors, tasks, rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs lg:text-sm bg-white/80 border border-[#E2D8C6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] transition-all placeholder:text-stone-400 text-stone-800 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 rounded-full px-1.5 py-0.5"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Device View Mode Switcher */}
          <div className="flex items-center bg-[#F2ECE0] p-1 rounded-xl border border-[#E0D5C1]">
            <button
              id="viewmode-web-btn"
              onClick={() => {
                setViewMode('web');
                showToast('Switched to Responsive Web SaaS layout');
              }}
              title="Responsive Web SaaS View"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'web'
                  ? 'bg-white text-[#7A1C2E] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Web App</span>
            </button>
            <button
              id="viewmode-mobile-btn"
              onClick={() => {
                setViewMode('mobile');
                showToast('Switched to Mobile App UI Simulator');
              }}
              title="Mobile Application UI View"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile UI</span>
            </button>
          </div>

          {/* User Role Switcher Dropdown */}
          <div className="relative" ref={roleRef}>
            <button
              id="role-select-btn"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-[#E2D8C6] hover:border-[#D4AF37] rounded-xl text-xs font-semibold text-stone-800 shadow-2xs transition-all"
            >
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline capitalize">{activeRole}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#D4AF37]/40 p-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-[#EBE3D5]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500 font-heading">
                    Active User Role
                  </p>
                  <p className="text-xs text-stone-600">Simulate interface permissions & views</p>
                </div>
                <div className="py-1 flex flex-col gap-1">
                  {rolesList.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        setActiveRole(r.id);
                        setIsRoleDropdownOpen(false);
                        showToast(`Switched view to: ${r.label}`);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-start gap-2.5 transition-all ${
                        activeRole === r.id
                          ? 'bg-[#7A1C2E] text-white font-semibold shadow-xs'
                          : 'hover:bg-[#F2ECE0] text-stone-800'
                      }`}
                    >
                      <div className="mt-0.5">{r.icon}</div>
                      <div>
                        <div className="font-semibold">{r.label}</div>
                        <div className={`text-[10px] ${activeRole === r.id ? 'text-amber-200' : 'text-stone-500'}`}>
                          {r.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Add Action Dropdown */}
          <div className="relative" ref={quickAddRef}>
            <button
              id="quick-add-btn"
              onClick={() => setIsQuickAddOpen(!isQuickAddOpen)}
              className="flex items-center gap-1 px-3 py-1.5 bg-[#7A1C2E] hover:bg-[#641424] text-white text-xs font-semibold rounded-xl shadow-md transition-all active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Quick Add</span>
            </button>

            {isQuickAddOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#D4AF37]/30 p-2 z-50 animate-fadeIn">
                <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-stone-400 font-heading">
                  Quick Actions
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setActiveTab('guests');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F2ECE0] text-stone-800 font-medium"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-600" />
                    <span>Add New Guest</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('events');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F2ECE0] text-stone-800 font-medium"
                  >
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Add Ceremony / Event</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('tasks');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F2ECE0] text-stone-800 font-medium"
                  >
                    <CheckSquare className="w-4 h-4 text-indigo-600" />
                    <span>Create Checklist Task</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('budget');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F2ECE0] text-stone-800 font-medium"
                  >
                    <DollarSign className="w-4 h-4 text-rose-600" />
                    <span>Log Expense</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('vendors');
                      setIsQuickAddOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs flex items-center gap-2 hover:bg-[#F2ECE0] text-stone-800 font-medium"
                  >
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    <span>Register Vendor</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              id="notifications-btn"
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 rounded-xl text-stone-700 hover:bg-stone-200/60 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotifs.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#7A1C2E] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D4AF37]/40 p-3 z-50 animate-fadeIn">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#EBE3D5]">
                  <div className="flex items-center gap-2">
                    <h4 className="font-heading text-sm font-bold text-[#2C1810]">Notifications</h4>
                    {unreadNotifs.length > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        {unreadNotifs.length} new
                      </span>
                    )}
                  </div>
                  {unreadNotifs.length > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] font-semibold text-[#7A1C2E] hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="py-2 max-h-80 overflow-y-auto flex flex-col gap-2">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        if (notif.linkTab) setActiveTab(notif.linkTab);
                        setIsNotifOpen(false);
                      }}
                      className={`p-3 rounded-xl text-xs cursor-pointer transition-all border ${
                        !notif.isRead
                          ? 'bg-amber-50/70 border-[#D4AF37]/30 hover:bg-amber-100/50'
                          : 'bg-white/60 border-stone-200 hover:bg-stone-100/60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-[#2C1810] flex items-center gap-1.5">
                          {!notif.isRead && <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C2E]"></span>}
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-stone-400">{notif.timestamp}</span>
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">{notif.description}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EBE3D5] text-center">
                  <button
                    onClick={() => {
                      setActiveTab('notifications');
                      setIsNotifOpen(false);
                    }}
                    className="text-xs font-semibold text-[#7A1C2E] hover:text-[#58111f]"
                  >
                    View All Notifications →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar / Menu */}
          <div className="relative" ref={profileRef}>
            <button
              id="user-profile-btn"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#D4AF37] transition-all"
            >
              <img
                src={wedding.weddingImage}
                alt={`${wedding.brideName} & ${wedding.groomName}`}
                className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#FAF7F2] rounded-2xl shadow-xl border border-[#D4AF37]/30 p-3 z-50 animate-fadeIn">
                <div className="flex items-center gap-3 pb-3 border-b border-[#EBE3D5]">
                  <img
                    src={wedding.weddingImage}
                    alt="Couple"
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]"
                  />
                  <div className="overflow-hidden">
                    <p className="font-heading font-bold text-xs text-[#2C1810] truncate">
                      {wedding.brideName} & {wedding.groomName}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">{wedding.weddingCity}</p>
                  </div>
                </div>

                <div className="py-2 flex flex-col gap-1 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F2ECE0] text-stone-700 font-medium"
                  >
                    Wedding Settings & Theme
                  </button>
                  <button
                    onClick={() => {
                      setAuthScreen('create-wedding');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F2ECE0] text-stone-700 font-medium"
                  >
                    Create / Switch Wedding
                  </button>
                  <button
                    onClick={() => {
                      setAuthScreen('splash');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-50 text-rose-700 font-medium flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out (Auth Demo)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
