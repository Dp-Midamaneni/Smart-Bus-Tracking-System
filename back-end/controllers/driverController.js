const getDriverProfile = async (req, res) => {
  res.status(200).json({
    message: "Driver profile fetched successfully",
    driver: req.driver,
  });
};

module.exports = {
  getDriverProfile,
};
