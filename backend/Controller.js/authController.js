const { sanitizeUser, sendMail } = require("../Common/Common.js");
const { User } = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

exports.loginUser = async (req, res) => {
  // console.log("inside login");
  // console.log("req.uuser.tokenn", req.user.token);
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json(req.user.token);
};

exports.signUpUser = async (req, res) => {
  try {
    // console.log(req.body);
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        if (err) {
          return res.status(401).json({ message: `error in signup ${err}` });
        }
        const user = new User({ ...req.body, password: hashedPassword, salt });
        await user.save();
        req.login(sanitizeUser(user), (err) => {
          if (err) {
            res.status(401).json({ message: `error in signupuser api ${err}` });
          } else {
            const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY, {
              expiresIn: "1h",
            });
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              })
              .status(201)
              .json(token);
          }
        });
      }
    );
  } catch (error) {
    console.log("error in signUpUser api", error);
    res.status(401).json({ "error in signUpUser api": error });
  }
};

exports.checkAuth = async (req, res) => {
  // console.log("check auth" , req.user);
  if (req.user) res.status(201).json({ user: req.user });
  else res.status(404);
};

exports.resetPasswordRequest = async (req, res) => {
  // console.log("reset password request");
  // console.log(req.body);
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (user) {
    const token = crypto.randomBytes(48).toString("hex");
    user.resetPasswordToken = token;
    user.save();
    const resetPage =
      `http://localhost:3000/reset-password?token=` + token + "&email=" + email;
    const html = `<p> click <a href=${resetPage}> here <a> to reset password <p>`;
    const subject = "Reset password mail from Click Cart";

    const response = await sendMail({ to: email, subject, html });
    res.json(response);
  } else {
    res.status(400);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, token, password } = req.body;
  console.log("Reset-password");
  const user = await User.findOne({ email, resetPasswordToken: token });
  // console.log(user);
  if (user) {
    try {
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        password,
        salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (err) {
            return res.status(404).json("error in reset password", err);
          } else {
            user.password = hashedPassword;
            user.salt = salt;
            await user.save();
            // console.log("hashed", hashedPassword);
            // console.log("user", user.password);
            const html = `<p> Password changed succesfully <p>`;
            const subject = "Password Updated";

            await sendMail({ to: email, subject, html });

            return res
              .status(200)
              .json({ message: "success", user: sanitizeUser(user) });
          }
        }
      );
    } catch (error) {
      res.status(400).json("error in reset password", error);
    }
  } else {
    res.status(400).json("error in reset password");
  }
};

exports.logout = async (req, res) => {
  res
    .cookie("jwt", null, { expires: new Date(Date.now()), httpOnly: true })
    .status(200);
};
