import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Users2,
  UserCheck,
  Mail,
  CheckCircle2,
  Building2,
  Car,
  UtensilsCrossed,
  Briefcase,
  CheckSquare,
  DollarSign,
  FileText,
  Bell,
  BarChart3,
  Settings,
  Radio,
  ChevronRight,
  Sparkles,
  ClipboardList,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { ActiveTab } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, wedding, notifications, tasks, guests } = useWedding();

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress').length;
  const pendingRsvpCount = guests.filter((g) => g.rsvpStatus === 'pending').length;

  const navSections: {
    title?: string;
    items: {
      id: ActiveTab;
      label: string;
      icon: React.ReactNode;
      badge?: number | string;
      badgeColor?: string;
      isHighlight?: boolean;
    }[];
  }[] = [
    {
      title: 'Overview',
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
        {
          id: 'command-center',
          label: 'Day Command Center',
          icon: <Radio className="w-4 h-4 text-rose-600 animate-pulse" />,
          badge: 'LIVE',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
          isHighlight: true,
        },
        {
          id: 'planning',
          label: 'Wedding Planning',
          icon: <ClipboardList className="w-4 h-4" />,
        },
        {
          id: 'events',
          label: 'Events & Rituals',
          icon: <CalendarDays className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'People & Hospitality',
      items: [
        {
          id: 'family',
          label: 'Family & Tree',
          icon: <Users2 className="w-4 h-4" />,
        },
        {
          id: 'guests',
          label: 'Guest Directory',
          icon: <UserCheck className="w-4 h-4" />,
          badge: guests.length,
        },
        {
          id: 'invitations',
          label: 'Invitations',
          icon: <Mail className="w-4 h-4" />,
        },
        {
          id: 'rsvp',
          label: 'RSVP Tracker',
          icon: <CheckCircle2 className="w-4 h-4" />,
          badge: pendingRsvpCount > 0 ? `${pendingRsvpCount} pending` : undefined,
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        },
      ],
    },
    {
      title: 'Logistics & Ops',
      items: [
        {
          id: 'accommodation',
          label: 'Accommodation',
          icon: <Building2 className="w-4 h-4" />,
        },
        {
          id: 'transport',
          label: 'Transport & Fleet',
          icon: <Car className="w-4 h-4" />,
        },
        {
          id: 'meals',
          label: 'Meal Management',
          icon: <UtensilsCrossed className="w-4 h-4" />,
        },
        {
          id: 'vendors',
          label: 'Vendor Directory',
          icon: <Briefcase className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'Execution & Control',
      items: [
        {
          id: 'tasks',
          label: 'Tasks & Checklist',
          icon: <CheckSquare className="w-4 h-4" />,
          badge: pendingTasksCount > 0 ? pendingTasksCount : undefined,
          badgeColor: 'bg-[#7A1C2E] text-white',
        },
        {
          id: 'budget',
          label: 'Budget & Expenses',
          icon: <DollarSign className="w-4 h-4" />,
        },
        {
          id: 'documents',
          label: 'Documents & Vault',
          icon: <FileText className="w-4 h-4" />,
        },
        {
          id: 'reports',
          label: 'Reports & Analytics',
          icon: <BarChart3 className="w-4 h-4" />,
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Bell className="w-4 h-4" />,
          badge: unreadCount > 0 ? unreadCount : undefined,
          badgeColor: 'bg-amber-500 text-white',
        },
        {
          id: 'settings',
          label: 'Wedding Settings',
          icon: <Settings className="w-4 h-4" />,
        },
      ],
    },
  ];

  const handleNav = (id: ActiveTab) => {
    setActiveTab(id);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 lg:w-72 bg-[#FAF6F0] border-r border-[#E8DFD0] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#E8DFD0] bg-[#FCFAF6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7A1C2E] to-[#B45309] text-white flex items-center justify-center shadow-md ring-2 ring-[#D4AF37]/50">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#B45309] uppercase font-heading">
                Royal Management
              </span>
              <h2 className="font-heading text-base font-extrabold text-[#2C1810] tracking-tight leading-none">
                ShaadiPlanner
              </h2>
            </div>
          </div>
        </div>

        {/* Couple Mini Card */}
        <div className="mx-4 my-3 p-3 rounded-2xl bg-gradient-to-r from-[#7A1C2E] to-[#591421] text-white shadow-md border border-[#D4AF37]/40 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center gap-3">
            <img
              src={wedding.weddingImage}
              alt="Couple"
              className="w-11 h-11 rounded-xl object-cover ring-2 ring-[#D4AF37]/70 shadow-sm shrink-0"
            />
            <div className="overflow-hidden">
              <p className="font-heading font-bold text-xs text-amber-200 truncate">
                {wedding.brideName} & {wedding.groomName}
              </p>
              <p className="text-[10px] text-amber-100/80 truncate">{wedding.weddingCity}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] font-medium text-white/90">{wedding.weddingTheme}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4">
          {navSections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {sec.title && (
                <div className="px-3 pt-2 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400 font-heading">
                  {sec.title}
                </div>
              )}

              {sec.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNav(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-[#7A1C2E] text-white shadow-sm ring-1 ring-[#D4AF37]/30'
                        : item.isHighlight
                        ? 'bg-rose-50/80 hover:bg-rose-100 text-rose-900 border border-rose-200'
                        : 'text-stone-700 hover:bg-[#F2ECE0] hover:text-[#2C1810]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`transition-colors ${
                          isActive
                            ? 'text-amber-300'
                            : item.isHighlight
                            ? 'text-rose-600'
                            : 'text-stone-500 group-hover:text-[#7A1C2E]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs ${
                            item.badgeColor || (isActive ? 'bg-white/20 text-white border-white/20' : 'bg-stone-200 text-stone-700 border-stone-300')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#E8DFD0] bg-[#FCFAF6]/60 text-center">
          <p className="text-[11px] text-stone-500 font-medium">
            Weddings Made Seamless & Royal
          </p>
          <p className="text-[9px] text-[#B45309] font-bold mt-0.5 tracking-wider uppercase font-heading">
            {wedding.hashtag}
          </p>
        </div>
      </aside>
    </>
  );
};
