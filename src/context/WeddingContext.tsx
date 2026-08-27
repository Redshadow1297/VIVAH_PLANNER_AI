import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WeddingDetails,
  UserRole,
  ActiveTab,
  AuthScreen,
  Guest,
  FamilyMember,
  WeddingEvent,
  InvitationTemplate,
  Invitation,
  Hotel,
  Room,
  Vehicle,
  TransportTrip,
  EventMealPlan,
  Vendor,
  Task,
  Expense,
  WeddingDocument,
  NotificationItem,
} from '../types';
import {
  initialWeddingDetails,
  initialEvents,
  initialFamilyMembers,
  initialGuests,
  initialInvitationTemplates,
  initialInvitations,
  initialHotels,
  initialRooms,
  initialVehicles,
  initialTrips,
  initialMealPlans,
  initialVendors,
  initialTasks,
  initialExpenses,
  initialDocuments,
  initialNotifications,
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface WeddingContextType {
  wedding: WeddingDetails;
  updateWedding: (details: Partial<WeddingDetails>) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: 'web' | 'mobile';
  setViewMode: (mode: 'web' | 'mobile') => void;
  authScreen: AuthScreen | 'authenticated';
  setAuthScreen: (screen: AuthScreen | 'authenticated') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;

  // Data & Mutators
  events: WeddingEvent[];
  addEvent: (event: Omit<WeddingEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<WeddingEvent>) => void;
  deleteEvent: (id: string) => void;
  duplicateEvent: (id: string) => void;

  familyMembers: FamilyMember[];
  addFamilyMember: (member: Omit<FamilyMember, 'id'>) => void;
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string) => void;

  guests: Guest[];
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, guest: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  importGuests: (newGuests: Omit<Guest, 'id'>[]) => void;

  invitations: Invitation[];
  invitationTemplates: InvitationTemplate[];
  sendInvitation: (guestId: string, templateId: string, channel: 'whatsapp' | 'email' | 'sms') => void;
  resendInvitation: (id: string) => void;

  hotels: Hotel[];
  rooms: Room[];
  updateRoomStatus: (roomId: string, status: Room['status'], assignedNames?: string[]) => void;
  assignGuestToRoom: (guestId: string, guestName: string, roomId: string) => void;

  vehicles: Vehicle[];
  trips: TransportTrip[];
  addTrip: (trip: Omit<TransportTrip, 'id'>) => void;
  updateTripStatus: (tripId: string, status: TransportTrip['status']) => void;

  mealPlans: EventMealPlan[];
  updateMealPlan: (id: string, plan: Partial<EventMealPlan>) => void;

  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, 'id'>) => void;
  updateVendor: (id: string, vendor: Partial<Vendor>) => void;
  deleteVendor: (id: string) => void;

  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;

  documents: WeddingDocument[];
  addDocument: (doc: Omit<WeddingDocument, 'id'>) => void;
  deleteDocument: (id: string) => void;

  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Search & Global Modals
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toast system
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wedding, setWedding] = useState<WeddingDetails>(initialWeddingDetails);
  const [activeRole, setActiveRole] = useState<UserRole>('owner');
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');
  const [authScreen, setAuthScreen] = useState<AuthScreen | 'authenticated'>('authenticated');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // States
  const [events, setEvents] = useState<WeddingEvent[]>(initialEvents);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  const [invitationTemplates] = useState<InvitationTemplate[]>(initialInvitationTemplates);
  const [hotels] = useState<Hotel[]>(initialHotels);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [vehicles] = useState<Vehicle[]>(initialVehicles);
  const [trips, setTrips] = useState<TransportTrip[]>(initialTrips);
  const [mealPlans, setMealPlans] = useState<EventMealPlan[]>(initialMealPlans);
  const [vendors, setVendors] = useState<Vendor[]>(initialVendors);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [documents, setDocuments] = useState<WeddingDocument[]>(initialDocuments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);

  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateWedding = (details: Partial<WeddingDetails>) => {
    setWedding((prev) => ({ ...prev, ...details }));
    showToast('Wedding details updated successfully');
  };

  // Event handlers
  const addEvent = (eventData: Omit<WeddingEvent, 'id'>) => {
    const newEvent: WeddingEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
    };
    setEvents((prev) => [...prev, newEvent]);
    showToast(`Event "${newEvent.name}" added successfully`);
  };

  const updateEvent = (id: string, updated: Partial<WeddingEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
    showToast('Event updated successfully');
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event deleted', 'info');
  };

  const duplicateEvent = (id: string) => {
    const target = events.find((e) => e.id === id);
    if (!target) return;
    const duplicated: WeddingEvent = {
      ...target,
      id: `evt-${Date.now()}`,
      name: `${target.name} (Copy)`,
    };
    setEvents((prev) => [...prev, duplicated]);
    showToast(`Duplicated "${target.name}"`);
  };

  // Family handlers
  const addFamilyMember = (memberData: Omit<FamilyMember, 'id'>) => {
    const newMember: FamilyMember = {
      ...memberData,
      id: `fam-${Date.now()}`,
    };
    setFamilyMembers((prev) => [...prev, newMember]);
    showToast(`${newMember.name} added to family tree`);
  };

  const updateFamilyMember = (id: string, updated: Partial<FamilyMember>) => {
    setFamilyMembers((prev) => prev.map((f) => (f.id === id ? { ...f, ...updated } : f)));
    showToast('Family member details updated');
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((f) => f.id !== id));
    showToast('Family member removed', 'info');
  };

  // Guest handlers
  const addGuest = (guestData: Omit<Guest, 'id'>) => {
    const newGuest: Guest = {
      ...guestData,
      id: `gst-${Date.now()}`,
    };
    setGuests((prev) => [newGuest, ...prev]);
    showToast(`Guest "${newGuest.name}" added to list`);
  };

  const updateGuest = (id: string, updated: Partial<Guest>) => {
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
    showToast('Guest record updated');
  };

  const deleteGuest = (id: string) => {
    setGuests((prev) => prev.filter((g) => g.id !== id));
    showToast('Guest removed from list', 'info');
  };

  const importGuests = (newGuestsData: Omit<Guest, 'id'>[]) => {
    const formatted = newGuestsData.map((g, idx) => ({
      ...g,
      id: `gst-${Date.now()}-${idx}`,
    }));
    setGuests((prev) => [...formatted, ...prev]);
    showToast(`Successfully imported ${formatted.length} guests`);
  };

  // Invitations
  const sendInvitation = (guestId: string, templateId: string, channel: 'whatsapp' | 'email' | 'sms') => {
    const guest = guests.find((g) => g.id === guestId);
    if (!guest) return;

    const existingIndex = invitations.findIndex((i) => i.guestId === guestId);
    const newInv: Invitation = {
      id: `inv-${Date.now()}`,
      guestId,
      guestName: guest.name,
      phone: guest.phone,
      templateId,
      status: 'sent',
      sentVia: channel,
      sentAt: new Date().toLocaleString(),
    };

    if (existingIndex >= 0) {
      setInvitations((prev) => prev.map((i, idx) => (idx === existingIndex ? newInv : i)));
    } else {
      setInvitations((prev) => [newInv, ...prev]);
    }
    showToast(`Invitation dispatched to ${guest.name} via ${channel.toUpperCase()}`);
  };

  const resendInvitation = (id: string) => {
    setInvitations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: 'sent', sentAt: new Date().toLocaleString() }
          : i
      )
    );
    showToast('Invitation resent successfully');
  };

  // Room updates
  const updateRoomStatus = (roomId: string, status: Room['status'], assignedNames?: string[]) => {
    setRooms((prev) =>
      prev.map((r) =>
        r.id === roomId
          ? {
              ...r,
              status,
              assignedGuestNames: assignedNames ?? r.assignedGuestNames,
            }
          : r
      )
    );
    showToast('Room allotment updated');
  };

  const assignGuestToRoom = (guestId: string, guestName: string, roomId: string) => {
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const isAlready = r.assignedGuestIds.includes(guestId);
          const newIds = isAlready ? r.assignedGuestIds : [...r.assignedGuestIds, guestId];
          const newNames = isAlready ? r.assignedGuestNames : [...r.assignedGuestNames, guestName];
          return {
            ...r,
            assignedGuestIds: newIds,
            assignedGuestNames: newNames,
            status: 'occupied',
          };
        }
        return r;
      })
    );
    setGuests((prev) =>
      prev.map((g) => (g.id === guestId ? { ...g, assignedRoom: roomId, accommodationRequired: true } : g))
    );
    showToast(`Assigned ${guestName} to room`);
  };

  // Trips
  const addTrip = (tripData: Omit<TransportTrip, 'id'>) => {
    const newTrip: TransportTrip = {
      ...tripData,
      id: `trp-${Date.now()}`,
    };
    setTrips((prev) => [...prev, newTrip]);
    showToast('Transport trip scheduled');
  };

  const updateTripStatus = (tripId: string, status: TransportTrip['status']) => {
    setTrips((prev) => prev.map((t) => (t.id === tripId ? { ...t, status } : t)));
    showToast(`Trip status changed to ${status}`);
  };

  // Meal Plans
  const updateMealPlan = (id: string, plan: Partial<EventMealPlan>) => {
    setMealPlans((prev) => prev.map((m) => (m.id === id ? { ...m, ...plan } : m)));
    showToast('Meal plan updated');
  };

  // Vendors
  const addVendor = (vendorData: Omit<Vendor, 'id'>) => {
    const newVendor: Vendor = {
      ...vendorData,
      id: `ven-${Date.now()}`,
    };
    setVendors((prev) => [...prev, newVendor]);
    showToast(`Vendor "${newVendor.name}" added`);
  };

  const updateVendor = (id: string, updated: Partial<Vendor>) => {
    setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
    showToast('Vendor profile updated');
  };

  const deleteVendor = (id: string) => {
    setVendors((prev) => prev.filter((v) => v.id !== id));
    showToast('Vendor deleted', 'info');
  };

  // Tasks
  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: `tsk-${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
    showToast(`Task created: ${newTask.title}`);
  };

  const updateTask = (id: string, updated: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    showToast('Task updated');
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showToast('Task removed', 'info');
  };

  // Expenses
  const addExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}`,
    };
    setExpenses((prev) => [newExpense, ...prev]);
    showToast(`Logged expense of ₹${newExpense.amount.toLocaleString('en-IN')}`);
  };

  const updateExpense = (id: string, updated: Partial<Expense>) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
    showToast('Expense updated');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
    showToast('Expense record deleted', 'info');
  };

  // Documents
  const addDocument = (docData: Omit<WeddingDocument, 'id'>) => {
    const newDoc: WeddingDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showToast(`Document "${newDoc.title}" uploaded`);
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
    showToast('Document removed', 'info');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('All notifications marked as read');
  };

  return (
    <WeddingContext.Provider
      value={{
        wedding,
        updateWedding,
        activeRole,
        setActiveRole,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        authScreen,
        setAuthScreen,
        isAuthenticated,
        setIsAuthenticated,
        events,
        addEvent,
        updateEvent,
        deleteEvent,
        duplicateEvent,
        familyMembers,
        addFamilyMember,
        updateFamilyMember,
        deleteFamilyMember,
        guests,
        addGuest,
        updateGuest,
        deleteGuest,
        importGuests,
        invitations,
        invitationTemplates,
        sendInvitation,
        resendInvitation,
        hotels,
        rooms,
        updateRoomStatus,
        assignGuestToRoom,
        vehicles,
        trips,
        addTrip,
        updateTripStatus,
        mealPlans,
        updateMealPlan,
        vendors,
        addVendor,
        updateVendor,
        deleteVendor,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        expenses,
        addExpense,
        updateExpense,
        deleteExpense,
        documents,
        addDocument,
        deleteDocument,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        searchQuery,
        setSearchQuery,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
