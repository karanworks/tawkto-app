import * as React from "react";
import { View } from "react-native";
import { Input } from "~/components/ui/input";
import { Search } from "~/lib/icons/Search";
import SolvedChat from "~/components/SolvedChat";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import { ChatType } from "~/.expo/types/types";

export default function SolvedChats() {
  const { solvedChats } = useSelector((state: RootState) => state.Inbox);

  return (
    <View className="flex-1 items-center  bg-secondary/30 px-3">
      <View className="w-full" style={{ marginBlock: 10 }}>
        <Input placeholder="Search chat" />
        <Search style={{ position: "absolute", zIndex: 9999999 }} />
      </View>

      {solvedChats?.map((chat: ChatType) => (
        <SolvedChat key={chat.id} chat={{ ...chat }} />
      ))}
    </View>
  );
}
