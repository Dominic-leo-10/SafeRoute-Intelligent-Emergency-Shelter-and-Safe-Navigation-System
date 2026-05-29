'use client';

import { useEffect, useState } from 'react';
import {
  AlertOctagon,
  MapPin,
  Wifi,
  WifiOff,
  ChevronDown,
} from 'lucide-react';

export default function SosScreen() {
  const [disasterType, setDisasterType] =
    useState('flood');

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [sent, setSent] =
    useState(false);

  const [online, setOnline] =
    useState(true);

  const [location, setLocation] =
    useState<{
      lat: number;
      lon: number;
    } | null>(null);

  const disasterTypes = [
    {
      value: 'flood',
      label: 'Flood',
    },
    {
      value: 'earthquake',
      label: 'Earthquake',
    },
    {
      value: 'landslide',
      label: 'Landslide',
    },
    {
      value: 'storm',
      label: 'Storm',
    },
    {
      value: 'fire',
      label: 'Fire',
    },
    {
      value: 'other',
      label: 'Other Emergency',
    },
  ];

  /* Online / Offline */
  useEffect(() => {
    setOnline(
      navigator.onLine
    );

    const goOnline = () =>
      setOnline(true);

    const goOffline = () =>
      setOnline(false);

    window.addEventListener(
      'online',
      goOnline
    );

    window.addEventListener(
      'offline',
      goOffline
    );

    return () => {
      window.removeEventListener(
        'online',
        goOnline
      );

      window.removeEventListener(
        'offline',
        goOffline
      );
    };
  }, []);

  /* Location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat:
            position.coords
              .latitude,
          lon:
            position.coords
              .longitude,
        });
      },
      (err) => {
        console.error(
          'Location error:',
          err
        );
      }
    );
  }, []);

  /* SEND SOS */
  const handleSOS =
    async () => {
      try {
        if (!location) {
          alert(
            'Location not available'
          );
          return;
        }

        const payload =
          `SOS|ID=USR001|LAT=${location.lat}|LON=${location.lon}|TYPE=${disasterType.toUpperCase()}`;

        if (online) {
          /* Government backend */
          await fetch(
            'http://localhost:5000/sos',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify(
                {
                  payload,
                }
              ),
            }
          );
        } else {
          /* SMS Gateway */
          await fetch(
            'http://localhost:5050/sms-receiver',
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body: JSON.stringify(
                {
                  payload,
                }
              ),
            }
          );
        }

        setSent(true);

        setTimeout(() => {
          setSent(false);
        }, 3000);
      } catch (err) {
        console.error(
          'SOS failed:',
          err
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4 flex flex-col">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#ef4444] mb-2">
          EMERGENCY
        </h1>

        <p className="text-[#9ca3af] text-sm">
          Send immediate
          distress signal
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="bg-[#1a1a1a] border border-[#374151] rounded-xl p-4 mb-6">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <MapPin
                size={20}
                className="text-[#3b82f6]"
              />
              Current
              Location
            </h3>

            {location ? (
              <div className="space-y-2">
                <p className="text-[#d1d5db] text-sm">
                  <span className="text-[#9ca3af]">
                    Latitude:
                  </span>{' '}
                  {location.lat.toFixed(
                    4
                  )}
                </p>

                <p className="text-[#d1d5db] text-sm">
                  <span className="text-[#9ca3af]">
                    Longitude:
                  </span>{' '}
                  {location.lon.toFixed(
                    4
                  )}
                </p>
              </div>
            ) : (
              <p className="text-[#9ca3af] text-sm">
                Fetching
                location...
              </p>
            )}
          </div>

          {/* Dropdown */}
          <div className="mb-8">
            <label className="text-white font-semibold text-sm block mb-2">
              Disaster Type
            </label>

            <div className="relative">
              <button
                onClick={() =>
                  setShowDropdown(
                    !showDropdown
                  )
                }
                className="w-full bg-[#1a1a1a] border border-[#374151] rounded-lg p-4 text-white font-medium flex justify-between items-center"
              >
                <span>
                  {
                    disasterTypes.find(
                      (
                        d
                      ) =>
                        d.value ===
                        disasterType
                    )?.label
                  }
                </span>

                <ChevronDown
                  size={20}
                />
              </button>

              {showDropdown && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-[#1a1a1a] border border-[#374151] rounded-lg z-20">
                  {disasterTypes.map(
                    (
                      type
                    ) => (
                      <button
                        key={
                          type.value
                        }
                        onClick={() => {
                          setDisasterType(
                            type.value
                          );

                          setShowDropdown(
                            false
                          );
                        }}
                        className="w-full text-left px-4 py-3 text-[#d1d5db] hover:bg-[#374151]"
                      >
                        {
                          type.label
                        }
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SOS Button */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="mb-8">
            <AlertOctagon
              className="text-[#ef4444]"
              size={64}
            />
          </div>

          <button
            onClick={
              handleSOS
            }
            className={`w-full py-8 rounded-2xl font-bold text-2xl transition-all ${
              sent
                ? 'bg-[#10b981]'
                : 'bg-[#ef4444] hover:bg-[#dc2626]'
            } text-white`}
          >
            {sent
              ? 'SOS SENT!'
              : 'SEND SOS'}
          </button>
        </div>

        {/* Status */}
        <div className="bg-[#1a1a1a] border border-[#374151] rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-[#9ca3af] text-sm">
              Connection
              Status
            </span>

            <div className="flex items-center gap-2">
              {online ? (
                <>
                  <Wifi
                    size={16}
                    className="text-[#10b981]"
                  />

                  <span className="text-[#10b981] text-sm font-semibold">
                    Online
                  </span>
                </>
              ) : (
                <>
                  <WifiOff
                    size={16}
                    className="text-[#ef4444]"
                  />

                  <span className="text-[#ef4444] text-sm font-semibold">
                    Offline
                  </span>
                </>
              )}
            </div>
          </div>

          <p className="text-[#6b7280] text-xs mt-2">
            {online
              ? 'Connected → Government Server'
              : 'Offline → SMS Emergency Mode'}
          </p>
        </div>
      </div>
    </div>
  );
}