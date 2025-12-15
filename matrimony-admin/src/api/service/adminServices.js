import { adminInstance } from "../axiosInstance";

export const registerAdmin = async () => {
  const response = await adminInstance.get(`/`);
  return response;
};

export const verifyAdmin = async (loginData) => {
  const response = await adminInstance.post(`/verify-admin`, { loginData });
  return response;
};

export const getAllUserData = async () => {
  const response = await adminInstance.get(`/get-all-users`);
  return response;
};


export const getNewRequestedUsers = async () => {
  const response = await adminInstance.get(`/get-all-new-requested-users`);
  return response;
};

export const approveNewUser = async (userId) => {
  const response = await adminInstance.put(`/approve-new-user/${userId}`);
  return response;
};

export const getPaidUserData = async () => {
  const response = await adminInstance.get(`/paid-users-data`);
  return response;
};


export const addNewPlanData = async (planData) => {
  const response = await adminInstance.post(`/add-new-plan-data`, { planData });
  return response;
};
export const editPlanData = async (planId, planData) => {
  const response = await adminInstance.put(`/edit-plan-data/${planId}`, { planData });
  return response;
};

export const getAllPlanData = async () => {
  const response = await adminInstance.get(`/get-all-plan-data`);
  return response;
};

export const changePlanStatus = async (planId, planStatus) => {
  const response = await adminInstance.put(`/edit-plan-status/${planId}`, { planStatus });
  return response;
};

// Event Services
export const getAllEvents = async () => {
  const response = await adminInstance.get(`/get-all-events`);
  return response;
};

export const addNewEvent = async (eventData) => {
  // eventData should be FormData object
  const response = await adminInstance.post(`/add-new-event`, eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export const editEvent = async (eventId, eventData) => {
  const response = await adminInstance.put(`/edit-event/${eventId}`, eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response;
};

export const deleteEventData = async (eventId) => {
  const response = await adminInstance.delete(`/delete-event/${eventId}`);
  return response;
};