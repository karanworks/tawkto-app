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

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Chats() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  const chatsData = [
    {
      id: 1,
      name: "Chetan Subedi",
      // message: "Hey, Chetan this side",
      message: "Hey, Chetan this side from Ascent BPO.",
      messageCount: 3,
      time: "02:15 PM",
      initial: "C",
    },
    {
      id: 2,
      name: "Karan",
      message: "Hey!",
      messageCount: 3,
      time: "01:23 PM",
      initial: "K",
    },
    {
      id: 3,
      name: "Vicky",
      message: "Hello guys welcome to my podcast!",
      messageCount: 3,
      time: "01:23 PM",
      initial: "V",
    },
    {
      id: 4,
      name: "Pihu",
      message: "Hello, I am pihu.",
      messageCount: 3,
      time: "01:23 PM",
      initial: "P",
    },
  ];

  return (
    <View className="flex-1 items-center  bg-secondary/30 pt-2">
      {chatsData?.map((chat) => (
        <View
          className="flex flex-row items-center w-full px-2 gap-3 border-b border-b-gray-100 "
          style={{ height: 70 }}
          key={chat.id}
        >
          <View
            className="flex justify-center items-center rounded-full "
            style={{ backgroundColor: "#25A0E2", height: 50, width: 50 }}
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

          <View className="flex gap-1" style={{ width: 310 }}>
            <View className="flex flex-row justify-between">
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: "#242424" }}
                >
                  {chat.name}
                </Text>
              </View>

              <View>
                <Text style={{ fontSize: 16, color: "#242424" }}>
                  {chat.time}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-end justify-between align gap-2">
              <View style={{ width: 280 }}>
                <Text
                  style={{ fontSize: 18, color: "#404040" }}
                  numberOfLines={1}
                >
                  {chat.message}
                </Text>
              </View>

              <View
                className="flex items-center justify-center rounded-full"
                style={{ backgroundColor: "#25A0E2", height: 22, width: 22 }}
              >
                <Text style={{ fontSize: 16, color: "white" }}>
                  {chat.messageCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
