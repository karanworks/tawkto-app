import * as React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
} from "react-native-reanimated";
import { Info } from "~/lib/icons/Info";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { chatsData } from "~/common/chatData";
import { ChatType } from "~/.expo/types/types";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useRouter } from "expo-router";
import { getUnassignedChatMessages } from "~/slices/inbox/thunk";
import moment from "moment";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

interface PropType {
  chat: ChatType;
}

function InboxChat({ chat }: PropType) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleNavigateToChat(chatId: string) {
    dispatch(getUnassignedChatMessages({ chatId }));
    router.navigate("/unassignedChat");
  }

  return (
    <Pressable
      className="flex flex-row items-center w-full gap-2 border-b border-b-gray-100 "
      style={{ height: 70 }}
      onPress={() => handleNavigateToChat(chat.id)}
    >
      <View
        className="flex justify-center items-center rounded-full "
        style={{ backgroundColor: "#25A0E2", height: 47, width: 47 }}
      >
        <View className="flex items-center justify-center">
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {chat.visitor.name.charAt(0)}
          </Text>
        </View>
      </View>

      <View className="flex gap-1" style={{ width: 290 }}>
        <View className="flex flex-row justify-between">
          <View>
            <Text
              className="text-primary"
              style={{
                fontSize: 16,
                fontWeight: "bold",
                // color: "#333333",
              }}
            >
              {chat.visitor.name}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 12, color: "#404040" }}>
              {chat.messages.length !== 0
                ? moment(
                    chat.messages[chat.messages.length - 1].createdAt
                  ).fromNow()
                : "No messages"}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-end justify-between align gap-2">
          <View>
            <Text style={{ fontSize: 15, color: "#404040" }} numberOfLines={1}>
              {chat.messages.length !== 0 &&
                chat.messages[chat.messages.length - 1].content}
            </Text>
          </View>

          {/* <View
            className="flex items-center justify-center rounded-full"
            style={{ backgroundColor: "#25A0E2", height: 18, width: 18 }}
          >
            <Text style={{ fontSize: 12, color: "white" }}>
              {chat.messageCount}
            </Text>
          </View> */}
        </View>
      </View>
    </Pressable>
  );
}

export default InboxChat;
