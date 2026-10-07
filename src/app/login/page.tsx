'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotificationToast from '@/components/NotificationToast';
import { useCart } from '@/context/CartContext';
import {
  User,
  Mail,
  Lock,
  Phone,
  KeyRound,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';

export default function LoginPage() {
  const { user, login, loginWithOTP, loginAsDemoUser, signup, logout } = useCart();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [loginType, setLoginType] = useState<'email' | 'otp'>('email');

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const [otpPhone, setOtpPhone] = useState('9876543210');
  const [otpCode, setOtpCode] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

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
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex items-center justify-center">
        <div className="max-w-md w-full">
          {user ? (
            /* Logged In State Card */
            <div className="bg-white rounded-2xl shadow-md border border-stone-200 p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-2xl mx-auto border-2 border-emerald-300">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900">Signed In as {user.name}</h2>
                <p className="text-xs text-stone-500">{user.email}</p>
                <span className="inline-block mt-2 text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                  {user.role} Account
                </span>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
                <Link
                  href="/"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>

                <Link
                  href="/profile"
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>View Account Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-rose-600 hover:bg-rose-50 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            /* Login / Register Card */
            <div className="bg-white rounded-2xl shadow-lg border border-stone-200 overflow-hidden">
              {/* Header */}
              <div className="bg-stone-100/70 p-6 border-b border-stone-200 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-black text-stone-900">
                  {mode === 'login' ? 'Customer Sign In' : 'Create ShopVibe Account'}
                </h1>
                <p className="text-xs text-stone-500 mt-1">
                  Access your cart, wishlist, track orders & exclusive discounts
                </p>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-stone-200 bg-stone-50 p-1.5">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'login'
                      ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                    mode === 'signup'
                      ? 'bg-white text-stone-900 shadow-sm border border-stone-200'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  New Account
                </button>
              </div>

              <div className="p-6">
                {mode === 'login' ? (
                  <div>
                    {/* Method Selector */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100 text-xs">
                      <span className="font-semibold text-stone-600">Login Method:</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setLoginType('email')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                            loginType === 'email'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                        >
                          Email & Password
                        </button>
                        <button
                          type="button"
                          onClick={() => setLoginType('otp')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
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
                      <form onSubmit={handleEmailLoginSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            Email Address or Phone
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              value={emailOrPhone}
                              onChange={(e) => setEmailOrPhone(e.target.value)}
                              placeholder="rahul.sharma@example.com"
                              className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
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
                              className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 focus:bg-white"
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
                                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-800"
                              />
                              <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                            </div>
                            {!otpSent ? (
                              <button
                                type="button"
                                onClick={handleSendOTP}
                                className="bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-2.5 rounded-xl text-xs font-bold"
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
                                className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-center tracking-widest font-mono font-bold text-sm text-stone-800"
                              />
                              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                            </div>
                            <p className="text-[10px] text-stone-400 mt-1">Simulated test OTP is 1234</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={!otpSent}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                        >
                          <span>Verify & Login</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}

                    {/* Quick Demo Login Buttons */}
                    <div className="mt-6 pt-4 border-t border-stone-200">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 mb-2.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Instant Demo Login:</span>
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
                          <span className="text-[10px] text-stone-500 block -mt-0.5">Customer Demo</span>
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
                          <span className="text-[10px] text-amber-700 block -mt-0.5">Admin Demo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Register */
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
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
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
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
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
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
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
                          placeholder="Create password"
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl py-2 pl-9 pr-3 text-xs text-stone-800"
                        />
                        <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all mt-2"
                    >
                      <span>Register New Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <NotificationToast />
    </div>
  );
}
