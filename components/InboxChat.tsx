import * as React from "react";
import { View } from "react-native";
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

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

function InboxChat({ chat }) {
  return (
    <View
      className="flex flex-row items-center w-full gap-2 border-b border-b-gray-100 "
      style={{ height: 70 }}
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
            {chat.initial}
          </Text>
        </View>
      </View>

      <View className="flex gap-1" style={{ width: 290 }}>
        <View className="flex flex-row justify-between">
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "red#333333",
              }}
            >
              {chat.name}
            </Text>
          </View>

          <View>
            <Text style={{ fontSize: 12, color: "#404040" }}>{chat.time}</Text>
          </View>
        </View>
        <View className="flex flex-row items-end justify-between align gap-2">
          <View>
            <Text style={{ fontSize: 15, color: "#404040" }} numberOfLines={1}>
              {chat.message}
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
    </View>
  );
}

export default InboxChat;
