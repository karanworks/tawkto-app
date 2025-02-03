import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Inbox } from "~/lib/icons/Inbox";
import { MessageCircle } from "~/lib/icons/MessageCircle";
import { UserRound } from "~/lib/icons/UserRound";
import TabBar from "~/components/TabBar";


const TabRoot = () => {
  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
         
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false
        }}
      />
    </Tabs>
  );
};

export default TabRoot;
