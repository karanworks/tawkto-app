import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Chat from "~/components/Chat";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { getChats } from "~/slices/chats/thunk";
import { ChatType, Messagetype } from "../../.expo/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import useGetUser from "~/hooks/getUser";
import socket from "~/socket/socket";
import { getUnassignedChats } from "~/slices/inbox/thunk";
import { handleIncomingMessageUpdate } from "~/slices/chats/reducer";
import usePushNotification from "~/hooks/usePushNotification";

export default function Chats() {
  const [loading, setLoading] = useState(false);
  const user = useGetUser();

  const { chats, activeChat } = useSelector((state: RootState) => state.Chats);
  const { unassignedChats } = useSelector((state: RootState) => state.Inbox);
  const { sendPushNotification, expoPushToken } = usePushNotification();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    dispatch(
      getChats({ workspaceId: user.workspace.id, agentId: user.id })
    ).then(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    if (!user) return;
    socket.emit("agent-join", {
      agentId: user?.id,
      workspaceId: user.workspace?.id,
    });
  }, [user]);

  function updateUnassignedChatsCount(chat: ChatType) {
    if (!user) return;

    dispatch(
      getUnassignedChats({
        agentId: user.id,
        workspaceId: user?.workspace.id,
      })
    );

    console.log("CHAT REQUEST ->", chat);

    // sendPushNotification(expoPushToken, "You have a new message request", `New Message`)
  }

  useEffect(() => {
    socket.on("visitor-message-request", updateUnassignedChatsCount);
    socket.on("joined-conversation", updateUnassignedChatsCount);

    return () => {
      socket.off("visitor-message-request", updateUnassignedChatsCount);
      socket.off("joined-conversation", updateUnassignedChatsCount);
    };
  });

  const handleIncomingMessage = (message: Messagetype) => {
    dispatch(handleIncomingMessageUpdate(message));

    console.log("MESSAGE REQUEST ->", message);

    console.log(
      "NEW MESSAGE TESTING ->",
      expoPushToken && message.sender.type === "visitor"
    );
    console.log("NEW MESSAGE TESTING 1 ->", expoPushToken);
    console.log("NEW MESSAGE TESTING 2 ->", message.sender.type === "visitor");

    if (expoPushToken && message.sender.type === "visitor") {
      const isChatRequest = chats.find((chat) => chat.id === message.chatId);

      console.log("TESTING CHAT REQUEST ->", isChatRequest);

      if (!isChatRequest) {
        sendPushNotification(
          expoPushToken,
          "You have a new chat request",
          `${message.sender.name}: ${message.content}`
        );
      } else {
        console.log("ELSE CONDITION GOT TRIGGERED", message);

        sendPushNotification(
          expoPushToken,
          message.sender.name,
          message.content
        );
      }
    }
  };

  useEffect(() => {
    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [activeChat]);

  return (
    <View
      className="flex-1 items-center justify-center  bg-secondary/30 px-3"
      // style={{ height: "200%" }}
    >
      {/* {chats?.map((chat: ChatType) => (
        <Chat key={chat.id} chat={{ ...chat }} />
      ))} */}
      {loading ? (
        <View>
          <ActivityIndicator size={30} />
        </View>
      ) : (
        <FlatList
          data={chats}
          keyExtractor={(chat: ChatType) => chat.id.toString()}
          renderItem={({ item }) => <Chat chat={{ ...item }} />}
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
