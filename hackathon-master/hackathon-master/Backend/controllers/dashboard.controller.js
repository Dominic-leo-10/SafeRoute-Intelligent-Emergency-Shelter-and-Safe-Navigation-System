/**
 * ================================
 * DASHBOARD CONTROLLERS
 * NO DATABASE (TEMPORARY)
 * ================================
 */

/**
 * 1️⃣ Map Data
 * Used by:
 * - Government disaster map
 */
exports.getMapData = async (
  req,
  res
) => {
  try {
    console.log(
      "✅ /api/dashboard/map called"
    );

    res.json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.error(
      "Dashboard map error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to load map data",
    });
  }
};

/**
 * 2️⃣ Dashboard Stats
 * Used by:
 * - Government dashboard top cards
 */
exports.getDashboardStats =
  async (req, res) => {
    try {
      console.log(
        "✅ /api/dashboard/stats called"
      );

      res.json({
        success: true,
        stats: {
          totalShelters: 0,
          totalCapacity: 0,
          usedCapacity: 0,
          availableCapacity: 0,
        },
      });
    } catch (error) {
      console.error(
        "Dashboard stats error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load dashboard stats",
      });
    }
  };