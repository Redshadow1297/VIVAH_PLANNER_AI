import React, { useState } from 'react';
import {
  Mail,
  Send,
  QrCode,
  Sparkles,
  Share2,
  Copy,
  CheckCircle2,
  Truck,
  Eye,
  Smartphone,
  FileText,
  Printer,
  ChevronRight,
  Heart,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { InvitationTemplate } from '../../types';

export const InvitationManagement: React.FC = () => {
  const { wedding, events, guests, updateGuest, showToast } = useWedding();

  const [selectedTemplate, setSelectedTemplate] = useState<InvitationTemplate['id']>('royal-rajasthani');
  const [activeTab, setActiveTab] = useState<'digital' | 'whatsapp' | 'physical-tracker' | 'qr-pass'>('digital');
  const [selectedGuestForPreview, setSelectedGuestForPreview] = useState(guests[0] || null);

  // Template definitions
  const templates: InvitationTemplate[] = [
    {
      id: 'royal-rajasthani',
      name: 'Royal Rajasthani Gold',
      theme: 'gold',
      backgroundClass: 'bg-gradient-to-br from-[#7A1C2E] via-[#5B1220] to-[#2B060E] text-amber-100 border-[#D4AF37]',
      fontFamily: 'font-heading',
    },
    {
      id: 'classic-crimson',
      name: 'Vedic Crimson & Brass',
      theme: 'maroon',
      backgroundClass: 'bg-gradient-to-b from-[#881337] to-[#4C0519] text-white border-[#F59E0B]',
      fontFamily: 'font-display',
    },
    {
      id: 'modern-pastel',
      name: 'Blush Floral Minimalist',
      theme: 'pastel',
      backgroundClass: 'bg-gradient-to-tr from-[#FFF1F2] via-[#FAF5FF] to-[#F0FDF4] text-stone-900 border-[#FBCFE8]',
      fontFamily: 'font-sans',
    },
    {
      id: 'emerald-palace',
      name: 'Emerald & Antique Gold',
      theme: 'emerald',
      backgroundClass: 'bg-gradient-to-br from-[#064E3B] via-[#022C22] to-[#047857] text-amber-200 border-[#D4AF37]',
      fontFamily: 'font-heading',
    },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplate) || templates[0];

  // Dynamic WhatsApp invitation message builder
  const guestName = selectedGuestForPreview ? selectedGuestForPreview.name : 'Esteemed Family';
  const whatsappMessage = `🌸 *Wedding Invitation: ${wedding.brideName} & ${wedding.groomName}* 🌸

Dear *${guestName}*,

With the divine blessings of our elders and the Almighty, the Sharma & Shinde families cordially invite you to celebrate the holy union and wedding festivities of:

✨ *${wedding.brideName}* & *${wedding.groomName}* ✨

📅 *Dates:* Nov 28 – Dec 01, 2026
📍 *Destination Venue:* ${wedding.weddingLocation}
🎉 *Hashtag:* ${wedding.hashtag}

*Main Ceremonies:*
• Ganesh Puja & Welcome Lunch — Nov 28 (11:00 AM)
• Royal Mehendi & Sangeet — Nov 29 (07:00 PM)
• Haldi & Shubh Vivah (Pheras) — Nov 30 (04:30 PM)
• Grand Imperial Reception — Dec 01 (07:30 PM)

Kindly confirm your RSVP & access your personalized travel itinerary, room pass, and event run-sheets at the link below:
🔗 https://shaadi.app/join?code=${wedding.brideName.split(' ')[0].toUpperCase()}-${wedding.groomName.split(' ')[0].toUpperCase()}-2026

Warm regards,
*Sharma & Kumar Parivar*`;

  const handleCopyWhatsApp = () => {
    navigator.clipboard.writeText(whatsappMessage);
    showToast('WhatsApp wedding invitation copied to clipboard!');
  };

  const handleSendAllInvites = () => {
    guests.forEach((g) => updateGuest(g.id, { invitationSent: true }));
    showToast(`Dispatched digital invitation links to all ${guests.length} families!`, 'info');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Mode Switcher */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Nimantran & Cards
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Invitations, E-Cards & WhatsApp Passes
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Design digital cards, dispatch WhatsApp invitations, track physical cards, and issue entry QR passes.
            </p>
          </div>

          <button
            onClick={handleSendAllInvites}
            className="px-4 py-2.5 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all self-start sm:self-center"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>Send All Digital Invites</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'digital', label: 'E-Card Designer & Preview', icon: <Eye className="w-4 h-4" /> },
            { id: 'whatsapp', label: 'WhatsApp Invite Dispatcher', icon: <Smartphone className="w-4 h-4" /> },
            { id: 'physical-tracker', label: 'Physical Card Tracker', icon: <Truck className="w-4 h-4" /> },
            { id: 'qr-pass', label: 'Entry QR Pass', icon: <QrCode className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Digital E-Card Designer */}
      {activeTab === 'digital' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Controls */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs space-y-6">
            <div>
              <h3 className="font-heading text-base font-bold text-[#2C1810]">Select Card Template</h3>
              <p className="text-xs text-stone-500 mt-0.5">Choose royal aesthetic for your invitation card</p>
            </div>

            <div className="space-y-3">
              {templates.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedTemplate === tpl.id
                      ? 'border-[#7A1C2E] bg-[#FAF0E1] shadow-xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-xs text-[#2C1810]">{tpl.name}</div>
                    <div className="text-[10px] text-stone-500 capitalize">{tpl.theme} theme</div>
                  </div>
                  {selectedTemplate === tpl.id && <CheckCircle2 className="w-4 h-4 text-[#7A1C2E]" />}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Preview for Guest:
              </label>
              <select
                value={selectedGuestForPreview?.id || ''}
                onChange={(e) => {
                  const g = guests.find((item) => item.id === e.target.value);
                  if (g) setSelectedGuestForPreview(g);
                }}
                className="w-full px-3 py-2 bg-stone-50 border border-[#E2D8C6] rounded-xl text-xs font-medium outline-none"
              >
                {guests.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} ({g.category} - {g.membersCount} pax)
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => showToast('Digital Card PDF rendered for print & download')}
                className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Download Print-Ready PDF</span>
              </button>
            </div>
          </div>

          {/* Interactive Card Canvas Preview */}
          <div className="lg:col-span-2 flex items-center justify-center">
            <div
              className={`w-full max-w-lg rounded-3xl p-8 sm:p-10 shadow-2xl border-4 ${currentTemplate.backgroundClass} relative overflow-hidden transition-all duration-300`}
            >
              {/* Card Filigree Ornaments */}
              <div className="absolute top-3 left-3 w-12 h-12 border-t-2 border-l-2 border-amber-300/60 rounded-tl-xl pointer-events-none" />
              <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-amber-300/60 rounded-tr-xl pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-12 h-12 border-b-2 border-l-2 border-amber-300/60 rounded-bl-xl pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-12 h-12 border-b-2 border-r-2 border-amber-300/60 rounded-br-xl pointer-events-none" />

              <div className="text-center space-y-4 relative z-10">
                <div className="text-xs tracking-widest uppercase font-bold text-amber-300">
                  || ॐ श्री गणेशाय नमः ||
                </div>

                <div className="text-xs uppercase tracking-wider font-semibold opacity-80">
                  Together with our families
                </div>

                <div className="font-heading text-2xl sm:text-3xl font-extrabold tracking-wide">
                  {wedding.brideName}
                  <div className="text-base font-display italic font-normal text-amber-300 my-0.5">&</div>
                  {wedding.groomName}
                </div>

                <p className="text-xs opacity-90 leading-relaxed max-w-xs mx-auto pt-1 font-serif">
                  Cordially invite <strong className="text-amber-200">{guestName}</strong> to grace the celebration of their wedding ceremonies and joyous moments.
                </p>

                <div className="py-3 my-2 border-y border-amber-300/30 space-y-1">
                  <div className="font-heading text-sm font-bold tracking-wide">
                    {new Date(wedding.weddingDate).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <div className="text-xs opacity-90">{wedding.weddingLocation}</div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="font-mono text-xs px-3 py-1 bg-black/30 rounded-lg text-amber-300 border border-amber-300/30">
                    {wedding.hashtag}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. WhatsApp Invite Dispatcher */}
      {activeTab === 'whatsapp' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs space-y-4">
            <div>
              <h3 className="font-heading text-base font-bold text-[#2C1810]">WhatsApp Invitation Message</h3>
              <p className="text-xs text-stone-500">Formatted with emoji markers, itinerary & secure RSVP link</p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E2D8C6] font-mono text-xs text-stone-800 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
              {whatsappMessage}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleCopyWhatsApp}
                className="flex-1 py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy WhatsApp Text</span>
              </button>
              <button
                onClick={() => {
                  window.open(
                    `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`,
                    '_blank'
                  );
                }}
                className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Open WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8DFD0] shadow-xs space-y-4">
            <h3 className="font-heading text-base font-bold text-[#2C1810]">
              WhatsApp Dispatch Status ({guests.filter((g) => g.invitationSent).length}/{guests.length} Sent)
            </h3>

            <div className="space-y-2.5 max-h-96 overflow-y-auto">
              {guests.map((g) => (
                <div
                  key={g.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] text-xs"
                >
                  <div>
                    <div className="font-bold text-stone-900">{g.name}</div>
                    <div className="text-[11px] text-stone-500">{g.phone}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        g.invitationSent ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {g.invitationSent ? 'Dispatched' : 'Pending'}
                    </span>
                    <button
                      onClick={() => {
                        updateGuest(g.id, { invitationSent: !g.invitationSent });
                        showToast(`Updated invitation status for ${g.name}`);
                      }}
                      className="px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-[11px] font-semibold text-stone-700"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Physical Card Tracker */}
      {activeTab === 'physical-tracker' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div>
              <h3 className="font-heading text-lg font-bold text-[#2C1810]">Traditional Mithai Box & Card Courier Log</h3>
              <p className="text-xs text-stone-500">Track delivery status of printed luxury cards with sweet boxes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
              <div className="font-heading text-xl font-bold text-stone-900">400</div>
              <div className="text-xs text-stone-500">Printed Sets</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
              <div className="font-heading text-xl font-bold">280</div>
              <div className="text-xs text-blue-700">Couriers Dispatched</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="font-heading text-xl font-bold">245</div>
              <div className="text-xs text-emerald-700">Delivered & Handed Over</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="font-heading text-xl font-bold">35</div>
              <div className="text-xs text-amber-700">In Transit / Personal Visit</div>
            </div>
          </div>

          <div className="space-y-2">
            {guests.slice(0, 5).map((g, idx) => (
              <div
                key={g.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EBE3D5] text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#FAF0E1] text-[#7A1C2E] flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">{g.name}</div>
                    <div className="text-[11px] text-stone-500">
                      Mithai Box Type: Kaju Katli & Dry Fruit Box
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Delivered via BlueDart #BD-889210
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Entry QR Pass */}
      {activeTab === 'qr-pass' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs flex flex-col items-center text-center space-y-6">
          <div className="max-w-md space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#7A1C2E] font-bold font-heading">
              Contactless Hospitality
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#2C1810]">Digital Wedding Security & QR Pass</h3>
            <p className="text-xs text-stone-500">
              Scanned at the Oberoi Udaivilas & Jagmandir boat jetty for instant room key issuance and meal coupons.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] shadow-xl max-w-sm w-full space-y-4">
            <div className="w-44 h-44 mx-auto bg-white p-3 rounded-2xl border-2 border-stone-200 shadow-inner flex items-center justify-center">
              <QrCode className="w-36 h-36 text-[#7A1C2E]" />
            </div>

            <div>
              <div className="font-heading font-bold text-base text-[#2C1810]">{guestName}</div>
              <div className="text-xs text-stone-500">{selectedGuestForPreview?.category || 'VIP Guest'} • {selectedGuestForPreview?.membersCount || 2} Pax</div>
              <div className="font-mono text-xs font-bold text-[#7A1C2E] mt-1">
                PASS: SHAADI-{selectedGuestForPreview?.id.toUpperCase() || 'PASS-01'}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-white text-[11px] text-stone-600 border border-stone-200">
              Valid for all 6 ceremonies and Lake Pichola boat transit
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
