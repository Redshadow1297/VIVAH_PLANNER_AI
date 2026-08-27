import React, { useState } from 'react';
import {
  Radio,
  Clock,
  Phone,
  AlertTriangle,
  Send,
  CheckCircle2,
  Sparkles,
  Sun,
  Flame,
  Music,
  Camera,
  ChefHat,
  ShieldAlert,
  Bell,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';

export const CommandCenter: React.FC = () => {
  const { wedding, events, showToast } = useWedding();

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [activeRitualIndex, setActiveRitualIndex] = useState(2);

  // Live run-sheet timeline
  const runSheet = [
    { time: '03:30 PM', title: 'Groom Safa & Sehra Bandi', venue: 'Haveli Courtyard', incharge: 'Groom Father & Pandit Ji', completed: true },
    { time: '04:15 PM', title: 'Royal Baraat Procession (Vintage Car + Dhol Tasha)', venue: 'Palace Main Gate to Lake Port', incharge: 'Baraat Coordinator', completed: true },
    { time: '05:30 PM', title: 'Swagat & Milni of Samdhis', venue: 'Grand Toran Dwar', incharge: 'Bride Uncle & Family', completed: true },
    { time: '06:15 PM', title: 'Grand Varmala Ceremony with Cold Pyro & Rose Showers', venue: 'Floating Palace Deck', incharge: 'Stage Director', completed: false, live: true },
    { time: '07:30 PM', title: 'Vedic Shubh Vivah Pheras & Kanyadaan', venue: 'Central Mandap', incharge: 'Acharya Vidyadhar', completed: false },
    { time: '08:45 PM', title: 'Sindoor Daan & Mangalsutra Vidhi', venue: 'Central Mandap', incharge: 'Priest & Parents', completed: false },
    { time: '09:30 PM', title: 'Shahi Royal Banquet Dinner & Music', venue: 'Palace Royal Lawns', incharge: 'Master Caterer', completed: false },
    { time: '11:45 PM', title: 'Emotional Vidaai Ceremony & Doli Boat Departure', venue: 'Pichola Ghat Jetty', incharge: 'All Family Elders', completed: false },
  ];

  const emergencyContacts = [
    { role: 'Head Priest (Pandit Ji)', name: 'Acharya Vidyadhar Shastri', phone: '+91 98290 88112', icon: <Flame className="w-4 h-4 text-amber-600" /> },
    { role: 'Resort General Manager', name: 'Vikramaditya Oberoi', phone: '+91 98290 10000', icon: <Radio className="w-4 h-4 text-emerald-600" /> },
    { role: 'Executive Master Chef', name: 'Chef Sanjeev Kapur / Caterer', phone: '+91 98290 33445', icon: <ChefHat className="w-4 h-4 text-rose-600" /> },
    { role: 'Lead Cinematographer', name: 'Stories by Joseph Radhik Team', phone: '+91 98290 55667', icon: <Camera className="w-4 h-4 text-blue-600" /> },
    { role: 'DJ & Sound Engineer', name: 'DJ Chetas Live Crew', phone: '+91 98290 77889', icon: <Music className="w-4 h-4 text-purple-600" /> },
    { role: 'First Aid & Emergency MD', name: 'Dr. S. K. Mehta (On-Site Doc)', phone: '+91 98290 99999', icon: <ShieldAlert className="w-4 h-4 text-red-600" /> },
  ];

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    showToast(`BROADCAST SENT TO ALL 12 COORDINATORS: "${broadcastMessage}"`, 'info');
    setBroadcastMessage('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Real-time Status Header */}
      <div className="bg-gradient-to-r from-[#7A1C2E] via-[#5C1322] to-[#2E0710] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold font-heading border border-amber-400/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              LIVE WEDDING DAY MISSION CONTROL
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Vivah Day Minute-by-Minute Run Sheet
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-xl">
              Live coordinator synchronizer: tracks auspicious muhurat timings, rituals, baraat entry, stage protocols, and immediate speed dials.
            </p>
          </div>

          {/* Destination Weather & Muhurat Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-amber-300/30 text-xs space-y-2 self-start lg:self-center shrink-0">
            <div className="flex items-center gap-2 text-amber-300 font-bold font-heading">
              <Sun className="w-4 h-4" />
              <span>Udaipur Weather & Sunset</span>
            </div>
            <div className="text-white">24°C • Clear Sky • Sunset at 05:42 PM</div>
            <div className="pt-1 text-[11px] text-amber-200 border-t border-white/10 font-medium">
              Auspicious Vivah Muhurat: <strong>06:15 PM – 08:30 PM (Godhuli Vela)</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Run-Sheet Timeline */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#2C1810]">
                Live Ceremony Sequence & Cue Sheet
              </h3>
              <p className="text-xs text-stone-500">Real-time status updates from floor coordinators</p>
            </div>
          </div>

          <div className="space-y-4">
            {runSheet.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border transition-all ${
                  item.live
                    ? 'border-[#7A1C2E] bg-[#FAF0E1] ring-2 ring-[#7A1C2E]/20 shadow-md'
                    : item.completed
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-stone-200 bg-stone-50/70 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                        item.completed
                          ? 'bg-emerald-600 text-white'
                          : item.live
                          ? 'bg-[#7A1C2E] text-white animate-pulse'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {item.completed ? <CheckCircle2 className="w-5 h-5" /> : item.time.split(' ')[0]}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-stone-800">{item.time}</span>
                        {item.live && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#7A1C2E] text-white animate-pulse">
                            HAPPENING NOW
                          </span>
                        )}
                        {item.completed && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            COMPLETED
                          </span>
                        )}
                      </div>

                      <h4 className="font-heading font-bold text-sm text-[#2C1810]">{item.title}</h4>

                      <div className="text-xs text-stone-500 flex flex-wrap items-center gap-x-4 gap-y-1 pt-0.5">
                        <span>📍 Venue: <strong className="text-stone-800">{item.venue}</strong></span>
                        <span>👤 In-Charge: <strong className="text-stone-800">{item.incharge}</strong></span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => showToast(`Cued coordinator for: ${item.title}`)}
                    className="px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 shrink-0 shadow-2xs"
                  >
                    Cue In-Charge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Speed Dial & Broadcast Panel */}
        <div className="space-y-6">
          {/* Emergency Speed Dial */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs space-y-4">
            <div>
              <h3 className="font-heading text-base font-bold text-[#2C1810]">
                Immediate Speed Dial
              </h3>
              <p className="text-xs text-stone-500">1-click direct contact with ceremony leads</p>
            </div>

            <div className="space-y-2.5">
              {emergencyContacts.map((contact, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-white border border-[#E2D8C6]">{contact.icon}</div>
                    <div>
                      <div className="font-bold text-stone-900">{contact.name}</div>
                      <div className="text-[11px] text-stone-500">{contact.role}</div>
                    </div>
                  </div>

                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2 rounded-xl bg-[#7A1C2E] text-white hover:bg-[#621423] transition-colors"
                    title={`Call ${contact.name}`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Broadcast Alert */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-700">
              <Bell className="w-5 h-5 text-rose-600 animate-bounce" />
              <h3 className="font-heading text-base font-bold text-[#2C1810]">Broadcast Walkie-Talkie Push</h3>
            </div>
            <p className="text-xs text-stone-500">
              Sends high-priority push banner to all 12 coordinator iPads and phones.
            </p>

            <form onSubmit={handleBroadcastAlert} className="space-y-3">
              <textarea
                rows={3}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="e.g. Varmala fireworks trigger in 5 minutes. Clear the central deck ramp now."
                className="w-full p-3 bg-stone-50 border border-[#E2D8C6] rounded-2xl text-xs outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast Priority Alert</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
