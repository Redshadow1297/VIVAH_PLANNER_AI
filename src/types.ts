export type UserRole = 'owner' | 'family' | 'coordinator' | 'guest';

export type ActiveTab =
  | 'dashboard'
  | 'planning'
  | 'events'
  | 'family'
  | 'guests'
  | 'invitations'
  | 'rsvp'
  | 'accommodation'
  | 'transport'
  | 'meals'
  | 'vendors'
  | 'tasks'
  | 'budget'
  | 'documents'
  | 'notifications'
  | 'reports'
  | 'command-center'
  | 'settings';

export type AuthScreen =
  | 'splash'
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'otp-verification'
  | 'reset-password'
  | 'create-wedding'
  | 'join-wedding'
  | 'role-select';

export interface WeddingDetails {
  id: string;
  brideName: string;
  groomName: string;
  weddingDate: string; // e.g. "2026-11-28"
  weddingEndDate: string; // e.g. "2026-12-01"
  weddingLocation: string; // e.g. "The Oberoi Udaivilas, Udaipur, Rajasthan"
  weddingCity: string;
  weddingImage: string;
  weddingTheme: 'Royal Rajasthani' | 'Classic Crimson' | 'Modern Pastel' | 'Emerald Palace' | 'Ivory Gold' | string;
  hashtag: string;
  totalBudget: number;
}

export type RsvpStatus = 'attending' | 'declined' | 'pending' | 'tentative';
export type FamilySide = 'bride' | 'groom' | 'both';
export type MealPreference = 'veg' | 'non-veg' | 'jain' | 'vegan' | 'non_veg';

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  familySide: FamilySide;
  relation: string;
  category?: string;
  membersCount: number;
  eventsInvited?: string[];
  invitedEvents?: string[];
  rsvpStatus: RsvpStatus;
  mealPreference: MealPreference | string;
  invitationSent?: boolean;
  specialDietaryNotes?: string;
  accommodationRequired: boolean;
  assignedHotel?: string;
  assignedRoom?: string;
  transportRequired: boolean;
  pickupRequired?: boolean;
  arrivalDateTime?: string;
  departureDateTime?: string;
  flightOrTrainNumber?: string;
  tableNumber?: string;
  notes?: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  generation: 'grandparents' | 'parents' | 'couple_and_siblings' | 'kids';
  familySide: FamilySide;
  phone: string;
  email?: string;
  avatar?: string;
  events: string[];
  rsvpStatus: RsvpStatus;
  accommodationRequired: boolean;
  assignedRoom?: string;
  transportRequired: boolean;
  parentId?: string;
}

export interface WeddingEvent {
  id: string;
  name: string;
  eventType: 'haldi' | 'mehendi' | 'sangeet' | 'wedding' | 'reception' | 'engagement' | 'cocktail' | 'custom' | string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  locationDetails: string;
  description: string;
  dressCode: string;
  guestCount: number;
  assignedVendors: string[];
  assignedTasks: string[];
  mealPlanId?: string;
  budgetAllocated: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  coverImage?: string;
}

export interface InvitationTemplate {
  id: string;
  name: string;
  style?: 'traditional' | 'royal' | 'minimal' | 'modern';
  theme?: string;
  themeColor?: string;
  accentColor?: string;
  coverImage?: string;
  title?: string;
  quote?: string;
  backgroundClass?: string;
  fontFamily?: string;
}

export interface Invitation {
  id: string;
  guestId: string;
  guestName: string;
  phone: string;
  templateId: string;
  status: 'draft' | 'sent' | 'delivered' | 'opened' | 'responded' | 'failed';
  sentVia: 'whatsapp' | 'email' | 'sms' | 'printed';
  sentAt?: string;
  openedAt?: string;
  respondedAt?: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  phone: string;
  distanceFromVenue: string;
  totalRooms: number;
  allocatedRooms: number;
  contactPerson: string;
  amenities: string[];
}

export type RoomStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export interface Room {
  id: string;
  hotelId?: string;
  hotelName: string;
  roomNumber: string;
  roomType: 'Deluxe Suite' | 'Royal Heritage Room' | 'Executive Room' | 'Villa' | 'Family Suite' | 'standard' | 'deluxe' | 'suite' | 'villa' | string;
  capacity: number;
  floor?: string;
  wing?: string;
  status: RoomStatus;
  checkInDate: string;
  checkOutDate: string;
  assignedGuestIds?: string[];
  assignedGuestNames?: string[];
  notes?: string;
}

export type VehicleType =
  | 'Sedan (BMW/Mercedes)'
  | 'Innova Crysta'
  | 'Tempo Traveller (16 Seater)'
  | 'Luxury Coach (40 Seater)'
  | 'Vintage Car (Baraat)'
  | 'innova'
  | 'bmw'
  | 'coach'
  | string;

export interface Vehicle {
  id: string;
  name?: string;
  type?: VehicleType;
  model?: string;
  vehicleNumber?: string;
  numberPlate?: string;
  vehicleType?: VehicleType;
  driverName: string;
  driverPhone: string;
  capacity?: number;
  seatingCapacity?: number;
  status?: 'available' | 'in_transit' | 'scheduled' | 'maintenance';
  isAvailable?: boolean;
  currentDuty?: string;
}

export type TripStatus = 'scheduled' | 'en_route' | 'completed' | 'delayed';

export interface TransportTrip {
  id: string;
  vehicleId: string;
  vehicleName?: string;
  vehicleType?: string;
  tripType?: 'pickup' | 'drop' | 'inter-venue';
  pickupLocation?: string;
  dropLocation?: string;
  pickupPoint?: string;
  dropPoint?: string;
  pickupTime?: string;
  flightOrTrainNumber?: string;
  scheduledTime?: string;
  assignedGuestNames?: string[];
  passengerNames?: string[];
  passengerIds?: string[];
  passengerCount?: number;
  status: TripStatus;
  driverName: string;
  driverPhone: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  dietType: 'veg' | 'non-veg' | 'jain' | 'vegan';
  description?: string;
  liveCounter?: boolean;
}

export interface MealPlan {
  id: string;
  mealName: string;
  linkedEventName: string;
  catererName: string;
  headcount: number;
  vegCount: number;
  jainCount: number;
  nonVegCount: number;
  specialInstructions?: string;
  menuItems: MenuItem[];
}

export interface EventMealPlan {
  id: string;
  eventId?: string;
  eventName?: string;
  mealName?: string;
  linkedEventName?: string;
  catererName?: string;
  headcount?: number;
  mealType?: 'Breakfast' | 'Lunch' | 'High Tea & Snacks' | 'Royal Dinner' | 'Midnight Bites';
  time?: string;
  venue?: string;
  expectedHeadcount?: number;
  confirmedCount?: number;
  vegCount: number;
  nonVegCount: number;
  jainCount: number;
  veganCount?: number;
  specialInstructions?: string;
  menuHighlights?: string[];
  menuItems?: MenuItem[];
  cateringVendor?: string;
  specialArrangements?: string;
}

export type VendorCategory =
  | 'Venue'
  | 'Catering'
  | 'Photography'
  | 'Videography'
  | 'Decoration'
  | 'Makeup & Styling'
  | 'Makeup & Mehendi'
  | 'Music & DJ'
  | 'DJ & Music'
  | 'Priest / Pandit Ji'
  | 'Choreographer'
  | 'Fireworks & Dhol'
  | 'Clothing & Styling'
  | 'Entertainment'
  | 'Transport'
  | 'Invitations'
  | 'Mehendi Artist'
  | 'Other'
  | string;

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  rating?: number;
  contactPerson: string;
  phone: string;
  email?: string;
  location?: string;
  priceRange?: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  packageAmount?: number;
  paidAmount?: number;
  totalCost?: number;
  advancePaid?: number;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'advance_paid';
  contractStatus?: 'signed' | 'review' | 'pending';
  deliverables?: string[];
  assignedEvents?: string[];
  notes?: string;
  portfolioSamples?: string[];
}

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'overdue';

export interface Task {
  id: string;
  title: string;
  category:
    | 'Venue'
    | 'Catering'
    | 'Decoration'
    | 'Photography'
    | 'Makeup'
    | 'Clothing'
    | 'Invitations'
    | 'Travel'
    | 'Accommodation'
    | 'Entertainment'
    | 'Rituals'
    | string;
  assignedTo: string;
  assignedRole: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  notes?: string;
  eventId?: string;
}

export interface Expense {
  id: string;
  category: string;
  title: string;
  vendorName?: string;
  amount: number;
  paymentStatus: 'paid' | 'partial' | 'pending' | 'advance_paid';
  paymentDate?: string;
  paidDate?: string;
  paymentMode?: 'Bank Transfer' | 'UPI' | 'Cheque' | 'Cash' | 'Credit Card' | string;
  paymentMethod?: string;
  paidBy?: string;
  receiptUrl?: string;
  notes?: string;
}

export interface WeddingDocument {
  id: string;
  title: string;
  category: 'Contracts' | 'Vendor Documents' | 'Invitations' | 'Bills & Invoices' | 'Hotel Vouchers' | 'Travel Proofs' | 'Contract' | 'ID Proof' | 'Ticket' | 'Moodboard' | 'Invoice' | 'Puja List' | 'Script' | 'Other' | string;
  fileType: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy?: string;
  url?: string;
}

export interface NotificationItem {
  id: string;
  type: 'rsvp' | 'event' | 'task' | 'payment' | 'accommodation' | 'transport' | 'alert' | 'success' | string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  linkTab?: ActiveTab;
}
