import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Coffee,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Users,
  Clock,
  ShieldCheck,
  ChefHat,
} from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { MealPlan, MenuItem } from '../../types';

export const MealManagement: React.FC = () => {
  const { mealPlans, events, showToast } = useWedding();

  const [selectedPlanId, setSelectedPlanId] = useState<string>(mealPlans[0]?.id || '');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  const currentPlan = mealPlans.find((m) => m.id === selectedPlanId) || mealPlans[0];

  const categories = [
    'Welcome Drinks & Mocktails',
    'Live Chaat Counters',
    'Starters & Appetizers',
    'Main Course',
    'Breads & Rice',
    'Royal Desserts & Mithai Bar',
    'Midnight Snacks',
  ];

  const filteredItems = currentPlan
    ? selectedCategoryFilter === 'all'
      ? currentPlan.menuItems
      : currentPlan.menuItems.filter((i) => i.category === selectedCategoryFilter)
    : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B45309] font-bold font-heading">
              Bhojan & Pakwan
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C1810]">
              Catering & Banquet Menu Master
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Curate royal multi-cuisine courses, live counters, Jain kitchen segregations, and headcounts.
            </p>
          </div>

          <button
            onClick={() => showToast('Menu PDF rendered with caterer kitchen guidelines')}
            className="px-4 py-2 bg-[#7A1C2E] hover:bg-[#621423] text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-center"
          >
            <ChefHat className="w-4 h-4" />
            <span>Export Caterer Sheet</span>
          </button>
        </div>

        {/* Meal Plans Horizontal Selector */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {mealPlans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                setSelectedPlanId(plan.id);
                setSelectedCategoryFilter('all');
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedPlanId === plan.id
                  ? 'bg-[#7A1C2E] text-white shadow-md'
                  : 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>{plan.mealName}</span>
              <span className="text-[10px] opacity-80 font-normal">({plan.headcount} Pax)</span>
            </button>
          ))}
        </div>
      </div>

      {currentPlan && (
        <div className="space-y-6">
          {/* Plan Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD0] shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#7A1C2E] uppercase font-heading">
                  Linked Ceremony: {currentPlan.linkedEventName}
                </span>
                <h3 className="font-heading text-2xl font-bold text-[#2C1810]">{currentPlan.mealName}</h3>
                <p className="text-xs text-stone-500">
                  Caterer: <strong className="text-stone-800">{currentPlan.catererName}</strong> • {currentPlan.menuItems.length} Signature Dishes
                </p>
              </div>

              {/* Headcount breakdown tags */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200">
                  <div className="font-bold text-[#2C1810] text-sm">{currentPlan.headcount}</div>
                  <div className="text-[10px] text-stone-500">Total Pax</div>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <div className="font-bold text-sm">{currentPlan.vegCount}</div>
                  <div className="text-[10px] text-emerald-700">Pure Veg</div>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                  <div className="font-bold text-sm">{currentPlan.jainCount}</div>
                  <div className="text-[10px] text-amber-700">Strict Jain</div>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
                  <div className="font-bold text-sm">{currentPlan.nonVegCount}</div>
                  <div className="text-[10px] text-rose-700">Non-Veg</div>
                </div>
              </div>
            </div>

            {/* Special Instructions & Segregation guidelines */}
            {currentPlan.specialInstructions && (
              <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF0E1] border border-[#D4AF37]/50 text-xs text-[#7A1C2E] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 shrink-0 text-[#D4AF37]" />
                <div>
                  <strong className="font-heading uppercase tracking-wider">Kitchen & Hygiene Protocol:</strong>{' '}
                  {currentPlan.specialInstructions}
                </div>
              </div>
            )}
          </div>

          {/* Menu Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategoryFilter === 'all'
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'bg-white border border-[#E8DFD0] text-stone-700'
              }`}
            >
              All Courses ({currentPlan.menuItems.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategoryFilter === cat
                    ? 'bg-[#7A1C2E] text-white shadow-xs'
                    : 'bg-white border border-[#E8DFD0] text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl bg-white border border-[#E8DFD0] shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 font-heading">
                      {item.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.dietType === 'jain'
                          ? 'bg-amber-100 text-amber-900 border border-amber-300'
                          : item.dietType === 'veg'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {item.dietType.toUpperCase()}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-base text-[#2C1810]">{item.name}</h4>
                  <p className="text-xs text-stone-500 mt-1">{item.description}</p>
                </div>

                {item.liveCounter && (
                  <div className="pt-2 border-t border-stone-100 flex items-center gap-1 text-[11px] font-bold text-[#7A1C2E]">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Live Chef Station / Flame Counter</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
