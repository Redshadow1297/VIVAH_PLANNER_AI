import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  Trash2,
  CheckCheck,
  Calendar,
  AlertTriangle,
  Send,
  Sparkles,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { NotificationItem } from '../../types';

export const NotificationsManagement: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, setActiveTab, showToast } =
    useWedding();

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'urgent'>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (selectedFilter === 'unread') return !n.isRead;
    if (selectedFilter === 'urgent') return n.type === 'alert';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Suchana & Alert
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Wedding Notifications & Live Feed
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Real-time alerts, RSVP confirmations, flight arrivals, and vendor contract milestones.
            </p>
          </div>

          <button
            onClick={markAllNotificationsAsRead}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <CheckCheck className="w-4 h-4 text-amber-300" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="pt-4 flex items-center gap-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'all' ? 'bg-[#7A1C2E] text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            All Updates ({notifications.length})
          </button>
          <button
            onClick={() => setSelectedFilter('unread')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'unread' ? 'bg-[#7A1C2E] text-white' : 'bg-stone-100 text-stone-700'
            }`}
          >
            Unread ({notifications.filter((n) => !n.isRead).length})
          </button>
          <button
            onClick={() => setSelectedFilter('urgent')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedFilter === 'urgent' ? 'bg-rose-700 text-white' : 'bg-rose-50 text-rose-800'
            }`}
          >
            Urgent Alerts
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationAsRead(notif.id);
              if (notif.linkTab) setActiveTab(notif.linkTab);
            }}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              !notif.isRead
                ? 'bg-[#FAF0E1]/80 border-[#D4AF37]/50 shadow-xs ring-1 ring-[#D4AF37]/20'
                : 'bg-white border-[#E8DFD0] hover:bg-stone-50/80'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  notif.type === 'alert'
                    ? 'bg-rose-100 text-rose-700'
                    : notif.type === 'success'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-[#FAF0E1] text-[#7A1C2E]'
                }`}
              >
                <Bell className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-[#2C1810]">{notif.title}</h4>
                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#7A1C2E] shrink-0"></span>
                  )}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{notif.description}</p>
                <div className="text-[11px] text-stone-400 flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{notif.timestamp}</span>
                </div>
              </div>
            </div>

            {notif.linkTab && (
              <button className="px-3.5 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 shrink-0 self-start sm:self-center shadow-2xs">
                View Details →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
