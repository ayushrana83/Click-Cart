const { User } = require("../models/User");

exports.getUserById = async (req, res) => {
    // console.log(req);
  try {
    const {id} = req.user;
    const user = await User.findById(id);
    res
      .status(201)
      .json({
        id: user.id,
        addresses: user.addresses,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    console.log("error in getUserById api", error);
    res.status(401).json({ "error in getUserById api": error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(user);
  } catch (error) {
    console.log("error in getUserById api", error);
    res.status(401).json({ "error in getUserById api": error });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(201).json(user);
  } catch (error) {
    console.log("error in getUserInfo api", error);
    res.status(401).json({ "error in getUserInfo api": error });
  }
};
