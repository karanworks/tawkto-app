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
import Chat from "~/components/Chat";
import { Input } from "~/components/ui/input";
import { Search } from "~/lib/icons/Search";
import { useRouter } from "expo-router";
import { RootState } from "../_layout";
import { ChatType } from "~/.expo/types/types";
import { useSelector } from "react-redux";
import InboxChat from "~/components/InboxChat";

export default function UnassignedChats() {
  const router = useRouter();
  const { unassignedChats } = useSelector((state: RootState) => state.Inbox);

  // function handleNavigateToChat() {
  //   router.push("/unassignedChat");
  // }

  return (
    <View className="flex-1 items-center  bg-secondary/30 px-3">
      <View className="w-full" style={{ marginBlock: 10 }}>
        <Input placeholder="Search chat" />
        <Search style={{ position: "absolute", zIndex: 9999999 }} />
      </View>

      {unassignedChats?.map((chat: ChatType) => (
        <InboxChat key={chat.id} chat={{ ...chat }} />
      ))}
    </View>
  );
}
