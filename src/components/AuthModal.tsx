'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  X,
  User,
  Mail,
  Lock,
  Phone,
  KeyRound,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    login,
    loginWithOTP,
    loginAsDemoUser,
    signup,
  } = useCart();

  const [mode, setMode] = useState<'login' | 'signup'>(authModalMode);
  const [loginType, setLoginType] = useState<'email' | 'otp'>('email');

  // Form States
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  // OTP Login States
  const [otpPhone, setOtpPhone] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);

  // Signup States
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleEmailLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    login(emailOrPhone, password);
  };

  const handleSendOTP = () => {
    if (!otpPhone.trim()) return;
    setOtpSent(true);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithOTP(`+91 ${otpPhone}`, otpCode);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail) return;
    signup(signupName, signupEmail, signupPhone || '+91 98765 43210', signupPassword);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-xl border border-stone-200 max-w-md w-full overflow-hidden relative">
        {/* Header */}
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                {mode === 'login' ? 'Welcome to ShopVibe' : 'Create Account'}
              </h3>
              <p className="text-xs text-stone-500">
                {mode === 'login' ? 'Sign in to access your orders & profile' : 'Join thousands of happy shoppers across India'}
              </p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-200 bg-stone-100/60 p-1">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Register / Sign Up
          </button>
        </div>

        <div className="p-6">
          {mode === 'login' ? (
            <div>
              {/* Login Method Toggle */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100 text-xs">
                <span className="font-semibold text-stone-600">Login Method:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginType('email')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                      loginType === 'email'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Email / Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginType('otp')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors ${
                      loginType === 'otp'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    Mobile OTP 📲
                  </button>
                </div>
              </div>

              {loginType === 'email' ? (
                /* Standard Email Form */
                <form onSubmit={handleEmailLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Email Address or Mobile
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="rahul.sharma@example.com"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                      />
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                      />
                      <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                /* Mobile OTP Form */
                <form onSubmit={handleVerifyOTP} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Mobile Number (+91)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="tel"
                          required
                          value={otpPhone}
                          onChange={(e) => setOtpPhone(e.target.value)}
                          placeholder="9876543210"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      </div>
                      {!otpSent ? (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-all"
                        >
                          Get OTP
                        </button>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 self-center">
                          <CheckCircle2 className="w-4 h-4" /> Sent
                        </span>
                      )}
                    </div>
                  </div>

                  {otpSent && (
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Enter 4-Digit OTP Code
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          maxLength={4}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="1234"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-center tracking-widest font-mono font-bold text-sm text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                        />
                        <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      </div>
                      <p className="text-[10px] text-stone-400 mt-1">Simulated test OTP is 1234</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!otpSent}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Verify & Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Demo 1-Click Login Section */}
              <div className="mt-6 pt-4 border-t border-stone-200">
                <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-Click Demo Accounts:</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => loginAsDemoUser('customer')}
                    className="bg-stone-100 hover:bg-emerald-50 hover:border-emerald-300 border border-stone-200 p-2.5 rounded-xl text-left text-xs transition-all"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-stone-800">
                      <User className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Rahul Sharma</span>
                    </div>
                    <span className="text-[10px] text-stone-500 block -mt-0.5">Demo Customer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => loginAsDemoUser('admin')}
                    className="bg-amber-50/60 hover:bg-amber-100 border border-amber-200 p-2.5 rounded-xl text-left text-xs transition-all"
                  >
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Priya Verma</span>
                    </div>
                    <span className="text-[10px] text-amber-700 block -mt-0.5">Demo Admin</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Register Form */
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Vikram Patel"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="vikram@example.com"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Mobile Number (+91)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all mt-2"
              >
                <span>Create ShopVibe Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
