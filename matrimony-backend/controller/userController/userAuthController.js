const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const moment = require("moment");
const crypto = require("crypto");

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../../config/variables/variables");
const userModel = require("../../model/user/userModel");
const interestModel = require("../../model/user/interestModel");
const planModel = require("../../model/admin/planModel");
const paymentModel = require("../../model/user/planBookings");
const shortListedSchema = require("../../model/user/shortListedProfile");
const Event = require("../../model/admin/eventModel")
const fs = require("fs");

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const generateOrderId = () => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  return `AGPW${randomNumber}`;
};

const calculateValidTo = (fromDate, priceType) => {
  switch (priceType) {
    case "Per day":
      return moment(fromDate).add(1, "days").toDate();
    case "Per month":
      return moment(fromDate).add(1, "months").toDate();
    case "Per Year":
      return moment(fromDate).add(1, "years").toDate();
    default:
      return fromDate; // fallback if unknown type
  }
};

const getUserInformation = async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await userModel.findById(userId, { userPassword: 0 });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get Interest Count
    const interestsCount = await interestModel.countDocuments({
      targetUserId: userId,
    });

    // Get Views Count
    const viewsCount = userData.profileViews ? userData.profileViews.length : 0;

    // Convert to object and add counts
    const responseData = {
      ...userData.toObject(),
      viewsCount,
      interestsCount,
    };

    res.status(200).json({
      success: true,
      message: "User information retrieved successfully",
      data: responseData,
    });
  } catch (err) {
    console.error("Error in getting the user information", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const completeProfileData = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("req.body", req.body);

    const files = req.files;

    /* =========================
       HANDLE HOBBIES (Array)
    ========================== */
    let hobbies = req.body.hobbies;
    if (hobbies && !Array.isArray(hobbies)) hobbies = [hobbies];

    /* =========================
       BUILD UPDATE OBJECT
    ========================== */
    const updates = {
      /* BASIC */
      userName: req.body.name,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      age: req.body.age,
      profileCreatedFor: req.body.profileCreatedFor,

      bodyType: req.body.bodyType,
      physicalStatus: req.body.physicalStatus,
      complexion: req.body.complexion,
      height: req.body.height,
      weight: req.body.weight,

      maritalStatus: req.body.maritalStatus,
      marriedMonthYear: req.body.marriedMonthYear,
      livingTogetherPeriod: req.body.livingTogetherPeriod,
      divorcedMonthYear: req.body.divorcedMonthYear,
      reasonForDivorce: req.body.reasonForDivorce,
      childStatus: req.body.childStatus,
      numberOfChildren: req.body.numberOfChildren,

      motherTongue: req.body.motherTongue,
      caste: req.body.caste,

      aboutMe: req.body.aboutMe,

      /* LIFESTYLE */
      eatingHabits: req.body.eatingHabits,
      drinkingHabits: req.body.drinkingHabits,
      smokingHabits: req.body.smokingHabits,
      diet: req.body.diet,
      drinking: req.body.drinking,
      smoking: req.body.smoking,
      exercise: req.body.exercise,

      hobbies,
      interests: req.body.interests,
      music: req.body.music,
      favouriteReads: req.body.favouriteReads,
      favouriteCuisines: req.body.favouriteCuisines,
      sportsActivities: req.body.sportsActivities,
      dressStyles: req.body.dressStyles,

      /* FAMILY */
      fathersName: req.body.fathersName,
      mothersName: req.body.mothersName,
      fathersOccupation: req.body.fathersOccupation,
      fathersProfession: req.body.fathersProfession,
      mothersOccupation: req.body.mothersOccupation,
      fathersNative: req.body.fathersNative,
      mothersNative: req.body.mothersNative,
      familyValue: req.body.familyValue,
      familyType: req.body.familyType,
      familyStatus: req.body.familyStatus,
      residenceType: req.body.residenceType,
      numberOfBrothers: req.body.numberOfBrothers,
      numberOfSisters: req.body.numberOfSisters,

      /* RELIGIOUS */
      religion: req.body.religion,
      denomination: req.body.denomination,
      church: req.body.church,
      churchActivity: req.body.churchActivity,
      pastorsName: req.body.pastorsName,
      spirituality: req.body.spirituality,
      religiousDetail: req.body.religiousDetail,

      /* CONTACT */
      userMobile: req.body.phone,
      whatsapp: req.body.whatsapp,
      alternateMobile: req.body.alternateMobile,
      landlineNumber: req.body.landlineNumber,
      currentAddress: req.body.currentAddress,
      permanentAddress: req.body.permanentAddress,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      address: req.body.address,
      contactPersonName: req.body.contactPersonName,
      relationship: req.body.relationship,
      citizenOf: req.body.citizenOf,

      /* PROFESSIONAL */
      education: req.body.education,
      additionalEducation: req.body.additionalEducation,
      educationDetail: req.body.educationDetail,
      employmentType: req.body.employmentType,
      occupation: req.body.occupation,
      position: req.body.position,
      companyName: req.body.companyName,
      annualIncome: req.body.annualIncome,

      // legacy mapping
      jobType: req.body.employmentType,
      salary: req.body.annualIncome,
      degree: req.body.degree,
      school: req.body.school,
      college: req.body.college,
      jobExperience: req.body.jobExperience,

      /* PARTNER PREFERENCES */
      partnerAgeFrom: req.body.partnerAgeFrom,
      partnerAgeTo: req.body.partnerAgeTo,
      partnerHeight: req.body.partnerHeight,
      partnerMaritalStatus: req.body.partnerMaritalStatus,
      partnerMotherTongue: req.body.partnerMotherTongue,
      partnerCaste: req.body.partnerCaste,
      partnerPhysicalStatus: req.body.partnerPhysicalStatus,
      partnerEatingHabits: req.body.partnerEatingHabits,
      partnerDrinkingHabits: req.body.partnerDrinkingHabits,
      partnerSmokingHabits: req.body.partnerSmokingHabits,
      partnerDenomination: req.body.partnerDenomination,
      partnerSpirituality: req.body.partnerSpirituality,
      partnerEducation: req.body.partnerEducation,
      partnerEmploymentType: req.body.partnerEmploymentType,
      partnerOccupation: req.body.partnerOccupation,
      partnerAnnualIncome: req.body.partnerAnnualIncome,
      partnerCountry: req.body.partnerCountry,
      partnerState: req.body.partnerState,
      partnerDistrict: req.body.partnerDistrict,

      isProfileCompleted: true,
      profileStatus: "Completed",
    };

    /* =========================
       PASSWORD (OPTIONAL)
    ========================== */
    if (req.body.password && req.body.password.trim() !== "") {
      updates.userPassword = await bcrypt.hash(req.body.password, 10);
    }

    /* =========================
       PROFILE IMAGE
    ========================== */
    if (files?.profileImage?.[0]) {
      const profile = await cloudinary.uploader.upload(
        files.profileImage[0].path,
        { folder: `matrimony/users/${userId}/profileImage` }
      );
      updates.profileImage = profile.secure_url;
      fs.unlinkSync(files.profileImage[0].path);
    }

    /* =========================
       ADDITIONAL IMAGES
    ========================== */
    if (files?.additionalImages?.length) {
      const uploadedImages = await Promise.all(
        files.additionalImages.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: `matrimony/users/${userId}/additionalImages`,
          })
        )
      );

      updates.additionalImages = uploadedImages.map((img) => img.secure_url);
      files.additionalImages.forEach((f) => fs.unlinkSync(f.path));
    }

    console.log("🔄 Final Updates:", updates);

    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("❌ Error in profile update:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getUserProfileImage = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch only the profileImage field of the user
    const userImage = await userModel.findOne(
      { _id: userId },
      {

        userPassword: 0,
      }
    );

    if (!userImage) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Send back the image URL or data
    res.status(200).json({
      success: true,
      message: "Profile image retrieved successfully",
      data: userImage,
    });
  } catch (err) {
    console.error("Error fetching user profile image:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the profile image",
    });
  }
};

const getAllUserProfileData = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get current user's gender
    const currentUser = await userModel.findById(userId, { gender: 1 });
    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userGender = currentUser.gender;

    // Find all users excluding same gender and current user
    const userData = await userModel.find(
      {
        _id: { $ne: userId },
        gender: { $ne: userGender },
      },
      { userPassword: 0 }
    );

    res.status(200).json({
      success: true,
      message: "All opposite-gender users fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.log("Error in getAllUserProfileData:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getAllUserProfileDataHome = async (req, res) => {
  try {
    const userData = await userModel.find({}, { userPassword: 0 });

    res.status(200).json({
      success: true,
      message: "All users excluding the current user fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.log("Error in getAllUserProfileData:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProfileMoreInformation = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { viewerId } = req.query; // Check for viewerId in query params

    const profileData = await userModel.findById(
      { _id: profileId },
      { userPassword: 0 }
    );

    if (!profileData) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    // Logic to update view count (Unique Views)
    if (viewerId && viewerId !== profileId) {
      // Ensure profileViews array exists (schema update handled)
      if (!profileData.profileViews) {
        profileData.profileViews = [];
      }

      // Add viewerId if not already present
      if (!profileData.profileViews.includes(viewerId)) {
        profileData.profileViews.push(viewerId);
        await profileData.save();
      }
    }

    return res.status(200).json({
      success: true,
      message: "Profile data fetched successfully",
      data: profileData,
    });
  } catch (err) {
    console.log("Error in getting the more details of the profile", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const showUserInterests = async (req, res) => {
  try {
    const { userId } = req.params;
    const { interestData } = req.body;

    const { targetUser, permissions, message } = interestData;

    // Check if any interest already exists between the two users
    const existingInterest = await interestModel.findOne({
      senderId: userId,
      targetUserId: targetUser,
    });

    if (existingInterest) {
      // Update existing interest (status becomes 'pending' again)
      existingInterest.status = "pending";
      existingInterest.message = message;
      existingInterest.sharedSections = {
        about: permissions.about || false,
        photoGallery: permissions.photo || false,
        contactInfo: permissions.contact || false,
        personalInfo: permissions.personal || false,
        hobbies: permissions.hobbies || false,
        socialMedia: permissions.social || false,
      };

      await existingInterest.save();

      return res.status(200).json({
        success: true,
        message: "Interest request updated successfully",
        interestId: existingInterest._id,
      });
    }

    // Create new interest
    const newInterest = new interestModel({
      senderId: userId,
      targetUserId: targetUser,
      message: message,
      sharedSections: {
        about: permissions.about || false,
        photoGallery: permissions.photo || false,
        contactInfo: permissions.contact || false,
        personalInfo: permissions.personal || false,
        hobbies: permissions.hobbies || false,
        socialMedia: permissions.social || false,
      },
      status: "pending",
    });

    await newInterest.save();

    return res.status(200).json({
      success: true,
      message: "Interest sent successfully",
      interestId: newInterest._id,
    });
  } catch (err) {
    console.error("Error in saving the user interest", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send interest",
    });
  }
};

const getInterestedProfileRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reqStatus } = req.body;

    if (!userId || !reqStatus) {
      return res.status(400).json({
        success: false,
        message: "Missing userId or request status",
      });
    }

    const interests = await interestModel.find(
      {
        targetUserId: userId,
        status: reqStatus,
      },
      { sharedSections: 0 }
    );

    const senderIds = interests.map((item) => item.senderId);

    const senderDetails = await userModel.find(
      { _id: { $in: senderIds } },
      "userName profileImage city age gender jobType height"
    );

    const mergedData = interests.map((interest) => {
      const sender = senderDetails.find(
        (u) => u._id.toString() === interest.senderId
      );
      return {
        ...interest.toObject(),
        senderDetails: sender || null,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Interested profiles fetched successfully",
      data: mergedData,
    });
  } catch (err) {
    console.log("Error in getting the interested profile request", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const changeInterestStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reqStatus, profileId } = req.body;
    console.log(userId, reqStatus, profileId);

    if (!userId || !reqStatus || !profileId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const interest = await interestModel.findOneAndUpdate(
      { targetUserId: userId, senderId: profileId },
      { status: reqStatus },
      { new: true }
    );

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Interest status updated to '${reqStatus}'`,
      data: interest,
    });
  } catch (err) {
    console.log(
      "Error in changing the status of the interested profile request",
      err
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const getNewProfileMatches = async (req, res) => {
  try {
    const { userId } = req.params;

    const currentUser = await userModel.findById(userId);
    if (!currentUser)
      return res.status(404).json({ message: "User not found" });

    const {
      gender,
      partnerAgeFrom,
      partnerAgeTo,
      partnerCaste,
      partnerDistrict,
      partnerHeight,
      religion,
    } = currentUser;

    const oppositeGender = gender === "Male" ? "Female" : "Male";

    // Defaults to avoid Invalid Date
    const ageFrom = partnerAgeFrom ? Number(partnerAgeFrom) : 18;
    const ageTo = partnerAgeTo ? Number(partnerAgeTo) : 100;

    // Calculate DOB range
    const currentYear = new Date().getFullYear();
    const minDOB = new Date(currentYear - ageTo, 0, 1);
    const maxDOB = new Date(currentYear - ageFrom, 11, 31);

    // Convert height to number logic
    const heightFrom = partnerHeight ? parseFloat(partnerHeight) : null;

    const filters = [
      { dateOfBirth: { $gte: minDOB, $lte: maxDOB } },
      religion ? { religion: religion } : null,
      partnerCaste ? { caste: partnerCaste } : null,
      partnerDistrict ? { city: partnerDistrict } : null,
      (heightFrom && !isNaN(heightFrom))
        ? {
          $expr: {
            $gte: [
              {
                $convert: {
                  input: "$height",
                  to: "double",
                  onError: 0,
                  onNull: 0
                }
              },
              heightFrom
            ]
          }
        }
        : null,
    ].filter(Boolean);

    const rawMatches = await userModel
      .find({
        _id: { $ne: userId },
        gender: oppositeGender,
        $or: filters,
      })
      .limit(5);

    // Return only selected fields + calculated age
    const matches = rawMatches.map((user) => {
      const dob = new Date(user.dateOfBirth);
      const age = new Date().getFullYear() - dob.getFullYear();

      return {
        _id: user._id,
        userName: user.userName,
        profileImage: user.profileImage,
        city: user.city,
        age,
      };
    });

    res.status(200).json({ matches });
  } catch (err) {
    console.error("Error in getting the new profile matches", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSearchedProfileData = async (req, res) => {
  try {
    const {
      ageFrom,
      ageTo,
      heightFrom,
      heightTo,
      gender,
      maritalStatus,
      motherTongue,
      caste,
      denomination,
      religion,
      country,
      state,
      districtCity,
      education,
      occupation,
      annualIncomeFrom,
      annualIncomeTo,
      physicalStatus,
      familyStatus,
      showWithPhoto
    } = req.body;
    const query = {
      isApproved: true,
    };
    if (gender && gender !== "all" && gender !== "I'm looking for") {
      if (gender === "Men") query.gender = "Male";
      else if (gender === "Women") query.gender = "Female";
      else query.gender = gender;
    }
    if (ageFrom || ageTo) {
      query.age = {};
      if (ageFrom) query.age.$gte = parseInt(ageFrom);
      if (ageTo) query.age.$lte = parseInt(ageTo);
    }
    if (heightFrom || heightTo) {
      query.height = {};
      if (heightFrom) query.height.$gte = heightFrom;
      if (heightTo) query.height.$lte = heightTo;
    }
    if (religion && religion !== "Any" && religion !== "all") query.religion = religion;
    if (motherTongue) query.motherTongue = motherTongue;
    if (caste) query.caste = caste;
    if (denomination) query.denomination = denomination;
    if (education) query.education = education;
    if (occupation) query.occupation = occupation;
    if (country) query.citizenOf = country;
    if (state) query.state = state;
    if (districtCity) query.city = districtCity;
    if (maritalStatus) {
      if (Array.isArray(maritalStatus) && maritalStatus.length > 0) {
        if (!maritalStatus.includes("Any")) {
          query.maritalStatus = { $in: maritalStatus };
        }
      } else if (typeof maritalStatus === "string" && maritalStatus !== "Any") {
        query.maritalStatus = maritalStatus;
      }
    }
    if (physicalStatus) {
      if (Array.isArray(physicalStatus) && physicalStatus.length > 0) {
        if (!physicalStatus.includes("Doesn't Matter")) {
          query.physicalStatus = { $in: physicalStatus };
        }
      } else if (typeof physicalStatus === "string" && physicalStatus !== "Doesn't Matter") {
        query.physicalStatus = physicalStatus;
      }
    }
    if (familyStatus && Array.isArray(familyStatus) && familyStatus.length > 0) {
      query.familyStatus = { $in: familyStatus };
    }
    if (showWithPhoto) {
      query.profileImage = { $exists: true, $ne: "" };
    }
    const users = await userModel.find(query)
      .select("-userPassword -__v")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Error in getSearchedProfileData:", error);
    res.status(500).json({
      success: false,
      message: "Server Error fetching search results",
      error: error.message
    });
  }
};


const getPlanDetails = async (req, res) => {
  try {
    const planData = await planModel.find({ status: "Active" });

    res.status(200).json({
      success: true,
      message: "Active plans fetched successfully",
      data: planData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const savePlanDetails = async (req, res) => {
  try {
    const { paymentData } = req.body;
    console.log("paymentData", paymentData);

    const validFrom = new Date(paymentData.timestamp);
    const validTo = calculateValidTo(
      validFrom,
      paymentData.planDetails.priceType
    );
    const orderId = generateOrderId();

    // Step 1: Save payment info to PaymentModel
    const payment = new paymentModel({
      userId: paymentData.userId,
      razorpayPaymentId: paymentData.razorpayPaymentId,
      planId: paymentData.planId,
      planName: paymentData.planName,
      amount: paymentData.amount,
      currency: paymentData.currency,
      paymentStatus: paymentData.paymentStatus,
      paymentMethod: paymentData.paymentMethod,
      timestamp: validFrom,
      planDetails: paymentData.planDetails,
      orderId: orderId,
    });

    await payment.save();

    // Step 2: Push new paymentDetails to UserModel
    await userModel.findByIdAndUpdate(
      paymentData.userId,
      {
        $push: {
          paymentDetails: {
            subscriptionValidFrom: validFrom,
            subscriptionValidTo: validTo,
            subscriptionType: paymentData.planName,
            subscriptionAmount: paymentData.amount,
            subscriptionStatus:
              paymentData.paymentStatus === "success" ? "Active" : "Pending",
            subscriptionTransactionDate: validFrom,
            subscriptionTransactionId: paymentData.razorpayPaymentId,
            subscriptionOrderId: orderId,
            isEmployeeAssisted: false,
            assistedEmployeeId: "",
            assistedEmployeeName: "",
          },
        },
        $set: {
          isAnySubscriptionTaken: true,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Subscription updated and payment recorded successfully.",
      orderId: orderId,
    });
  } catch (error) {
    console.error("Error in saving plan details:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save subscription/payment details.",
      error: error.message,
    });
  }
};

const getMyActivePlanDetails = async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await userModel.findOne(
      { _id: userId },
      { paymentDetails: 1 }
    );

    if (
      !userData ||
      !userData.paymentDetails ||
      userData.paymentDetails.length === 0
    ) {
      return res
        .status(404)
        .json({ success: false, message: "No subscription found." });
    }

    // Filter active plans
    const activePlans = userData.paymentDetails.filter(
      (plan) => plan.subscriptionStatus === "Active"
    );

    if (activePlans.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No active subscription found." });
    }

    // Sort by subscriptionValidFrom (latest first)
    activePlans.sort(
      (a, b) =>
        new Date(b.subscriptionValidFrom) - new Date(a.subscriptionValidFrom)
    );

    const latestPlan = activePlans[0];

    // Format dates
    const formatDate = (date) =>
      new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

    return res.status(200).json({
      success: true,
      activePlan: {
        subscriptionType: latestPlan.subscriptionType,
        subscriptionAmount: latestPlan.subscriptionAmount,
        subscriptionValidFrom: formatDate(latestPlan.subscriptionValidFrom),
        subscriptionValidTo: formatDate(latestPlan.subscriptionValidTo),
        subscriptionTransactionDate: formatDate(
          latestPlan.subscriptionTransactionDate
        ),
      },
    });
  } catch (err) {
    console.log("Error in getMyActivePlanDetails", err);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

const shortListTheProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { profileId } = req.body;

    console.log("userId", userId);
    console.log("profileId", profileId);

    let shortListedData = await shortListedSchema.findOne({ userId });

    if (shortListedData) {
      const alreadyShortlisted = shortListedData.profiles.includes(profileId);
      if (!alreadyShortlisted) {
        shortListedData.profiles.push(profileId);
        await shortListedData.save();
      }

      return res.status(200).json({
        success: true,
        message: alreadyShortlisted
          ? "Profile already shortlisted"
          : "Profile added to shortlist",
        data: shortListedData,
      });
    } else {
      const newShortlist = await shortListedSchema.create({
        userId,
        profiles: [profileId],
      });

      return res.status(201).json({
        success: true,
        message: "Shortlist created and profile added",
        data: newShortlist,
      });
    }
  } catch (err) {
    console.log("Error in shortListTheProfile", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const getShortListedProfileData = async (req, res) => {
  try {
    const { userId } = req.params;

    const shortListData = await shortListedSchema.findOne({ userId });

    if (!shortListData || shortListData.profiles.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No shortlisted profiles found.",
        data: [],
      });
    }

    const profiles = await userModel.find(
      { _id: { $in: shortListData.profiles } },
      { userName: 1, profileImage: 1, age: 1, city: 1, height: 1, degree: 1 }
    );

    return res.status(200).json({
      success: true,
      message: "Shortlisted profiles fetched successfully",
      data: profiles,
    });
  } catch (err) {
    console.log("Error in getShortListedProfileData", err);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};











module.exports = {
  getAllEvents,
  getShortListedProfileData,
  shortListTheProfile,
  getMyActivePlanDetails,
  savePlanDetails,
  getPlanDetails,
  getSearchedProfileData,
  getNewProfileMatches,
  getAllUserProfileDataHome,
  changeInterestStatus,
  getInterestedProfileRequest,
  getUserProfileImage,
  getUserInformation,
  completeProfileData,
  getAllUserProfileData,
  getProfileMoreInformation,
  showUserInterests,
};
