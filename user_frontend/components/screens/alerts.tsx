'use client';

import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  Zap,
  CloudRain,
  AlertCircle,
  AlertOctagon,
} from 'lucide-react';

interface Alert {
  _id?: string;
  id?: number;
  type: 'flood' | 'blockade' | 'weather' | 'announcement' | 'emergency';
  title: string;
  description: string;
  timestamp: string;
  priority: 'critical' | 'high' | 'medium';
}

const getAlertIcon = (type: Alert['type']) => {
  switch (type) {
    case 'flood':
      return <CloudRain size={20} />;

    case 'blockade':
      return <AlertTriangle size={20} />;

    case 'weather':
      return <Zap size={20} />;

    case 'announcement':
      return <AlertCircle size={20} />;

    case 'emergency':
      return <AlertOctagon size={20} />;

    default:
      return <AlertCircle size={20} />;
  }
};

const getAlertColor = (
  priority: Alert['priority']
) => {
  switch (priority) {
    case 'critical':
      return {
        bg: 'bg-[#ef4444]/10',
        border: 'border-[#ef4444]',
        icon: 'text-[#ef4444]',
        badge: 'bg-[#ef4444] text-white',
      };

    case 'high':
      return {
        bg: 'bg-[#f59e0b]/10',
        border: 'border-[#f59e0b]',
        icon: 'text-[#f59e0b]',
        badge: 'bg-[#f59e0b] text-black',
      };

    case 'medium':
      return {
        bg: 'bg-[#3b82f6]/10',
        border: 'border-[#3b82f6]',
        icon: 'text-[#3b82f6]',
        badge: 'bg-[#3b82f6] text-white',
      };

    default:
      return {
        bg: 'bg-[#6b7280]/10',
        border: 'border-[#6b7280]',
        icon: 'text-[#6b7280]',
        badge: 'bg-[#6b7280] text-white',
      };
  }
};

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<
    Alert[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await fetch(
          'http://localhost:5000/api/alerts'
        );

        const json = await res.json();

        setAlerts(json.data || []);
      } catch (err) {
        console.error(
          'Failed to fetch alerts:',
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] p-4 text-white">
        Loading alerts...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          Alerts
        </h1>

        <p className="text-[#9ca3af] text-sm">
          {alerts.length} active alerts
        </p>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3 pb-4">
        {alerts.map((alert, index) => {
          const colors =
            getAlertColor(alert.priority);

          return (
            <div
              key={
                alert._id ??
                alert.id ??
                index
              }
              className={`${colors.bg} border-l-4 ${colors.border} bg-[#1a1a1a] rounded-lg p-4`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3 flex-1">
                  <div
                    className={`mt-1 ${colors.icon}`}
                  >
                    {getAlertIcon(
                      alert.type
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base">
                      {alert.title}
                    </h3>
                  </div>
                </div>

                <span
                  className={`${colors.badge} px-2 py-1 rounded text-xs font-semibold capitalize`}
                >
                  {alert.priority}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#d1d5db] text-sm leading-relaxed mb-2 ml-8">
                {alert.description}
              </p>

              {/* Time */}
              <div className="ml-8">
                <span className="text-[#9ca3af] text-xs">
                  {alert.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}