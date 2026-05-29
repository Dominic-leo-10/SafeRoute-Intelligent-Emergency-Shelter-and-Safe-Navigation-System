'use client';

import { useState } from 'react';
import { Home, Shield, AlertOctagon, Hospital, Bell } from 'lucide-react';
import HomeScreen from '@/components/screens/home';
import SheltersScreen from '@/components/screens/shelters';
import SosScreen from '@/components/screens/sos';
import HospitalsScreen from '@/components/screens/hospitals';
import AlertsScreen from '@/components/screens/alerts';

export default function SafeRoute() {
  const [activeTab, setActiveTab] = useState('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'shelters':
        return <SheltersScreen />;
      case 'sos':
        return <SosScreen />;
      case 'hospitals':
        return <HospitalsScreen />;
      case 'alerts':
        return <AlertsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0f0f0f] text-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#374151] flex justify-around items-center h-20 max-w-full">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === 'home' ? 'text-[#3b82f6]' : 'text-[#6b7280] hover:text-white'
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => setActiveTab('shelters')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === 'shelters' ? 'text-[#3b82f6]' : 'text-[#6b7280] hover:text-white'
          }`}
        >
          <Shield size={24} />
          <span className="text-xs font-medium">Shelters</span>
        </button>
        <button
          onClick={() => setActiveTab('sos')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === 'sos' ? 'text-[#ef4444]' : 'text-[#6b7280] hover:text-white'
          }`}
        >
          <AlertOctagon size={24} />
          <span className="text-xs font-medium">SOS</span>
        </button>
        <button
          onClick={() => setActiveTab('hospitals')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === 'hospitals' ? 'text-[#3b82f6]' : 'text-[#6b7280] hover:text-white'
          }`}
        >
          <Hospital size={24} />
          <span className="text-xs font-medium">Hospitals</span>
        </button>
        <button
          onClick={() => setActiveTab('alerts')}
          className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${
            activeTab === 'alerts' ? 'text-[#3b82f6]' : 'text-[#6b7280] hover:text-white'
          }`}
        >
          <Bell size={24} />
          <span className="text-xs font-medium">Alerts</span>
        </button>
      </nav>
    </div>
  );
}
