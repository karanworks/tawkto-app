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
          headerRight: () => (
            <View className="pr-4">
              <Inbox className="text-foreground" size={23} strokeWidth={1.25} />
            </View>
          ),
          tabBarIcon: () => (
            <MessageCircle
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          headerRight: () => (
            <View className="pr-4">
              <Inbox className="text-foreground" size={23} strokeWidth={1.25} />
            </View>
          ),
          tabBarIcon: () => (
            <Inbox
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => (
            <UserRound
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabRoot;
