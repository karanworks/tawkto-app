import { useEffect } from "react";
import { View } from "react-native";
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

export default function Chats() {
  const user = useGetUser();

  const { chats, activeChat } = useSelector((state: RootState) => state.Chats);

  const dispatch = useAppDispatch();

  console.log("CHATS PAGE RENDERED");

  useEffect(() => {
    if (!user) return;

    dispatch(getChats({ workspaceId: user.workspace.id, agentId: user.id }));
  }, [user]);

  useEffect(() => {
    if (user) {
      socket.emit("agent-join", {
        agentId: user?.id,
        workspaceId: user.workspace?.id,
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    socket.emit("agent-join", {
      agentId: user?.id,
      workspaceId: user.workspace?.id,
    });
  }, [user]);

  function updateUnassignedChatsCount() {
    if (!user) return;

    dispatch(
      getUnassignedChats({
        agentId: user.id,
        workspaceId: user?.workspace.id,
      })
    );
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
    <View className="flex-1 items-center  bg-secondary/30 px-3">
      {chats?.map((chat: ChatType) => (
        <Chat key={chat.id} chat={{ ...chat }} />
      ))}
    </View>
  );
}
