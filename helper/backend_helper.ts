import { API_CLIENT } from "./api";

const api = new API_CLIENT();

export function login(data: any) {
  return api.post(`${process.env.EXPO_PUBLIC_SERVER_URL}/login`, data);
}
//*****************************************************************//
//***************************OPEN CHATS****************************//
//*****************************************************************//

export function getChats({ workspaceId, agentId }: any) {
  return api.get(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/my-open/${workspaceId}/${agentId}`
  );
}
export function getChatMessages({ chatId }: any) {
  return api.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/my-open/${chatId}`);
}

//*****************************************************************//
//************************UNASSIGNED CHATS*************************//
//*****************************************************************//

export function getUnassignedChats({ workspaceId, agentId }: any) {
  return api.get(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/chat-requests/${workspaceId}/${agentId}`
  );
}
export function getUnassignedChatMessages({ chatId }: any) {
  return api.get(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/chat-request/${chatId}`
  );
}
//*****************************************************************//
//**************************SOLVED CHATS***************************//
//*****************************************************************//

export function getSolvedChats({ workspaceId, agentId }: any) {
  return api.get(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/solved/${workspaceId}/${agentId}`
  );
}
export function getSolvedChatMessages({ chatId }: any) {
  return api.get(`${process.env.EXPO_PUBLIC_SERVER_URL}/solved/${chatId}`);
}

export function updateSolvedChat({ chatId, status }: any) {
  return api.patch(`${process.env.EXPO_PUBLIC_SERVER_URL}/solved/${chatId}`, {
    status,
  });
}

//*****************************************************************//
//*********************** NOTIFICATION TOKEN **********************//
//*****************************************************************//
export function registerNotificationToken({ userId, expoPushToken }: any) {
  return api.post(
    `${process.env.EXPO_PUBLIC_SERVER_URL}/notification-token/${userId}`,
    { expoPushToken }
  );
}
