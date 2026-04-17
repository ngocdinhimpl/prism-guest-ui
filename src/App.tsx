/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, ChevronLeft, Volume2, Loader2 } from 'lucide-react';
import bgImage from './bg.png';

const LANGUAGES = [
  { id: 'en', label: 'English' },
];

type Step = 'welcome' | 'pwa-guide' | 'language' | 'audio-settings' | 'loading' | 'content' | 'finished';

export default function App() {
  const [step, setStep] = useState<Step>('welcome');
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [audioOn, setAudioOn] = useState<boolean>(true);
  const [pwaPlatform, setPwaPlatform] = useState<'ios' | 'android'>('ios');

  useEffect(() => {
    if (step === 'loading') {
      const timer = setTimeout(() => {
        setStep('content');
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (step === 'content') {
      const timer = setTimeout(() => {
        setStep('finished');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleLanguageSubmit = () => {
    if (selectedLang) {
      setStep('audio-settings');
    }
  };

  const handleAudioSubmit = () => {
    setStep('loading');
  };

  const handleBack = () => {
    if (step === 'pwa-guide') setStep('welcome');
    if (step === 'language') setStep('welcome');
    if (step === 'audio-settings') setStep('language');
    if (step === 'loading') setStep('audio-settings');
    if (step === 'content') setStep('audio-settings');
    if (step === 'finished') setStep('content');
  };

  return (
    <div className={`min-h-screen font-sans flex flex-col overflow-x-hidden transition-colors duration-500 ${
      (step === 'content' || step === 'finished') ? 'bg-black' : 
      step === 'welcome' ? 'bg-transparent' : 'bg-white'
    }`}>
      {/* Welcome Background */}
      {step === 'welcome' && (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-white">
          <img 
            src={bgImage} 
            alt="Ainu Wood Carving" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
      )}
      {/* Header */}
      <header className="bg-[#f0f0f0] border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg 
              viewBox="0 0 100 60" 
              className="w-10 sm:w-12 h-auto text-[#444444]"
              fill="currentColor"
            >
              <path d="M10 50 L20 30 L30 50 L40 30 L50 50 L60 30 L70 50 L80 30 L90 50" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="10" y="50" width="80" height="4" />
              <rect x="15" y="10" width="70" height="4" />
            </svg>
            <div className="flex flex-col -space-y-1">
              <span className="text-xl sm:text-2xl font-bold tracking-tighter text-[#333333]">UPOPOY</span>
              <span className="text-[7px] sm:text-[8px] font-semibold text-[#666666] uppercase tracking-widest">National Ainu Museum and Park</span>
            </div>
          </div>

          {step !== 'welcome' && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleBack}
              className="px-6 py-2 border-2 border-[#666666] text-[#666666] rounded-xl font-medium hover:bg-black/5 transition-colors flex items-center gap-2"
            >
              Back
            </motion.button>
          )}
        </div>
      </header>

      <main className={`flex-1 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative ${step === 'loading' ? 'pb-0' : ''}`}>
        <AnimatePresence mode="wait">
          {step === 'welcome' ? (
            <motion.div 
              key="welcome-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col items-center"
            >
              <div className="w-full max-w-2xl flex flex-col items-center text-center pt-8 pb-32">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1a1a1a] mb-8 leading-tight px-4 tracking-tight">
                  National Ainu Museum and Park
                </h1>
                <p className="text-lg sm:text-xl text-[#222222] leading-relaxed font-medium px-6 max-w-3xl text-justify">
                  Upopoy (National Ainu Museum and Park) is Japan’s first national museum dedicated entirely to the Ainu, the indigenous people of northern Japan. Located in Shiraoi, Hokkaido, it serves as a dynamic center for the preservation and revitalization of Ainu history, culture, and language.
                  <br /><br />
                  <span className="font-bold">Key Highlights:</span>
                  <br />
                  • <span className="font-bold">The Name:</span> In the Ainu language, "Upopoy" beautifully translates to "singing together in a large group".
                  <br />
                  • <span className="font-bold">The Museum:</span> Features comprehensive, modern exhibits showcasing Ainu lifestyle, spiritual beliefs, tools, and traditional crafts.
                  <br />
                  • <span className="font-bold">The Park:</span> An interactive outdoor space recreating a traditional Ainu village (kotan). Here, visitors can experience authentic indigenous dances, musical performances, and hands-on cultural workshops.
                  <br />
                  • <span className="font-bold">Living Language:</span> Upopoy plays a vital role in keeping the endangered Ainu language alive by actively using it for signage, greetings (like "Irankarapte" - Hello), and storytelling throughout the facility.
                  <br /><br />
                  Ultimately, Upopoy is not just a place to observe history, but a living cultural hub designed to ensure the rich Ainu heritage continues to thrive for future generations.
                </p>
              </div>

              {/* Fixed Bottom Buttons */}
              <div className="fixed bottom-10 left-0 right-0 flex justify-center px-4 z-20">
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px] sm:max-w-xl">
                  <button 
                    onClick={() => setStep('pwa-guide')}
                    className="flex-1 h-[48px] min-h-[48px] max-h-[48px] bg-[#dcdcdc]/90 backdrop-blur-sm rounded-[16px] flex items-center justify-between px-6 hover:bg-[#d0d0d0] transition-colors group shadow-xl border border-white/20"
                  >
                    <span className="text-sm font-bold text-[#1a1a1a]">PWA install</span>
                    <svg className="w-5 h-5 text-[#1a1a1a]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>

                  <button 
                    onClick={() => setStep('language')}
                    className="flex-1 h-[48px] min-h-[48px] max-h-[48px] bg-[#333333]/90 backdrop-blur-sm rounded-[16px] flex items-center justify-between px-6 hover:bg-[#222222] transition-colors group shadow-xl border border-white/10"
                  >
                    <span className="text-sm font-bold text-white">Continue on web</span>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : step === 'pwa-guide' ? (
            <motion.div 
              key="pwa-guide-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl flex flex-col items-center"
            >
              <div className="text-center mb-8">
                <h2 className="text-[#333333] text-3xl font-bold mb-2">Install App</h2>
                <p className="text-[#666666] text-lg">Follow these steps to add to your home screen</p>
              </div>

              {/* Platform Switcher */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8 w-full max-w-xs">
                <button 
                  onClick={() => setPwaPlatform('ios')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${pwaPlatform === 'ios' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                >
                  iOS
                </button>
                <button 
                  onClick={() => setPwaPlatform('android')}
                  className={`flex-1 py-2 rounded-lg font-bold transition-all ${pwaPlatform === 'android' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}
                >
                  Android
                </button>
              </div>

              {/* Guide Content */}
              <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-10">
                {pwaPlatform === 'ios' ? (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</div>
                      <p className="text-lg text-gray-700">Tap the <span className="font-bold">Share</span> button in Safari (the square with an arrow pointing up).</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</div>
                      <p className="text-lg text-gray-700">Scroll down and select <span className="font-bold">"Add to Home Screen"</span>.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</div>
                      <p className="text-lg text-gray-700">Tap <span className="font-bold">"Add"</span> in the top right corner.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">1</div>
                      <p className="text-lg text-gray-700">Tap the <span className="font-bold">Menu</span> icon (three dots) in Chrome.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">2</div>
                      <p className="text-lg text-gray-700">Select <span className="font-bold">"Install app"</span> or <span className="font-bold">"Add to Home screen"</span>.</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold shrink-0">3</div>
                      <p className="text-lg text-gray-700">Follow the on-screen prompts to complete installation.</p>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => setStep('welcome')}
                className="w-full sm:w-auto sm:min-w-[200px] py-4 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all"
              >
                Got it!
              </button>
            </motion.div>
          ) : step === 'language' ? (
            <motion.div 
              key="language-step"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="w-full max-w-2xl flex flex-col items-center"
            >
              <div className="text-center mb-12">
                <h1 className="text-[#333333] text-2xl sm:text-3xl font-bold leading-tight mb-4">
                  Official Upopoy Audio Guide
                </h1>
                <p className="text-[#666666] text-lg sm:text-xl font-medium">
                  Please select your preferred language to continue.
                </p>
              </div>

              {/* Language Selection */}
              <div className="flex justify-center mb-12 w-full">
                {LANGUAGES.map((lang) => (
                  <motion.button
                    key={lang.id}
                    onClick={() => setSelectedLang(lang.id)}
                    className={`w-full sm:w-auto sm:min-w-[240px] py-4 px-10 rounded-2xl text-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      selectedLang === lang.id 
                        ? 'bg-[#444444] text-white ring-4 ring-[#444444]/20 scale-[1.02] shadow-md' 
                        : 'bg-[#f0f0f0] text-[#444444] hover:bg-[#e5e5e5] active:scale-95'
                    }`}
                  >
                    {lang.label}
                  </motion.button>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full">
                <motion.button
                  onClick={handleLanguageSubmit}
                  disabled={!selectedLang}
                  className={`w-full sm:w-auto sm:min-w-[240px] py-4 px-10 rounded-full text-xl font-bold transition-all shadow-lg ${
                    selectedLang 
                      ? 'bg-[#777777] text-white hover:bg-[#666666] hover:-translate-y-1 active:translate-y-0' 
                      : 'bg-[#cccccc] text-[#999999] cursor-not-allowed'
                  }`}
                >
                  Submit (送信)
                </motion.button>
              </div>
            </motion.div>
          ) : step === 'audio-settings' ? (
            <motion.div 
              key="audio-step"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-2xl flex flex-col items-center"
            >
              <div className="text-center mb-10">
                <h2 className="text-[#666666] text-2xl sm:text-3xl font-medium">
                  Do you want to play the translation audio?
                </h2>
              </div>

              {/* Test Button */}
              <div className="mb-10">
                <button className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#999999] flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition-colors group">
                  <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 text-[#666666] group-active:scale-110 transition-transform" />
                  <span className="text-[#666666] font-bold text-lg sm:text-xl">TEST</span>
                </button>
              </div>

              {/* ON/OFF Toggle */}
              <div className="flex gap-4 mb-12 w-full max-w-md">
                <button 
                  onClick={() => setAudioOn(true)}
                  className={`flex-1 py-4 rounded-full text-xl font-bold transition-all ${
                    audioOn 
                      ? 'bg-[#3b82f6] text-white shadow-lg scale-[1.02]' 
                      : 'bg-[#777777] text-white opacity-60 hover:opacity-100'
                  }`}
                >
                  ON
                </button>
                <button 
                  onClick={() => setAudioOn(false)}
                  className={`flex-1 py-4 rounded-full text-xl font-bold transition-all ${
                    !audioOn 
                      ? 'bg-[#777777] text-white shadow-lg scale-[1.02]' 
                      : 'bg-[#777777] text-white opacity-60 hover:opacity-100'
                  }`}
                >
                  OFF
                </button>
              </div>

              {/* Notes Box */}
              <div className="w-full border-2 border-[#999999] p-6 sm:p-8 rounded-lg text-center mb-12">
                <h3 className="text-[#666666] text-3xl sm:text-4xl font-bold mb-4">Notes</h3>
                <p className="text-[#666666] text-xl sm:text-2xl font-medium leading-relaxed">
                  Please use earphones to avoid disturbing other visitors.
                </p>
              </div>

              {/* Final Submit Button */}
              <div className="flex justify-center w-full">
                <motion.button
                  onClick={handleAudioSubmit}
                  className="w-full sm:w-auto sm:min-w-[240px] py-4 px-10 bg-[#777777] text-white rounded-full text-xl font-bold hover:bg-[#666666] hover:-translate-y-1 active:translate-y-0 transition-all shadow-lg"
                >
                  Submit
                </motion.button>
              </div>
            </motion.div>
          ) : step === 'loading' ? (
            <motion.div 
              key="loading-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-2xl flex-1 flex flex-col items-center justify-between pb-4 pt-12"
            >
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Custom Bar Spinner */}
                <div className="relative w-20 h-20 mb-8">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-[6px] h-[18px] bg-[#999999] rounded-full left-1/2 top-0 origin-[50%_40px]"
                      style={{
                        transform: `translateX(-50%) rotate(${i * 30}deg)`,
                        opacity: 1 - (i * 0.08),
                        animation: `fade 1.2s linear infinite`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                  <style>{`
                    @keyframes fade {
                      from { opacity: 1; }
                      to { opacity: 0.1; }
                    }
                  `}</style>
                </div>
                
                <h2 className="text-[#777777] text-4xl sm:text-5xl font-bold">
                  Please Wait...
                </h2>
              </div>

              {/* Bottom Logo - Pushed to the very bottom */}
              <div className="w-full flex flex-col items-center gap-4 mt-auto pb-2">
                <div className="flex items-center gap-4">
                  <svg 
                    viewBox="0 0 100 60" 
                    className="w-32 sm:w-48 h-auto text-[#003366]"
                    fill="currentColor"
                  >
                    <path d="M10 50 L20 30 L30 50 L40 30 L50 50 L60 30 L70 50 L80 30 L90 50" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="10" y="50" width="80" height="4" />
                    <rect x="15" y="10" width="70" height="4" />
                  </svg>
                  <div className="flex flex-col -space-y-2">
                    <span className="text-5xl sm:text-7xl font-bold tracking-tighter text-[#1a1a1a]">UPOPOY</span>
                    <span className="text-[10px] sm:text-[12px] font-medium text-[#333333] uppercase tracking-widest">National Ainu Museum and Park</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : step === 'content' ? (
            <motion.div 
              key="content-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-4xl flex flex-col text-white"
            >
              <div className="mb-8">
                <p className="text-xl font-medium mb-1">Proglam Title</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">Lorem Ipsum</h2>
                
                <p className="text-xl font-medium mb-1">Scene Title</p>
                <h3 className="text-3xl sm:text-4xl font-bold mb-8">Lorem Ipsum scene 2</h3>
                
                <div className="w-full h-[2px] bg-white/30 mb-10" />
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-2xl sm:text-3xl font-medium leading-[1.4] mb-8">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Bottom Controls */}
              <div className="mt-12 flex items-center justify-end">
                <button className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center gap-0 shadow-xl active:scale-95 transition-transform">
                  <Volume2 className="w-8 h-8 text-black" />
                  <span className="text-black font-bold text-xs">ON</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="finished-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-4xl flex flex-col items-center justify-center text-center text-white py-20"
            >
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                The presentation is finished.<br />
                Please continue to enjoy Upopoy.
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}



