import * as React from "react";
import { View } from "react-native";
import Chat from "~/components/Chat";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { getChats } from "~/slices/chats/thunk";
import { ChatType } from "../../.expo/types/types";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import useGetUser from "~/hooks/getUser";
import socket from "~/socket/socket";

export default function Chats() {
  const user = useGetUser();

  const { chats } = useSelector((state: RootState) => state.Chats);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!user) return;

    dispatch(getChats({ workspaceId: user.workspace.id, agentId: user.id }));
  }, [user]);

  React.useEffect(() => {
    if (user) {
      socket.emit("agent-join", {
        agentId: user?.id,
        workspaceId: user.workspace?.id,
      });
    }
  }, [user]);

  return (
    <View className="flex-1 items-center  bg-secondary/30 px-3">
      {chats?.map((chat: ChatType) => (
        <Chat key={chat.id} chat={{ ...chat }} />
      ))}
    </View>
  );
}
