import * as React from "react";
import { FlatList, View } from "react-native";
import { Input } from "~/components/ui/input";
import { Search } from "~/lib/icons/Search";
import { RootState } from "../_layout";
import { ChatType } from "~/.expo/types/types";
import { useSelector } from "react-redux";
import InboxChat from "~/components/InboxChat";

export default function UnassignedChats() {
  const { unassignedChats } = useSelector((state: RootState) => state.Inbox);

  return (
    <View className="flex-1 items-center  bg-secondary/30 px-3">
      {/* <View className="w-full" style={{ marginBlock: 10 }}>
        <Input placeholder="Search chat" />
        <Search style={{ position: "absolute", zIndex: 9999999 }} />
      </View> */}

      <FlatList
        data={unassignedChats}
        keyExtractor={(chat: ChatType) => chat.id.toString()}
        renderItem={({ item }) => <InboxChat chat={{ ...item }} />}
        showsVerticalScrollIndicator={false}
      />

      {/* {unassignedChats?.map((chat: ChatType) => (
        <InboxChat key={chat.id} chat={{ ...chat }} />
      ))} */}
    </View>
  );
}
