'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Users,
  Stethoscope,
  AlertCircle,
} from 'lucide-react';

interface Shelter {
  _id: string;
  name: string;
  district?: string;
  status: string;
  capacity_total: number;
  capacity_current: number;
}

interface Hospital {
  _id: string;
  name: string;
  district?: string;
  availableBeds: number;
  icuAvailable: number;
}

export default function HomeScreen() {
  const [shelter, setShelter] =
    useState<Shelter | null>(null);

  const [hospital, setHospital] =
    useState<Hospital | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        /* SHELTERS */
       const shelterRes = await fetch(
  'http://localhost:5000/api/shelters'
);

const shelterText =
  await shelterRes.text();

console.log(
  "Shelter response:",
  shelterText
);

const shelterJson =
  JSON.parse(shelterText);

        if (
          shelterJson.data &&
          shelterJson.data.length > 0
        ) {
          setShelter(
            shelterJson.data[0]
          );
        }

        /* HOSPITALS */
       const hospitalRes =
  await fetch(
    'http://localhost:5000/api/hospitals'
  );

const hospitalText =
  await hospitalRes.text();

console.log(
  "Hospital response:",
  hospitalText
);

const hospitalJson =
  JSON.parse(hospitalText);

        if (
          hospitalJson.data &&
          hospitalJson.data.length > 0
        ) {
          setHospital(
            hospitalJson.data[0]
          );
        }
      } catch (err) {
        console.error(
          'Failed to fetch home data:',
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-4 text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          SafeRoute
        </h1>

        <p className="text-[#9ca3af] text-sm">
          Emergency Response System
        </p>
      </div>

      {/* Disaster Card */}
      <div className="mb-4 bg-[#1a1a1a] border border-[#374151] rounded-xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle
              className="text-[#f59e0b]"
              size={24}
            />

            <div>
              <h2 className="text-white font-semibold">
                Disaster Alert
              </h2>

              <p className="text-[#9ca3af] text-xs">
                Tamil Nadu Region
              </p>
            </div>
          </div>

          <span className="bg-[#f59e0b]/20 text-[#f59e0b] px-3 py-1 rounded-full text-xs font-medium">
            Active
          </span>
        </div>

        <p className="text-[#d1d5db] text-sm">
          Stay alert and monitor
          nearby shelters and
          hospitals during
          emergencies.
        </p>
      </div>

      {/* Nearby Shelter */}
      {shelter && (
        <div className="mb-4 bg-[#1a1a1a] border border-[#374151] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <AlertCircle
              size={18}
              className="text-[#3b82f6]"
            />
            Nearby Shelter
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white font-medium">
                  {shelter.name}
                </p>

                <p className="text-[#9ca3af] text-xs mt-1">
                  {shelter.district ??
                    'Tamil Nadu'}
                </p>
              </div>

              <span className="bg-[#10b981]/20 text-[#10b981] px-2 py-1 rounded text-xs font-medium">
                {shelter.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#d1d5db]">
              <Users size={16} />

              <span>
                Capacity:{' '}
                {
                  shelter.capacity_current
                }
                /
                {
                  shelter.capacity_total
                }
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Nearby Hospital */}
      {hospital && (
        <div className="mb-6 bg-[#1a1a1a] border border-[#374151] rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Stethoscope
              size={18}
              className="text-[#ef4444]"
            />
            Nearby Hospital
          </h3>

          <div className="space-y-2">
            <div>
              <p className="text-white font-medium">
                {hospital.name}
              </p>

              <p className="text-[#9ca3af] text-xs mt-1">
                {hospital.district ??
                  'Tamil Nadu'}
              </p>
            </div>

            <div className="space-y-1 text-sm text-[#d1d5db]">
              <div className="flex items-center gap-2">
                <span>
                  Emergency Beds:
                </span>

                <span className="text-[#10b981] font-semibold">
                  {
                    hospital.availableBeds
                  }{' '}
                  Available
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>
                  ICU Beds:
                </span>

                <span className="text-[#ef4444] font-semibold">
                  {
                    hospital.icuAvailable
                  }{' '}
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SOS Button */}
      <div className="mb-4">
        <button className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-6 px-6 rounded-xl transition-colors text-lg">
          SEND SOS
        </button>
      </div>

      {/* Safety Tips */}
      <div className="bg-[#1a1a1a] border border-[#374151] rounded-xl p-4 mb-4">
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <AlertCircle
            size={18}
            className="text-[#3b82f6]"
          />
          Safety Tips
        </h3>

        <ul className="space-y-2 text-sm text-[#d1d5db]">
          <li className="flex gap-2">
            <span className="text-[#3b82f6] font-bold">
              •
            </span>
            Move to high ground
          </li>

          <li className="flex gap-2">
            <span className="text-[#3b82f6] font-bold">
              •
            </span>
            Stay away from flooded
            areas
          </li>

          <li className="flex gap-2">
            <span className="text-[#3b82f6] font-bold">
              •
            </span>
            Keep emergency
            contacts ready
          </li>

          <li className="flex gap-2">
            <span className="text-[#3b82f6] font-bold">
              •
            </span>
            Listen to official
            updates
          </li>
        </ul>
      </div>
    </div>
  );
}