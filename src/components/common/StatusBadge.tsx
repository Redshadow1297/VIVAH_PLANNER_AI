import React from 'react';
import { RsvpStatus, RoomStatus, TaskPriority, TripStatus } from '../../types';

export const RsvpBadge: React.FC<{ status: RsvpStatus }> = ({ status }) => {
  switch (status) {
    case 'attending':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
          Attending
        </span>
      );
    case 'declined':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
          Declined
        </span>
      );
    case 'tentative':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
          Tentative
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          Pending RSVP
        </span>
      );
  }
};

export const RoomBadge: React.FC<{ status: RoomStatus }> = ({ status }) => {
  switch (status) {
    case 'available':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
          Available
        </span>
      );
    case 'occupied':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          Occupied
        </span>
      );
    case 'reserved':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
          Reserved
        </span>
      );
    case 'maintenance':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mr-1.5"></span>
          Maintenance
        </span>
      );
  }
};

export const MealBadge: React.FC<{ preference?: string; type?: string }> = ({ preference, type }) => {
  const val = (preference || type || 'veg').toLowerCase();
  switch (val) {
    case 'veg':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-600 mr-1"></span>
          Pure Veg
        </span>
      );
    case 'non-veg':
    case 'non_veg':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-300">
          <span className="w-2 h-2 rounded-full bg-rose-600 mr-1"></span>
          Non-Veg
        </span>
      );
    case 'jain':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span>
          Jain
        </span>
      );
    case 'vegan':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-800 border border-teal-300">
          <span className="w-2 h-2 rounded-full bg-teal-500 mr-1"></span>
          Vegan
        </span>
      );
    default:
      return <span className="text-xs text-stone-600 capitalize">{val}</span>;
  }
};

export const PaymentBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'paid':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
          Paid & Cleared
        </span>
      );
    case 'advance_paid':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5"></span>
          Advance Paid
        </span>
      );
    case 'partial':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          Partial Paid
        </span>
      );
    case 'pending':
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
          Pending Payment
        </span>
      );
  }
};

export const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  switch (priority) {
    case 'urgent':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
          URGENT
        </span>
      );
    case 'high':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
          HIGH
        </span>
      );
    case 'medium':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
          MEDIUM
        </span>
      );
    case 'low':
    default:
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700 border border-stone-300">
          LOW
        </span>
      );
  }
};

export const TripBadge: React.FC<{ status: TripStatus }> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          COMPLETED
        </span>
      );
    case 'en_route':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300 animate-pulse">
          EN ROUTE
        </span>
      );
    case 'delayed':
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
          DELAYED
        </span>
      );
    case 'scheduled':
    default:
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
          SCHEDULED
        </span>
      );
  }
};

export const CategoryBadge: React.FC<{ category: string }> = ({ category }) => {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF0E1] text-[#7A1C2E] border border-[#D4AF37]/40">
      {category}
    </span>
  );
};
