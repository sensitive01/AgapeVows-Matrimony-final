const bcrypt = require("bcrypt");
const {
  ADMIN_EMAIL_ID,
  ADMIN_PASSWORD,
} = require("../../config/variables/variables");
const adminModel = require("../../model/admin/adminModel");
const userModel = require("../../model/user/userModel");

const registerAdmin = async (req, res) => {
  try {
    const adminEmail = ADMIN_EMAIL_ID;
    const adminPassword = ADMIN_PASSWORD;

    const existingAdmin = await adminModel.findOne({ adminEmail });

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: "Admin already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new adminModel({
      adminEmail,
      adminPassword: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (err) {
    console.error("Error in registerAdmin:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    const { loginData } = req.body;
    const { email, password } = loginData;

    const admin = await adminModel.findOne({ adminEmail: email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.adminPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      adminId: admin._id,
    });
  } catch (err) {
    console.error("Error in verifyAdmin:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllUsersData = async (req, res) => {
  try {
    const userData = await userModel
      .find(
        { isApproved: true },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
        }
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error in getAllUsersData", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getPaidUsersData = async (req, res) => {
  try {
    const userData = await userModel
      .find(
        { isAnySubscriptionTaken: true },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
          isAnySubscriptionTaken: 1,
          "paymentDetails.subscriptionValidFrom": 1,
          "paymentDetails.subscriptionValidTo": 1,
          "paymentDetails.subscriptionType": 1,
          "paymentDetails.subscriptionAmount": 1,
          "paymentDetails.subscriptionStatus": 1,
          "paymentDetails.subscriptionTransactionDate": 1,
        }
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Paid users fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error in getPaidUsersData", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllNewRequestedUsersData = async (req, res) => {
  try {
    const userData = await userModel
      .find(
        { isApproved: false },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          profileImage: 1,
          paymentDetails: 1,
          createdAt: 1,
        }
      )
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    console.error("Error fetching unapproved users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const approveNewUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await userModel.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true }
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User approved successfully",
    });
  } catch (err) {
    console.error("Error approving user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getPaidUsersData,
  approveNewUser,
  getAllNewRequestedUsersData,
  registerAdmin,
  verifyAdmin,
  getAllUsersData,
};
