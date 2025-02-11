import * as React from "react";
import { Pressable, View } from "react-native";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import InboxChat from "~/components/InboxChat";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import { ChatType } from "~/.expo/types/types";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { getSolvedChats, getUnassignedChats } from "~/slices/inbox/thunk";
import useGetUser from "~/hooks/getUser";

export default function Inbox() {
  const user = useGetUser();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { unassignedChats, solvedChats } = useSelector(
    (state: RootState) => state.Inbox
  );

  React.useEffect(() => {
    if (!user) return;

    dispatch(
      getUnassignedChats({ workspaceId: user.workspace.id, agentId: user.id })
    );
    dispatch(
      getSolvedChats({ workspaceId: user.workspace.id, agentId: user.id })
    );
  }, [user]);

  function handleNavigateToUnassignedChats() {
    router.push("/unassignedChats");
  }
  function handleNavigateToSolvedChats() {
    router.push("/solvedChats");
  }

  console.log("SOLVED CHATS ->", solvedChats);

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
              <Text style={{ fontSize: 20 }}>
                {unassignedChats.length.toString().padStart(2, "0")}
              </Text>
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
              <Text style={{ fontSize: 20 }}>
                {solvedChats.length.toString().padStart(2, "0")}
              </Text>
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
              }}
            >
              Latest Unassigned Messages
            </Text>
          </View>
          <View>
            {unassignedChats.slice(0, 5).map((chat: ChatType) => (
              <InboxChat key={chat.id} chat={chat} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
