const express = require("express");
const connectDB = require("./config/db");
const productRouter = require("./Routes/productRoutes");
const brandRouter = require("./Routes/brandRoutes");
const categoryRouter = require("./Routes/categoryRoutes");
const app = express();
const PORT = process.env.PORT || 8070;
const cors = require("cors");
const userRouter = require("./Routes/userRoutes");
const authRouter = require("./Routes/authRoutes");
const cartRouter = require("./Routes/cartRoutes");
const orderRouter = require("./Routes/OrderRoutes");
const session = require("express-session");
const passport = require("passport");
const { User } = require("./models/User");
const { sanitizeUser, cookieExtractor, isAuth } = require("./Common/Common.js");
const jwt = require("jsonwebtoken");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const _dirname = path.resolve();
//database connection
connectDB();

// app.use(cors());
let opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY;

const stripe = require("stripe")(process.env.PAYMENT_KEY);

//middlewares
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false, // don't save session if modified
    saveUninitialized: false, //don't create session untill something stored
  })
);

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);
app.use(passport.authenticate("session"));

// app.use(express.raw({type: 'application/json'}));
app.use(express.json());
app.use("/back/products", productRouter);
app.use("/back/categories", categoryRouter);
app.use("/back/brands", brandRouter);
app.use("/back/user", isAuth(), userRouter);
app.use("/back/auth", authRouter);
app.use("/back/cart", isAuth(), cartRouter);
app.use("/back/order", isAuth(), orderRouter);
app.post("/back/create-payment-intent", async (req, res) => {
  const { totalAmount } = req.body;
  // console.log(totalAmount);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount * 100, // for decimal compensation
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use(express.static(path.join(_dirname , "/frontend/build")))

app.use("*" , (req , res) => {
  res.sendFile(path.resolve(_dirname , "frontend" , "build" , "index.html"))
})

passport.use(
  "local",
  new localStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        done(null, false, { message: "invalid credentials" });
      }
      // console.log(user)
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          // console.log("user password" , user.password);
          // console.log("hashed" ,hashedPassword);
          if (err) {
            done(err);
          } else if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            // console.log("user" , user.email);
            done(null, false, { message: "invalid credentials" });
          } else {
            const token = jwt.sign(sanitizeUser(user), process.env.SECRET_KEY, {
              expiresIn: "1h",
            });
            // console.log(hashedPassword);
            // console.log(token);
            done(null, { token });
          }
        }
      );
    } catch (error) {
      done(error);
    }
  })
);

passport.use(
  "jwt",
  new jwtStrategy(opts, async function (jwt_payload, done) {
    // console.log(jwt_payload)
    try {
      const user = await User.findById(jwt_payload.id);
      // console.log("user" ,user)
      if (user) {
        done(null, sanitizeUser(user));
      } else {
        done(null, false);
      }
    } catch (error) {
      console.log("fsff", error);
      done(error, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // console.log({ paymentIntentSucceeded });
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);


//running server
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
