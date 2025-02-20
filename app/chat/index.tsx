import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ListRenderItem,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ChatType, Messagetype } from "../../.expo/types/types";
import { useColorScheme } from "react-native";
import { useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "../_layout";
import socket from "~/socket/socket";
import useGetUser from "~/hooks/getUser";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { SquareCheckBig } from "~/lib/icons/SquareCheckBig";
import { handleIncomingMessageUpdate } from "~/slices/chats/reducer";
import { updateSolvedChat } from "~/slices/inbox/thunk";
import TypingAnimation from "./TypingAnimation";
import { useSegments } from "expo-router";

interface ItemPropType {
  item: Messagetype;
}

interface TypingProp {
  id: string;
}

function ChatMessaging() {
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState<{ [key: string]: boolean }>({});
  const flatListRef = useRef<FlatList>(null);

  const segments = useSegments();

  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#fff" : "#000";
  const user = useGetUser();
  const dispatch = useAppDispatch();

  const activeChat = useSelector(
    (state: RootState) => state.Chats.activeChat
  ) as ChatType | null;

  const router = useRouter();

  function handleTypingStatus({ id: userId }: TypingProp) {
    setIsTyping((prevStatus) => ({
      ...prevStatus,
      [userId]: true,
    }));

    setTimeout(() => {
      setIsTyping((prevStatus) => ({
        ...prevStatus,
        [userId]: false,
      }));
    }, 2000);
  }

  useEffect(() => {
    socket.on("typing", handleTypingStatus);

    return () => {
      socket.off("typing", handleTypingStatus);
    };
  }, []);

  useEffect(() => {
    socket.on("message", scrollToBottom);

    return () => {
      socket.off("message", scrollToBottom);
    };
  }, [activeChat]);
  function scrollToBottom() {
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  const handleSendMessage = () => {
    if (newMessage.trim().length === 0 || !user || !activeChat) return;

    socket.emit("message", {
      message: { content: newMessage },
      chatId: activeChat.id,
      sender: {
        name: user.name,
        agentId: user.id,
        type: "agent",
      },
      to: activeChat.visitorId,
    });

    setNewMessage("");
  };

  function handleTypingMessage(text: string) {
    if (!user || !activeChat) return;

    setNewMessage(text);
    socket.emit("typing", {
      user: {
        name: user.name,
        agentId: user.id,
        visitorId: activeChat.visitor.id,
        workspaceId: user.workspace.id,

        type: "agent",
      },
    });
  }

  function handleSolveMessage(chatId: string) {
    dispatch(updateSolvedChat({ chatId, status: "solved" }));
    router.navigate("/(tabs)");
  }

  const renderMessage: ListRenderItem<Messagetype> = ({
    item: message,
  }: ItemPropType) => (
    <View
      style={[
        styles.messageContainer,
        message.sender.type === "agent"
          ? styles.myMessage
          : styles.theirMessage,
      ]}
    >
      {message.sender.type === "visitor" && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          message.sender.type === "agent"
            ? styles.myBubble
            : styles.theirBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            message.sender.type === "agent"
              ? styles.myMessageText
              : styles.theirMessageText,
          ]}
        >
          {message.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            message.sender.type === "agent"
              ? styles.myTimestamp
              : styles.theirTimestamp,
          ]}
        >
          {moment(message.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      {activeChat && (
        <KeyboardAvoidingView
          className="bg-background"
          style={{ ...styles.container }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color={iconColor} />
            </TouchableOpacity>

            <View className="w-full flex flex-row justify-between items-center pr-7">
              <View className="flex flex-row gap-2">
                <View style={styles.headerAvatar}>
                  <Text style={styles.headerAvatarText}>C</Text>
                </View>

                <View>
                  <Text className="text-primary" style={styles.headerTitle}>
                    {activeChat.visitor.name}
                  </Text>
                  <Text className="text-primary text-sm">Online</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => handleSolveMessage(activeChat.id)}
              >
                <SquareCheckBig size={30} strokeWidth={2} color="#00a62f" />
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={activeChat.messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
            ref={flatListRef}
            ListFooterComponent={
              isTyping[activeChat.visitor.id] ? (
                <View className="flex flex-row items-center mt-2">
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>C</Text>
                  </View>
                  <TypingAnimation />
                </View>
              ) : null
            }
          />

          {/* {isTyping && (
            <View className="flex flex-row items-center gap-2 mb-3">
              <View style={styles.headerAvatar}>
                <Text style={styles.headerAvatarText}>C</Text>
              </View>

              <View>
                <TypingAnimation />
              </View>
            </View>
          )} */}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={handleTypingMessage}
              placeholder="Type a message..."
              multiline
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Ionicons
                name="send"
                size={24}
                color={newMessage.trim() ? "#00A7E1" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

export default ChatMessaging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop:
      Platform.OS === "android" && StatusBar.currentHeight
        ? StatusBar.currentHeight + 16
        : 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#00A7E1",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  headerAvatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  messagesList: {
    paddingInline: 16,
    paddingTop: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  myMessage: {
    justifyContent: "flex-end",
  },
  theirMessage: {
    justifyContent: "flex-start",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#00A7E1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  messageBubble: {
    maxWidth: "75%",
    paddingBlock: 5,
    paddingInline: 10,
    borderRadius: 5,
  },
  myBubble: {
    backgroundColor: "#00A7E1",
  },
  theirBubble: {
    backgroundColor: "#F0F0F0",
  },
  messageText: {
    fontSize: 16,
  },
  myMessageText: {
    color: "#FFFFFF",
  },
  theirMessageText: {
    color: "#000000",
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
  },
  myTimestamp: {
    color: "rgba(255, 255, 255, 0.7)",
    alignSelf: "flex-end",
  },
  theirTimestamp: {
    color: "#666",
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    alignItems: "flex-end",
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginRight: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
});
