const JwtService = require("../Services/JwtServices");
const RefreshModel = require("../Models/RefreshToken");

const Logout = async (req, res) => {
  const { id } = req.body;
  try {
    const token = await RefreshModel.findOneAndRemove({
      userId: id,
    });
    if (!token) {
      return res.status(422).json({ message: "Token not found" });
    }
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  return res.json({ message: "Logout successfully" });
};

exports.Logout = Logout;