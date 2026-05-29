const checkInPerson = async (req, res) => {
  try {
    const { family_id, shelter_id } =
      req.body;

    console.log(
      "✅ Person Check-in Request"
    );

    console.log({
      family_id,
      shelter_id,
    });

    // No DB for now
    // Just acknowledge request

    res.status(201).json({
      success: true,
      message:
        "Check-in request received",
      data: {
        family_id:
          family_id || null,
        shelter_id:
          shelter_id || null,
      },
    });
  } catch (err) {
    console.error(
      "❌ Check-in failed:",
      err
    );

    res.status(500).json({
      success: false,
      message:
        "Check-in failed",
    });
  }
};

module.exports = {
  checkInPerson,
};