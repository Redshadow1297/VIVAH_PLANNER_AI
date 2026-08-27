import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  UserCheck,
  ClipboardList,
  Grid,
  Users2,
  Mail,
  CheckCircle2,
  Building2,
  Car,
  UtensilsCrossed,
  Briefcase,
  DollarSign,
  FileText,
  Bell,
  Settings,
  Radio,
  BarChart3,
  X,
  Sparkles,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { ActiveTab } from '../../types';

export const MobileNavigation: React.FC = () => {
  const { activeTab, setActiveTab, notifications, tasks, guests } = useWedding();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const unreadNotifs = notifications.filter((n) => !n.isRead).length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;

  const mainTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'events', label: 'Events', icon: <CalendarDays className="w-5 h-5" /> },
    { id: 'guests', label: 'Guests', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'planning', label: 'Planning', icon: <ClipboardList className="w-5 h-5" /> },
  ];

  const moreItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { id: 'command-center', label: 'Live Day Command Center', icon: <Radio className="w-5 h-5 text-rose-600 animate-pulse" />, badge: 'LIVE' },
    { id: 'family', label: 'Family Tree & Members', icon: <Users2 className="w-5 h-5 text-emerald-600" /> },
    { id: 'invitations', label: 'Invitations & Cards', icon: <Mail className="w-5 h-5 text-indigo-600" /> },
    { id: 'rsvp', label: 'RSVP Management', icon: <CheckCircle2 className="w-5 h-5 text-teal-600" /> },
    { id: 'accommodation', label: 'Hotel & Room Allotment', icon: <Building2 className="w-5 h-5 text-amber-700" /> },
    { id: 'transport', label: 'Transport & Drivers', icon: <Car className="w-5 h-5 text-blue-600" /> },
    { id: 'meals', label: 'Meal & Catering Menu', icon: <UtensilsCrossed className="w-5 h-5 text-orange-600" /> },
    { id: 'vendors', label: 'Vendor Directory', icon: <Briefcase className="w-5 h-5 text-purple-600" /> },
    { id: 'tasks', label: 'Tasks & Checklist', icon: <ClipboardList className="w-5 h-5 text-pink-600" />, badge: pendingTasks || undefined },
    { id: 'budget', label: 'Budget & Expenses', icon: <DollarSign className="w-5 h-5 text-emerald-700" /> },
    { id: 'documents', label: 'Documents & Contracts', icon: <FileText className="w-5 h-5 text-stone-600" /> },
    { id: 'reports', label: 'Reports & Analytics', icon: <BarChart3 className="w-5 h-5 text-blue-700" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5 text-amber-600" />, badge: unreadNotifs || undefined },
    { id: 'settings', label: 'Wedding Settings', icon: <Settings className="w-5 h-5 text-stone-700" /> },
  ];

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMoreOpen(false);
  };

  const isMoreActive = !mainTabs.some((t) => t.id === activeTab);

  return (
    <>
      {/* "More" Bottom Sheet Modal */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-t-3xl p-5 shadow-2xl border-t border-[#D4AF37]/50 max-h-[85vh] flex flex-col animate-slideUp">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE3D5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#7A1C2E] text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#2C1810]">All Wedding Modules</h3>
                  <p className="text-[11px] text-stone-500">Select any management category</p>
                </div>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of Modules */}
            <div className="flex-1 overflow-y-auto py-4 grid grid-cols-2 gap-2.5">
              {moreItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-[#7A1C2E] text-white border-[#7A1C2E] shadow-sm'
                      : 'bg-white/80 border-[#E8DFD0] hover:bg-[#F2ECE0] text-stone-800'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${activeTab === item.id ? 'bg-white/20' : 'bg-[#FAF6F0]'}`}>
                    {item.icon}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <span className="text-xs font-semibold block truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        activeTab === item.id ? 'bg-amber-300 text-[#7A1C2E]' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav
        id="mobile-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FCFAF6]/95 backdrop-blur-md border-t border-[#E8DFD0] px-3 py-2 flex items-center justify-around shadow-lg"
      >
        {mainTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-[#7A1C2E]' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-[#FAF0E1] scale-110 shadow-2xs' : ''}`}>
                {tab.icon}
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'font-bold text-[#7A1C2E]' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#7A1C2E] absolute -bottom-0.5"></span>
              )}
            </button>
          );
        })}

        {/* More Tab */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
            isMoreActive ? 'text-[#7A1C2E]' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <div className={`p-1 rounded-xl transition-all ${isMoreActive ? 'bg-[#FAF0E1] scale-110 shadow-2xs' : ''}`}>
            <Grid className="w-5 h-5" />
          </div>
          <span className={`text-[10px] mt-0.5 ${isMoreActive ? 'font-bold text-[#7A1C2E]' : 'font-medium'}`}>
            More
          </span>
          {(unreadNotifs > 0 || pendingTasks > 0) && (
            <span className="w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-2"></span>
          )}
        </button>
      </nav>
    </>
  );
};
