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
import { registerNotificationToken } from "~/helper/backend_helper";
import { setNotificatnonExpoPushToken } from "~/slices/expoPushToken/reducer";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Chats() {
  const [loading, setLoading] = useState(false);
  const user = useGetUser();
  const { isDarkColorScheme } = useColorScheme();

  const { chats, activeChat } = useSelector((state: RootState) => state.Chats);
  const { unassignedChats } = useSelector((state: RootState) => state.Inbox);
  const { expoPushToken } = usePushNotification();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (expoPushToken) {
      dispatch(setNotificatnonExpoPushToken(expoPushToken));

      registerNotificationToken({ userId: user?.id, expoPushToken }).then(
        (res) => {}
      );
    }
  }, [expoPushToken]);

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
  };

  useEffect(() => {
    socket.on("message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
    };
  }, [activeChat]);

  return (
    <View
      // className="flex-1 items-center justify-center  bg-secondary/30 px-3"
      className="flex-1 items-center justify-center px-3"
      style={{
        backgroundColor: `${isDarkColorScheme ? "#212529" : "white"}`,
      }}
      // className={isDarkColorScheme ? "text-gray-300" : "text-gray-600"}
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
