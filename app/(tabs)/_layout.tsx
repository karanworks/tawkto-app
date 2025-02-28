import React, { useEffect, useRef } from "react";
import { Tabs } from "expo-router";
import TabBar from "~/components/TabBar";
import usePushNotification from "~/hooks/usePushNotification";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { handleActiveChat } from "~/slices/chats/reducer";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import * as Notifications from "expo-notifications";

const TabRoot = () => {
  const { chats } = useSelector((state: RootState) => state.Chats);
  const dispatch = useAppDispatch();
  const notificationResponseRef = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    notificationResponseRef.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const chatId = response.notification.request.content.data.chatId;

        if (chatId) {
          const chat = chats.find((chat) => chat.id === chatId);
          console.log(
            "NOTIFICATION WAS LISTENED IN THE TABROOT AS WELL ->",
            response.notification.request.content.data
          );

          const checkingChats = chats.map((chat) => chat.id);

          console.log("GETTING CHATS ->", checkingChats);

          dispatch(handleActiveChat(chat));
        }
      });

    return () => {
      notificationResponseRef.current &&
        Notifications.removeNotificationSubscription(
          notificationResponseRef.current
        );
    };
  }, [chats]);

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
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
        }}
      />
    </Tabs>
  );
};

export default TabRoot;
