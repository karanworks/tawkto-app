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
import SolvedChat from "~/components/SolvedChat";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import { ChatType, User } from "~/.expo/types/types";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { getItem } from "~/helper/storage";
import { getSolvedChats } from "~/slices/inbox/thunk";

export default function SolvedChats() {
  const [user, setUser] = React.useState<User | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { solvedChats } = useSelector((state: RootState) => state.Inbox);

  console.log("SOLVED CHATS INSIDE THE PAGE ->", solvedChats);

  React.useEffect(() => {
    async function loadUser() {
      const storedUser = await getItem("user");
      if (storedUser) setUser(storedUser);
    }
    loadUser();
  }, []);

  React.useEffect(() => {
    if (!user) return;

    dispatch(
      getSolvedChats({ workspaceId: user.workspace.id, agentId: user.id })
    );
  }, [user]);

  // function handleNavigateToChat() {
  //   router.push("/solvedChat");
  // }

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
