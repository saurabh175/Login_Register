const router = require("express").Router();
const { User,validate } = require("../model/user");
const Token = require("../model/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
router.post("/", async (req, res) => {
  try {
    const {error} = validate(req.body);
    let user = await User.findOne({email:req.body.email});
    if (user) {
      console.log("User with this email alreay exist");
      return res
        .status(409)
        .send({ message: "User with this email already exist" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashpassword = await bcrypt.hash(req.body.password, salt);
    user = await new User({ ...req.body, password: hashpassword }).save();
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${"http://localhost:3000/"}users/${token.userId}/verify/${
      token.token
    }`;
    await sendEmail(user.email, "verify email", url);
    res
      .status(201)
      .send({ message: "An Email sent to your account please verify" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log("user from routes",user);
    if (!user) return res.status(400).send({ message: "Invalid Link" });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (token === null) return res.status(400).send({ message: "Invalid Link" });
    await User.updateOne({ _id: user._id }, { verified: true });
    res.status(200).send({ mesage: "Email verified Succesfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server error" });
  }
});
module.exports=router;
