const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const { User } = require("../model/user");
const { Token } = require("../model/token");
const { mongoose } = require("mongoose");
const sendEmail = require("../utils/sendEmail");
const Schema = mongoose.Schema;
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ mesage: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    console.log("user from routes auth ",user);
    if (!user) res.status(400).send({ message: "Invalid Email" });
    const validpassword =  await bcrypt.compare(req.body.password, user.password);
    console.log(validpassword);
    if (!validpassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }
    if (!user.verified) {
      const token = await Token.findOne({
        userId: user._id,
      });
      if (token === null) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${"http://localhost:3000/"}users/${token.userId}/verify/${
          token.token
        }`;
        await sendEmail(user.email, "Verify Email", url);
      }
      res
        .status(400)
        .send({ message: "An Email sent to  your account please verify" });
    }
    console.log("logged in Sussessfully");
    res.status(200).send({ message: "Logged in Sussessfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});
const validate = (data) => {
  const schema = joi.object({
    email: joi.string().email().required().label("Email"),
    password: joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = router;
