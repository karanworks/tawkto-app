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
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Messagetype } from "../../.expo/types/types";

// interface MessageType {
//   id: string;
//   text: string;
//   sender: string;
//   timestamp: string;
// }

function ChatMessaging() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello!", sender: "them", timestamp: "02:15 PM" },
    {
      id: "2",
      text: "Hi there! How are you?",
      sender: "me",
      timestamp: "02:16 PM",
    },
    {
      id: "3",
      text: "I m doing great, thanks for asking!",
      sender: "them",
      timestamp: "02:17 PM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const router = useRouter();

  const sendMessage = () => {
    if (newMessage.trim().length === 0) return;

    const message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  const renderMessage: ListRenderItem<Messagetype> = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "me" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      {item.sender === "them" && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender === "me" ? styles.myBubble : styles.theirBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender === "me"
              ? styles.myMessageText
              : styles.theirMessageText,
          ]}
        >
          {item.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            item.sender === "me" ? styles.myTimestamp : styles.theirTimestamp,
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>

        <View className="flex flex-row gap-2">
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>C</Text>
          </View>

          <View>
            <Text style={styles.headerTitle}>Chetan Subedi</Text>
            <Text className="text-fray-700 text-sm">Online</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        inverted={false}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
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
  );
}

export default ChatMessaging;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop:
      Platform.OS === "android" && StatusBar.currentHeight
        ? StatusBar.currentHeight + 16
        : 16,
    backgroundColor: "#FFFFFF",
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
    padding: 16,
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
    backgroundColor: "#FFFFFF",
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
