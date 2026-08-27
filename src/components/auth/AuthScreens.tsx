import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Crown,
  Lock,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Image as ImageIcon,
  ArrowRight,
  ShieldCheck,
  Users,
  ChevronLeft,
  CheckCircle2,
  KeyRound,
  Eye,
  EyeOff,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useWedding } from '../../context/WeddingContext';
import { AuthScreen, UserRole, WeddingDetails } from '../../types';

export const AuthScreens: React.FC = () => {
  const {
    authScreen,
    setAuthScreen,
    wedding,
    updateWedding,
    activeRole,
    setActiveRole,
    setIsAuthenticated,
    showToast,
  } = useWedding();

  const [emailOrPhone, setEmailOrPhone] = useState('rakesh.kumar@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(['4', '8', '2', '9']);
  const [joinCode, setJoinCode] = useState('PRIYA-RAKESH-2026');

  // Create Wedding form state
  const [brideName, setBrideName] = useState('Priya Sharma');
  const [groomName, setGroomName] = useState('Rakesh Kumar');
  const [weddingDate, setWeddingDate] = useState('2026-11-28');
  const [weddingLocation, setWeddingLocation] = useState('The Oberoi Udaivilas & Jagmandir Island Palace, Udaipur');
  const [weddingCity, setWeddingCity] = useState('Udaipur, Rajasthan');
  const [weddingImage, setWeddingImage] = useState(
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80'
  );
  const [weddingTheme, setWeddingTheme] = useState<WeddingDetails['weddingTheme']>('Royal Rajasthani');
  const [hashtag, setHashtag] = useState('#PriyaRakeshKiShaadi');

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7A1C2E', '#D4AF37', '#F59E0B', '#B45309'],
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    setAuthScreen('authenticated');
    showToast(`Welcome back, ${brideName} & ${groomName}!`);
  };

  const handleCreateWedding = (e: React.FormEvent) => {
    e.preventDefault();
    updateWedding({
      brideName,
      groomName,
      weddingDate,
      weddingLocation,
      weddingCity,
      weddingImage,
      weddingTheme,
      hashtag,
    });
    triggerConfetti();
    setIsAuthenticated(true);
    setAuthScreen('authenticated');
    showToast('Shaadi setup complete! Welcome to your Wedding Dashboard.');
  };

  const handleJoinWedding = (e: React.FormEvent) => {
    e.preventDefault();
    triggerConfetti();
    setIsAuthenticated(true);
    setAuthScreen('authenticated');
    showToast(`Successfully joined ${wedding.brideName} & ${wedding.groomName}'s wedding portal!`);
  };

  // 1. Splash Screen
  if (authScreen === 'splash') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex flex-col items-center justify-center p-6 relative overflow-hidden text-stone-900">
        {/* Background Mandala & Ornaments */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#7A1C2E]/10 blur-3xl pointer-events-none" />

        <div className="max-w-md w-full text-center z-10 flex flex-col items-center">
          {/* Logo & Emblems */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#7A1C2E] via-[#8E1B38] to-[#B45309] flex items-center justify-center shadow-2xl ring-4 ring-[#D4AF37]/50 mb-6 animate-bounce duration-1000">
            <Sparkles className="w-10 h-10 text-amber-200" />
          </div>

          <span className="text-xs uppercase tracking-widest font-extrabold text-[#92400E] font-heading mb-2">
            Royal Indian Wedding Planner
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#2C1810] tracking-tight mb-3">
            ShaadiPlanner
          </h1>
          <p className="font-display italic text-lg sm:text-xl text-[#7A1C2E] max-w-sm mb-8 leading-relaxed">
            "Where timeless Indian traditions meet seamless modern wedding management."
          </p>

          {/* Action Buttons */}
          <div className="w-full space-y-3">
            <button
              onClick={() => {
                triggerConfetti();
                setIsAuthenticated(true);
                setAuthScreen('authenticated');
                showToast(`Welcome to ${wedding.brideName} & ${wedding.groomName}'s Wedding Planner!`);
              }}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-[#7A1C2E] to-[#5B1220] hover:from-[#661524] hover:to-[#480E1A] text-white font-semibold text-sm rounded-2xl shadow-xl shadow-[#7A1C2E]/20 flex items-center justify-center gap-2 border border-[#D4AF37]/40 transition-all transform active:scale-98"
            >
              <span>Explore Live Wedding Prototype</span>
              <ArrowRight className="w-4 h-4 text-amber-300" />
            </button>

            <button
              onClick={() => setAuthScreen('create-wedding')}
              className="w-full py-3 px-6 bg-white hover:bg-[#F2ECE0] text-[#7A1C2E] font-semibold text-sm rounded-2xl shadow-md border border-[#D4AF37]/50 flex items-center justify-center gap-2 transition-all"
            >
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <span>Create New Wedding</span>
            </button>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setAuthScreen('login')}
                className="py-2.5 px-4 bg-[#F2ECE0] hover:bg-[#E8DFD0] text-stone-800 text-xs font-semibold rounded-xl transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthScreen('join-wedding')}
                className="py-2.5 px-4 bg-[#F2ECE0] hover:bg-[#E8DFD0] text-stone-800 text-xs font-semibold rounded-xl transition-all"
              >
                Join as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Login Screen
  if (authScreen === 'login') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
        <div className="bg-[#FCFAF6] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#D4AF37]/40 max-w-md w-full text-stone-900">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#7A1C2E] text-amber-300 flex items-center justify-center mx-auto mb-3 shadow-md">
              <Crown className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#2C1810]">Welcome to ShaadiPlanner</h2>
            <p className="text-xs text-stone-500 mt-1">Sign in to manage ceremonies, guests & vendors</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  placeholder="name@email.com or +91 98200..."
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 font-heading">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setAuthScreen('forgot-password')}
                  className="text-xs text-[#7A1C2E] font-semibold hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white font-semibold text-sm rounded-xl shadow-md transition-all mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#EBE3D5] text-center space-y-3">
            <button
              onClick={() => setAuthScreen('otp-verification')}
              className="text-xs font-medium text-stone-600 hover:text-[#7A1C2E] flex items-center justify-center gap-1.5 mx-auto"
            >
              <Phone className="w-3.5 h-3.5" />
              Sign in with Instant Mobile OTP
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-stone-500">
              <span>New here?</span>
              <button
                onClick={() => setAuthScreen('register')}
                className="font-bold text-[#7A1C2E] hover:underline"
              >
                Register Free Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Register Screen
  if (authScreen === 'register') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
        <div className="bg-[#FCFAF6] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#D4AF37]/40 max-w-md w-full text-stone-900">
          <div className="text-center mb-6">
            <h2 className="font-heading text-2xl font-bold text-[#2C1810]">Create Planner Account</h2>
            <p className="text-xs text-stone-500 mt-1">Start planning your dream Indian wedding</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAuthScreen('create-wedding');
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Full Name
              </label>
              <input
                type="text"
                required
                defaultValue="Priya Sharma"
                className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                defaultValue="+91 99300 12345"
                className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Password
              </label>
              <input
                type="password"
                required
                defaultValue="password123"
                className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white font-semibold text-sm rounded-xl shadow-md transition-all mt-2"
            >
              Continue to Wedding Details →
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => setAuthScreen('login')}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Already have an account? <span className="font-bold text-[#7A1C2E]">Sign In</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. OTP Verification Screen
  if (authScreen === 'otp-verification') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
        <div className="bg-[#FCFAF6] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#D4AF37]/40 max-w-md w-full text-center text-stone-900">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#7A1C2E] flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-[#2C1810]">Verify OTP</h2>
          <p className="text-xs text-stone-500 mt-1 mb-6">
            We sent a 4-digit code to <span className="font-semibold text-stone-800">+91 98200 55660</span>
          </p>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const val = e.target.value;
                  setOtp((prev) => prev.map((d, idx) => (idx === i ? val : d)));
                }}
                className="w-12 h-14 text-center font-heading text-xl font-bold bg-white border-2 border-[#D4AF37]/50 rounded-2xl focus:border-[#7A1C2E] focus:ring-2 focus:ring-[#7A1C2E]/20 outline-none"
              />
            ))}
          </div>

          <button
            onClick={() => {
              setIsAuthenticated(true);
              setAuthScreen('authenticated');
              showToast('OTP verified successfully!');
            }}
            className="w-full py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white font-semibold text-sm rounded-xl shadow-md transition-all mb-4"
          >
            Verify & Enter Dashboard
          </button>

          <div className="flex items-center justify-between text-xs text-stone-500">
            <span>Didn't receive code?</span>
            <button
              onClick={() => showToast('New OTP sent: 4829', 'info')}
              className="font-bold text-[#7A1C2E] hover:underline"
            >
              Resend OTP (24s)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Forgot / Reset Password
  if (authScreen === 'forgot-password' || authScreen === 'reset-password') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
        <div className="bg-[#FCFAF6] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#D4AF37]/40 max-w-md w-full text-stone-900">
          <button
            onClick={() => setAuthScreen('login')}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Sign In
          </button>

          <h2 className="font-heading text-2xl font-bold text-[#2C1810] mb-1">Reset Password</h2>
          <p className="text-xs text-stone-500 mb-5">
            Enter your registered email or phone to receive reset instructions
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Email or Mobile
              </label>
              <input
                type="text"
                defaultValue="priya.sharma@gmail.com"
                className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
              />
            </div>

            <button
              onClick={() => {
                showToast('Reset password link dispatched via Email/SMS');
                setAuthScreen('login');
              }}
              className="w-full py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white font-semibold text-sm rounded-xl shadow-md transition-all"
            >
              Send Reset Instructions
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 6. Join Wedding Screen (Guest code)
  if (authScreen === 'join-wedding') {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex items-center justify-center p-4">
        <div className="bg-[#FCFAF6] rounded-3xl p-7 sm:p-9 shadow-2xl border border-[#D4AF37]/40 max-w-md w-full text-stone-900">
          <button
            onClick={() => setAuthScreen('splash')}
            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>

          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7A1C2E] to-[#D4AF37] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#2C1810]">Join Wedding Portal</h2>
            <p className="text-xs text-stone-500 mt-1">Enter your wedding invitation code or phone number</p>
          </div>

          <form onSubmit={handleJoinWedding} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Wedding Code / Invite ID
              </label>
              <input
                type="text"
                required
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="e.g. PRIYA-AMOL-2026"
                className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm font-mono uppercase focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Your Registered Mobile (for RSVP)
              </label>
              <input
                type="tel"
                defaultValue="+91 98201 44550"
                className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#7A1C2E] hover:bg-[#621423] text-white font-semibold text-sm rounded-xl shadow-md transition-all"
            >
              Access Guest Itinerary & RSVP →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 7. Create Wedding Screen
  if (authScreen === 'create-wedding') {
    const themeOptions: { id: WeddingDetails['weddingTheme']; name: string; color: string; desc: string }[] = [
      {
        id: 'Royal Rajasthani',
        name: 'Royal Rajasthani',
        color: 'from-[#7A1C2E] via-[#B45309] to-[#D4AF37]',
        desc: 'Deep crimson, gold filigree & Udaipur heritage vibe',
      },
      {
        id: 'Classic Crimson',
        name: 'Classic Crimson',
        color: 'from-[#881337] via-[#991B1B] to-[#F59E0B]',
        desc: 'Traditional Vedic red, marigold and brass accents',
      },
      {
        id: 'Modern Pastel',
        name: 'Modern Pastel',
        color: 'from-[#FBCFE8] via-[#FDE68A] to-[#A7F3D0]',
        desc: 'Soft blush pink, mint green and fairy lights',
      },
      {
        id: 'Emerald Palace',
        name: 'Emerald Palace',
        color: 'from-[#064E3B] via-[#047857] to-[#D4AF37]',
        desc: 'Regal emerald green with ivory and antique gold',
      },
    ];

    return (
      <div className="min-h-screen bg-[#FAF6F0] py-10 px-4 flex items-center justify-center">
        <div className="bg-[#FCFAF6] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#D4AF37]/40 max-w-2xl w-full text-stone-900">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EBE3D5]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#7A1C2E] text-amber-300 flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#2C1810]">
                  Create Your Wedding Platform
                </h2>
                <p className="text-xs text-stone-500">Configure your royal couple profile & event palette</p>
              </div>
            </div>
            <button
              onClick={() => setAuthScreen('splash')}
              className="text-xs font-semibold text-stone-500 hover:text-stone-800"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateWedding} className="space-y-5">
            {/* Bride & Groom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                  Bride's Full Name
                </label>
                <input
                  type="text"
                  required
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  placeholder="e.g. Priya Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                  Groom's Full Name
                </label>
                <input
                  type="text"
                  required
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  placeholder="e.g. Rakesh Kumar"
                />
              </div>
            </div>

            {/* Dates & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                  Wedding Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    required
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                  Destination City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={weddingCity}
                    onChange={(e) => setWeddingCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                    placeholder="e.g. Udaipur, Rajasthan"
                  />
                </div>
              </div>
            </div>

            {/* Venue & Hashtag */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                  Primary Venue
                </label>
                <input
                  type="text"
                  required
                  value={weddingLocation}
                  onChange={(e) => setWeddingLocation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  placeholder="e.g. The Oberoi Udaivilas"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                  Wedding Hashtag
                </label>
                <input
                  type="text"
                  required
                  value={hashtag}
                  onChange={(e) => setHashtag(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm font-semibold text-[#7A1C2E] focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                  placeholder="#PriyaRakeshKiShaadi"
                />
              </div>
            </div>

            {/* Wedding Cover Image URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5 font-heading">
                Cover Photo URL
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={weddingImage}
                  onChange={(e) => setWeddingImage(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2D8C6] rounded-xl text-sm focus:ring-2 focus:ring-[#7A1C2E]/20 focus:border-[#7A1C2E] outline-none"
                />
              </div>
            </div>

            {/* Wedding Theme Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-heading">
                Visual Theme & Decor Aesthetic
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {themeOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setWeddingTheme(opt.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      weddingTheme === opt.id
                        ? 'border-[#7A1C2E] bg-[#FAF0E1] ring-2 ring-[#7A1C2E]/30 shadow-xs'
                        : 'border-[#E8DFD0] bg-white/70 hover:bg-stone-50'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-tr ${opt.color} shrink-0 mt-0.5 border border-white shadow-xs`}
                    />
                    <div>
                      <div className="text-xs font-bold text-[#2C1810] flex items-center gap-1">
                        {opt.name}
                        {weddingTheme === opt.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#7A1C2E]" />}
                      </div>
                      <div className="text-[10px] text-stone-500 leading-tight mt-0.5">{opt.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-[#7A1C2E] to-[#591421] hover:from-[#661524] hover:to-[#480E1A] text-white font-semibold text-sm rounded-2xl shadow-xl shadow-[#7A1C2E]/20 border border-[#D4AF37]/50 flex items-center justify-center gap-2 transition-all transform active:scale-98"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Launch Wedding Platform Dashboard</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};
