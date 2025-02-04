import * as React from "react";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ChatType } from "~/.expo/types/types";

interface ChatProps {
  chat: ChatType;
}

function Chat({ chat }: ChatProps) {
  return (
    <Pressable
      className="flex flex-row items-center w-full gap-3 border-b border-b-gray-100 "
      style={{ height: 70 }}
      onPress={chat.handleNavigateToChat}
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

      <View className="flex gap-1" style={{ width: 300 }}>
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
          <View style={{ width: 280 }}>
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
    </Pressable>
  );
}

export default Chat;
