/**
 * ================================
 * GOVERNMENT CONTROLLERS
 * NO DATABASE (TEMPORARY)
 * ================================
 */

/**
 * 1️⃣ Get all shelters
 * Used by: Government dashboard table
 */
const getAllShelters = async (
  req,
  res
) => {
  try {
    console.log(
      "✅ /api/shelters called"
    );

    res.json({
      success: true,
      data: [],
    });
  } catch (error) {
    console.error(
      "Shelter fetch error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch shelters",
    });
  }
};

/**
 * 2️⃣ Dashboard summary stats
 * Used by: Top cards
 */
const getDashboardStats =
  async (req, res) => {
    try {
      console.log(
        "✅ Dashboard stats requested"
      );

      res.json({
        success: true,
        stats: {
          totalShelters: 0,
          fullShelters: 0,
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

/**
 * 3️⃣ Map data
 * Used by: Disaster map + shelter detail panel
 */
const getSheltersForMap =
  async (req, res) => {
    try {
      console.log(
        "✅ Shelter map data requested"
      );

      res.json({
        success: true,
        data: [],
      });
    } catch (error) {
      console.error(
        "Map API error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to load map data",
      });
    }
  };

module.exports = {
  getAllShelters,
  getDashboardStats,
  getSheltersForMap,
};