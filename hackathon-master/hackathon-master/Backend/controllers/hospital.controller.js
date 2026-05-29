/**
 * ================================
 * HOSPITAL CONTROLLERS
 * NO DATABASE (TEMPORARY)
 * ================================
 */

/**
 * 1️⃣ Get all hospitals
 * Used by:
 * - User frontend hospital page
 * - Government dashboard
 */
exports.getHospitals =
  async (req, res) => {
    try {
      console.log(
        "✅ /api/hospitals called"
      );

      res.json({
        success: true,
        data: [],
      });
    } catch (error) {
      console.error(
        "Hospital fetch error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch hospitals",
      });
    }
  };

/**
 * 2️⃣ Hospital Stats
 * Used by:
 * Government dashboard cards
 */
exports.getHospitalStats =
  async (req, res) => {
    try {
      console.log(
        "✅ /api/hospitals/stats called"
      );

      res.json({
        success: true,
        stats: {
          totalHospitals: 0,
          totalBeds: 0,
          availableBeds: 0,
          icuTotal: 0,
          icuAvailable: 0,
          criticalPatients: 0,
          ambulances: 0,
        },
      });
    } catch (error) {
      console.error(
        "Hospital stats error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load hospital stats",
      });
    }
  };