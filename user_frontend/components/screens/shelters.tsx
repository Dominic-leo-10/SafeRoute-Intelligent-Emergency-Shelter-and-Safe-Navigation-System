'use client';

import { useEffect, useState } from 'react';
import { Navigation2, Users, MapPin } from 'lucide-react';

interface Shelter {
  _id: string;
  name: string;
  district?: string;
  status: string;
  capacity_total: number;
  capacity_current: number;

  location: {
    latitude: number;
    longitude: number;
  };
}

export default function SheltersScreen() {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await fetch(
          'http://localhost:5000/api/shelters'
        );

        const json = await res.json();

        setShelters(json.data || []);
      } catch (err) {
        console.error('Failed to fetch shelters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShelters();
  }, []);

  const getStatusColor = (status: string) => {
    const normalized = status.toLowerCase();

    switch (normalized) {
      case 'open':
        return {
          bg: 'bg-[#10b981]/20',
          text: 'text-[#10b981]',
        };

      case 'nearly-full':
        return {
          bg: 'bg-[#f59e0b]/20',
          text: 'text-[#f59e0b]',
        };

      case 'full':
        return {
          bg: 'bg-[#ef4444]/20',
          text: 'text-[#ef4444]',
        };

      default:
        return {
          bg: 'bg-[#6b7280]/20',
          text: 'text-[#6b7280]',
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-4 text-white">
        Loading shelters...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          Shelters
        </h1>

        <p className="text-[#9ca3af] text-sm">
          {shelters.length} available nearby
        </p>
      </div>

      {/* Shelter Cards */}
      <div className="space-y-3 pb-4">
        {shelters.map((shelter) => {
          const colors = getStatusColor(
            shelter.status
          );

          const occupancyPercent =
            (shelter.capacity_current /
              shelter.capacity_total) *
            100;

          return (
            <div
              key={shelter._id}
              className="bg-[#1a1a1a] border border-[#374151] rounded-xl p-4 hover:border-[#3b82f6] transition-all"
            >
              {/* Name + Status */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">
                    {shelter.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-1 text-[#9ca3af] text-xs">
                    <MapPin size={14} />
                    <span>
                      {shelter.district ??
                        'Tamil Nadu'}
                    </span>
                  </div>
                </div>

                <span
                  className={`${colors.bg} ${colors.text} px-3 py-1 rounded-full text-xs font-medium`}
                >
                  {shelter.status}
                </span>
              </div>

              {/* Occupancy */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2 text-sm text-[#d1d5db]">
                    <Users size={16} />

                    <span>
                      {shelter.capacity_current}/
                      {shelter.capacity_total}
                    </span>
                  </div>

                  <span className="text-xs text-[#9ca3af]">
                    {Math.round(
                      occupancyPercent
                    )}
                    %
                  </span>
                </div>

                <div className="w-full bg-[#374151] rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      occupancyPercent >= 95
                        ? 'bg-[#ef4444]'
                        : occupancyPercent >= 80
                        ? 'bg-[#f59e0b]'
                        : 'bg-[#10b981]'
                    }`}
                    style={{
                      width: `${Math.min(
                        occupancyPercent,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Navigate */}
              <button
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps?q=${shelter.location.latitude},${shelter.location.longitude}`,
                    '_blank'
                  );
                }}
              >
                <Navigation2 size={18} />
                Navigate
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}