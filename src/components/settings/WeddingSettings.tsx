import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Palette,
  RotateCcw,
  Save,
  CheckCircle2,
  Users,
  Heart,
  Globe,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { UserRole } from '../../types';

export const WeddingSettings: React.FC = () => {
  const { wedding, updateWedding, activeRole, setActiveRole, showToast } = useWedding();

  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate);
  const [weddingLocation, setWeddingLocation] = useState(wedding.weddingLocation);
  const [hashtag, setHashtag] = useState(wedding.hashtag);
  const [totalBudget, setTotalBudget] = useState(wedding.totalBudget);

  const [selectedTheme, setSelectedTheme] = useState<'maroon' | 'crimson' | 'emerald' | 'rose'>('maroon');

  const themes = [
    { id: 'maroon', name: 'Royal Maroon & Antique Gold', color: 'bg-[#7A1C2E] border-[#D4AF37]' },
    { id: 'crimson', name: 'Vedic Crimson & Brass', color: 'bg-[#881337] border-amber-500' },
    { id: 'emerald', name: 'Emerald Palace & Champagne', color: 'bg-[#064E3B] border-amber-300' },
    { id: 'rose', name: 'Blush Rose & Platinum', color: 'bg-[#9D174D] border-pink-300' },
  ];

  const roles: { role: UserRole; title: string; desc: string }[] = [
    { role: 'owner', title: 'Wedding Owner (Bride / Groom)', desc: 'Full administrative access to budgets, guest approvals, and vendor contracts.' },
    { role: 'family', title: 'Family Member', desc: 'Can view family trees, guest lists, and ceremonies without budget editing.' },
    { role: 'coordinator', title: 'Wedding Coordinator / Admin', desc: 'Floor management, room key handovers, transport dispatch, and run-sheets.' },
    { role: 'guest', title: 'Guest Pass View', desc: 'Personalized itinerary, digital invite, and venue maps only.' },
  ];

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateWedding({
      brideName,
      groomName,
      weddingDate,
      weddingLocation,
      hashtag,
      totalBudget: Number(totalBudget),
    });
  };

  const handleResetData = () => {
    showToast('Reset all database records to royal demonstration wedding!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Viyavastha & Setting
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Wedding Settings & Access Controls
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Configure couple profile, multi-role security permissions, palette themes, and notification triggers.
            </p>
          </div>

          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Couple & Wedding Profile */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#7A1C2E]">
            <Heart className="w-5 h-5" />
            <h3 className="font-heading text-lg font-bold text-[#2C1810]">Wedding Details & Venue</h3>
          </div>

          <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Bride's Name
                </label>
                <input
                  type="text"
                  required
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Groom's Name
                </label>
                <input
                  type="text"
                  required
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Wedding Date
                </label>
                <input
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                  Official Hashtag
                </label>
                <input
                  type="text"
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                Wedding Location & Venue
              </label>
              <input
                type="text"
                value={weddingLocation}
                onChange={(e) => setWeddingLocation(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1 font-heading">
                Total Allocated Budget (₹)
              </label>
              <input
                type="number"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl outline-none font-bold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Update Wedding Profile</span>
            </button>
          </form>
        </div>

        {/* 2. Switch Active Role (RBAC Testing) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#7A1C2E]">
            <Shield className="w-5 h-5" />
            <h3 className="font-heading text-lg font-bold text-[#2C1810]">Active Persona / Role Switcher</h3>
          </div>
          <p className="text-xs text-stone-500">
            Switch your role to simulate the interface permissions for Bride/Groom, Coordinators, Family, or Guests.
          </p>

          <div className="space-y-3">
            {roles.map((r) => (
              <div
                key={r.role}
                onClick={() => {
                  setActiveRole(r.role);
                  showToast(`Role switched to: ${r.title}`);
                }}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                  activeRole === r.role
                    ? 'border-[#7A1C2E] bg-[#FAF0E1] shadow-xs'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#2C1810] font-heading">{r.title}</span>
                  {activeRole === r.role && <CheckCircle2 className="w-4 h-4 text-[#7A1C2E]" />}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Theme & Aesthetics */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#7A1C2E]">
            <Palette className="w-5 h-5" />
            <h3 className="font-heading text-lg font-bold text-[#2C1810]">Royal Color Palette</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {themes.map((th) => (
              <div
                key={th.id}
                onClick={() => {
                  setSelectedTheme(th.id as any);
                  showToast(`Applied ${th.name} theme!`);
                }}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  selectedTheme === th.id
                    ? 'border-[#7A1C2E] bg-[#FAF0E1]'
                    : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full border-2 ${th.color}`} />
                  <span className="font-bold text-xs text-stone-800">{th.name.split('&')[0]}</span>
                </div>
                {selectedTheme === th.id && <CheckCircle2 className="w-4 h-4 text-[#7A1C2E]" />}
              </div>
            ))}
          </div>
        </div>

        {/* 4. Automated Reminders & WhatsApp Triggers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#7A1C2E]">
            <Bell className="w-5 h-5" />
            <h3 className="font-heading text-lg font-bold text-[#2C1810]">Automated WhatsApp & Push Alerts</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] cursor-pointer">
              <span>Send WhatsApp reminder 7 days before RSVP deadline</span>
              <input type="checkbox" defaultChecked className="accent-[#7A1C2E] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] cursor-pointer">
              <span>Broadcast driver assignment alert upon guest flight landing</span>
              <input type="checkbox" defaultChecked className="accent-[#7A1C2E] w-4 h-4" />
            </label>
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] cursor-pointer">
              <span>Notify coordinator 30 minutes before next ceremony muhurat</span>
              <input type="checkbox" defaultChecked className="accent-[#7A1C2E] w-4 h-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
