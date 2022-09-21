const UsersModel = require("../model/UserModel");
const OTPModel = require("../model/OTPModel");
const SendEmailUtility = require("../sendMailUtility/sendMailUtility");

/* ........Email Varification and then Send OTP........... */
exports.emailVarificationAndSendOTP = async (req, res) => {
  let email = req.params.email;
  let OTPCode = Math.floor(100000 + Math.random() * 900000);
  try {
    // Email Account Query
    let UserCount = await UsersModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    if (UserCount.length > 0) {
      // OTP Insert
      let CreateOTP = await OTPModel.create({ email: email, otp: OTPCode });
      // Email Send
      let SendEmail = await SendEmailUtility(
        email,
        "Your PIN Code is= " + OTPCode,
        "Task Manager PIN Verification"
      );
      res.status(200).json({ status: "success", data: SendEmail });
    } else {
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

/* ........Verify OTP........... */
exports.RecoverVerifyOTP = async (req, res) => {
  let email = req.params.email;
  let otp = req.params.otp;
  let status = 0;
  let statusUpdate = 1;
  try {
    let OTPCount = await OTPModel.aggregate([
      { $match: { email: email, otp: otp, status: status } },
      { $count: "total" },
    ]);
    if (OTPCount.length > 0) {
      let OTPUpdate = await OTPModel.updateOne(
        { email: email, otp: otp, status: status },
        {
          email: email,
          otp: otp,
          status: statusUpdate,
        }
      );
      res.status(200).json({ status: "success", data: OTPUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP Code" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};

exports.RecoverResetPass = async (req, res) => {
  let email = req.body["email"];
  let otp = req.body["otp"];
  let NewPass = req.body["password"];
  let statusUpdate = 1;

  try {
    let OTPUsedCount = await OTPModel.aggregate([
      { $match: { email: email, otp: otp, status: statusUpdate } },
      { $count: "total" },
    ]);
    if (OTPUsedCount.length > 0) {
      let PassUpdate = await UsersModel.updateOne(
        { email: email },
        {
          password: NewPass,
        }
      );
      res.status(200).json({ status: "success", data: PassUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Request" });
    }
  } catch (e) {
    res.status(200).json({ status: "fail", data: e });
  }
};
