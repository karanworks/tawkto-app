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
import InboxChat from "~/components/InboxChat";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import { ChatType, User } from "~/.expo/types/types";
import { getItem } from "~/helper/storage";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { getUnassignedChats } from "~/slices/inbox/thunk";

export default function Inbox() {
  const [user, setUser] = React.useState<User | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { unassignedChats } = useSelector((state: RootState) => state.Inbox);

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
      getUnassignedChats({ workspaceId: user.workspace.id, agentId: user.id })
    );
  }, [user]);

  function handleNavigateToUnassignedChats() {
    console.log("UNASSIGNED FUNCTION BEING CALLED");

    router.push("/unassignedChats");
  }
  function handleNavigateToSolvedChats() {
    router.push("/solvedChats");
  }

  return (
    <View className="flex-1 gap-5 p-6 bg-secondary/30">
      <View>
        <View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>All Messages</Text>
        </View>

        <View style={{ marginTop: 3 }}>
          <Text style={{ fontSize: 14, color: "#7d7d7d" }}>
            Join new chats and review solved chats
          </Text>
        </View>
      </View>

      <View className="flex flex-row gap-4">
        <Card className="flex-1 items-center">
          <Pressable
            className="w-full items-center"
            onPress={handleNavigateToUnassignedChats}
          >
            <CardHeader>
              <CardTitle style={{ fontSize: 16 }}>Unassigned</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ fontSize: 20 }}>06</Text>
            </CardContent>
          </Pressable>
        </Card>

        <Card className="flex-1 items-center">
          <Pressable
            className="w-full items-center"
            onPress={handleNavigateToSolvedChats}
          >
            <CardHeader>
              <CardTitle style={{ fontSize: 16 }}>Solved</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ fontSize: 20 }}>15</Text>
            </CardContent>
          </Pressable>
        </Card>
      </View>

      <View style={{ marginTop: 15 }}>
        <View>
          <View>
            <Text
              className="text-primary"
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
                // color: "#3b3b3b",
              }}
            >
              Latest Unassigned Messages
            </Text>
          </View>
          <View>
            {/* {chatsData.map((chat) => (
              <InboxChat key={chat.id} chat={chat} />
            ))} */}
            {unassignedChats.map((chat: ChatType) => (
              <InboxChat key={chat.id} chat={chat} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
