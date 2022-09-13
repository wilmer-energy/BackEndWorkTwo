const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Users } = require("../models/users.model");

const protectedSession = async (req, res, next) => {
  console.log("hi");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(403).json({
      status: "Fail",
      data: "Unable to find the token",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id } = req.params;
  if (!(parseInt(id) === decoded.id)) {
    return res.status(403).json({
      status: "Fail",
      data: "id does not match",
    });
  }

  const user = await Users.findOne({ where: { id: decoded.id } });
  if (!user) {
    return res.status(403).json({
      status: "Fail",
      data: "Invalid token",
    });
  }

  next();
};

module.exports = { protectedSession };
