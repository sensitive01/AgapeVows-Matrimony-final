import { userInstance } from "../axiosInstance/userInstance";

export const getUserInfo = async (userId) => {
  const response = await userInstance.get(`/get-user-info/${userId}`);
  return response;
};

export const savePersonalInfo = async (formData, userId) => {
  const response = await userInstance.post(
    `/complete-profile-data/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

export const getUserProfile = async (userId) => {
  const response = await userInstance.get(`/get-user-profile/${userId}`);
  return response;
};

export const fetchAllUserProfiles = async (userId) => {
  const response = await userInstance.get(`/get-all-user-profile/${userId}`);
  return response;
};
export const fetchAllUserProfilesHome = async () => {
  const response = await userInstance.get(`/get-all-user-profile-home`);
  return response;
};

export const getTheProfieMoreDetails = async (userId) => {
  const response = await userInstance.get(
    `/get-profile-more-information/${userId}`
  );
  return response;
};

export const sendInterestData = async (interestData, userId) => {
  const response = await userInstance.post(`/show-user-interests/${userId}`, {
    interestData,
  });
  return response;
};

export const getInterestedProfile = async (userId, reqStatus) => {
  const response = await userInstance.post(
    `/get-interested-profile-request/${userId}`,
    { reqStatus }
  );
  return response;
};

export const handleChangeInterestStatus = async (
  userId,
  profileId,
  reqStatus
) => {
  const response = await userInstance.put(`/change-interest-status/${userId}`, {
    reqStatus,
    profileId,
  });
  return response;
};

export const newProfileMatch = async (userId) => {
  const response = await userInstance.get(`/new-profile-matches/${userId}`);
  return response;
};

export const fetchSearchedProfileData = async (formData) => {
  const response = await userInstance.post(
    `/get-searched-profile-data`,
    formData
  );
  return response;
};

export const getAllPlanDetails = async () => {
  const response = await userInstance.get(`/get-plan-details`);
  return response;
};

export const sendPaymentData = async (paymentData, userId) => {
  const response = await userInstance.post(`/save-plan-details/${userId}`, {
    paymentData,
  });
  return response;
};

export const getMyActivePlanData = async (userId) => {
  const response = await userInstance.get(
    `/get-my-active-plan-details/${userId}`
  );
  return response;
};

export const getAllChatDoneByTheUser = async (senderId, receiverId) => {
  const response = await userInstance.get(
    `/get-all-chat-done-by-the-users/${senderId}/${receiverId}`
  );
  return response;
};

export const sendChatMessage = async (senderId, message, receiverId) => {
  console.log("sendChatMessage", senderId, message, receiverId);
  const response = await userInstance.post(
    `/send-my-chat/${senderId}/${receiverId}`,
    { message }
  );
  return response;
};

export const getMyChatList = async (senderId) => {
  const response = await userInstance.get(`/send-my-chat-list/${senderId}`);
  return response;
};

export const getChatMessages = async (chatId) => {
  const response = await userInstance.get(
    `/send-my-individual-chat-list/${chatId}`
  );
  return response;
};

export const saveTheProfileAsShortlisted = async (profileId, userId) => {
  const response = await userInstance.post(
    `/short-list-the-profile/${userId}`,
    { profileId }
  );
  return response;
};

export const getShortListedProfileData = async (userId) => {
  const response = await userInstance.get(
    `/get-short-listed-profile-data/${userId}`
  );
  return response;
};


export const getWhoViewedYouData = async (userId) => {
  try {
    const response = await userInstance.get(`users/${userId}/who-viewed-you-page`);
    return response;
  } catch (error) {
    console.error("Error fetching who viewed you data:", error);
    throw error;
  }
};



// Get blocked profiles
export const getBlockedProfilesData = async (userId) => {
  try {
    const response = await userInstance.get(`/api/users/${userId}/blocked-profiles`);
    return response;
  } catch (error) {
    console.error("Error fetching blocked profiles data:", error);
    throw error;
  }
};

// Unblock a profile
export const unblockProfile = async (userId, blockedUserId) => {
  try {
    const response = await userInstance.post(`/api/users/${userId}/unblock`, {
      blockedUserId: blockedUserId
    });
    return response;
  } catch (error) {
    console.error("Error unblocking profile:", error);
    throw error;
  }
};


// Get ignored profiles
export const getIgnoredProfilesData = async (userId) => {
  try {
    const response = await userInstance.get(`/api/users/${userId}/ignored-profiles`);
    return response;
  } catch (error) {
    console.error("Error fetching ignored profiles data:", error);
    throw error;
  }
};

// Unignore a profile
export const unignoreProfile = async (userId, ignoredUserId) => {
  try {
    const response = await userInstance.post(`/api/users/${userId}/unignore`, {
      ignoredUserId: ignoredUserId
    });
    return response;
  } catch (error) {
    console.error("Error unignoring profile:", error);
    throw error;
  }
};

export const isUserMadeTheInterest = async (userId, profileId) => {
  try {
    const response = await userInstance.get(`/is-am-made-interest/${userId}/${profileId}`);
    return response;
  } catch (error) {
    console.error("Error unignoring profile:", error);
    throw error;
  }
};



// export const checkInterestStatus = async (userId, profileId) => {
//   try {
//     const response = await userInstance.get(
//       `/api/users/${userId}/interest-status/${profileId}`
//     );
//     return response;
//   } catch (error) {
//     console.error("Error checking interest status:", error);
//     throw error;
//   }
// };