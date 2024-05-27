const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser")
const JWT_SECRET = "harryisagoodb$oy";
///////  ROUTE 1:  Create a user request POST "/api/auth/ccreateuser". Doesnt require Login

router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false
    // If theer are errors return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({  success,errors: errors.array() });
    }

    try {
      /// Check weather user with same email already exist ////
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ success,error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //  .then(user => res.json(user)).catch(err=>{console.log(err)
      //     res.json({error:"Please enter a unique value for email",message:err.message})})

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log(authToken);
      //   res.json(user);
      success= true
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internnal Server Erro Occured");
    }

    // const user = User(req.body)
    // user.save()
    // res.send(req.body)
  }
);

///////  ROUTE 2: Autghenticate a user with  POST "/api/auth/login". Doesnt require Login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
    //   body("password", "Password must be atleast 5 characters").isLength({
    //     min: 5,
    //   }),
  ],
  async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user =await User.findOne({email})
        if(!user){
          success= false
            return res.status(400).json({error:"Please try to login with correct credentials"})

        }

        const passwordCompare = await bcrypt.compare(password,user.password)
        if(!passwordCompare){
          success=false
            return res.status(400).json({ success,error:"Please try to login with correct credentials"})
        }
        const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          success= true
          res.json({success, authToken})
    } catch (error) {
        console.log(error.message);
      res.status(500).send("Internnal Server Erro Occured");
        
    }
  }
);

///////  ROUTE 3: Get user details  with  POST "/api/auth/getuser". Lgin Required


router.post(
    "/getuser",
    fetchuser,
    async (req, res) => {

try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)
    
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internnal Server Erro Occured");
    
}
    })
module.exports = router;
