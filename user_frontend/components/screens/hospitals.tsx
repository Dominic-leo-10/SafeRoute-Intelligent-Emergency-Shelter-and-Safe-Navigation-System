'use client';

import { useEffect, useState } from 'react';
import {
  Navigation2,
  MapPin,
  Wind,
} from 'lucide-react';

interface Hospital {
  _id: string;
  name: string;
  district?: string;

  availableBeds: number;
  icuAvailable: number;
  oxygenAvailable: boolean;

  location?: {
    latitude: number;
    longitude: number;
  };
}

const BedStatus = ({
  count,
}: {
  count: number;
}) => {
  return (
    <span
      className={`font-semibold ${
        count > 5
          ? 'text-[#10b981]'
          : count > 0
          ? 'text-[#f59e0b]'
          : 'text-[#ef4444]'
      }`}
    >
      {count}{' '}
      {count === 1
        ? 'bed'
        : 'beds'}
    </span>
  );
};

export default function HospitalsScreen() {
  const [hospitals, setHospitals] =
    useState<Hospital[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchHospitals =
      async () => {
        try {
          const res =
            await fetch(
              'http://localhost:5000/api/hospitals'
            );

          const json =
            await res.json();

          setHospitals(
            json.data || []
          );
        } catch (err) {
          console.error(
            'Failed to fetch hospitals:',
            err
          );
        } finally {
          setLoading(false);
        }
      };

    fetchHospitals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-4 text-white">
        Loading hospitals...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          Hospitals
        </h1>

        <p className="text-[#9ca3af] text-sm">
          {
            hospitals.length
          }{' '}
          hospitals nearby
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-3 pb-4">
        {hospitals.map(
          (hospital) => (
            <div
              key={
                hospital._id
              }
              className="bg-[#1a1a1a] border border-[#374151] rounded-xl p-4 hover:border-[#3b82f6] transition-all"
            >
              {/* Name */}
              <div className="mb-3">
                <h3 className="text-white font-semibold text-lg">
                  {
                    hospital.name
                  }
                </h3>

                <div className="flex items-center gap-1 mt-1 text-[#9ca3af] text-xs">
                  <MapPin
                    size={14}
                  />
  
                  <span>
                    {hospital.district ??
                      'Tamil Nadu'}
                  </span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Emergency Beds */}
                <div className="bg-[#374151]/30 rounded-lg p-3">
                  <p className="text-[#9ca3af] text-xs font-medium mb-1">
                    Emergency
                    Beds
                  </p>

                  <p className="text-white text-sm">
                    <BedStatus
                      count={
                        hospital.availableBeds
                      }
                    />
                  </p>
                </div>

                {/* ICU */}
                <div className="bg-[#374151]/30 rounded-lg p-3">
                  <p className="text-[#9ca3af] text-xs font-medium mb-1">
                    ICU Beds
                  </p>

                  <p className="text-white text-sm">
                    <BedStatus
                      count={
                        hospital.icuAvailable
                      }
                    />
                  </p>
                </div>

                {/* Oxygen */}
                <div className="col-span-2 bg-[#374151]/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wind
                      size={16}
                      className={
                        hospital.oxygenAvailable
                          ? 'text-[#10b981]'
                          : 'text-[#ef4444]'
                      }
                    />

                    <span className="text-[#9ca3af] text-xs font-medium">
                      Oxygen
                    </span>
                  </div>

                  <span
                    className={`font-semibold text-sm ${
                      hospital.oxygenAvailable
                        ? 'text-[#10b981]'
                        : 'text-[#ef4444]'
                    }`}
                  >
                    {hospital.oxygenAvailable
                      ? 'Available'
                      : 'Limited'}
                  </span>
                </div>
              </div>

              {/* Navigate */}
              <button
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  if (
                    hospital.location
                  ) {
                    window.open(
                      `https://www.google.com/maps?q=${hospital.location.latitude},${hospital.location.longitude}`,
                      '_blank'
                    );
                  }
                }}
              >
                <Navigation2
                  size={18}
                />
                Navigate
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}