import {
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ChatType, Messagetype } from "../../.expo/types/types";
import { RootState } from "../_layout";
import { useSelector } from "react-redux";
import moment from "moment";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { updateSolvedChat } from "~/slices/inbox/thunk";
import { handleActiveChat } from "~/slices/chats/reducer";

interface ItemPropType {
  item: Messagetype;
}

function SolvedChat() {
  const solvedActiveChat = useSelector(
    (state: RootState) => state.Inbox.solvedActiveChat
  ) as ChatType | null;

  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleSolvedChat() {
    if (!solvedActiveChat) {
      return;
    }
    dispatch(
      updateSolvedChat({ chatId: solvedActiveChat.id, status: "accepted" })
    ).then(() => {
      dispatch(handleActiveChat(solvedActiveChat));
      router.navigate("/chat");
    });
  }

  const renderMessage: ListRenderItem<Messagetype> = ({
    item,
  }: ItemPropType) => (
    <View
      style={[
        styles.messageContainer,
        item.sender.type === "agent" ? styles.myMessage : styles.theirMessage,
      ]}
    >
      {item.sender.type === "visitor" && (
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>C</Text>
        </View>
      )}
      <View
        style={[
          styles.messageBubble,
          item.sender.type === "agent" ? styles.myBubble : styles.theirBubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            item.sender.type === "agent"
              ? styles.myMessageText
              : styles.theirMessageText,
          ]}
        >
          {item.content}
        </Text>
        <Text
          style={[
            styles.timestamp,
            item.sender.type === "agent"
              ? styles.myTimestamp
              : styles.theirTimestamp,
          ]}
        >
          {moment(item.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );

  return (
    <>
      {solvedActiveChat && (
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
                <Text style={styles.headerTitle}>
                  {solvedActiveChat.visitor.name}
                </Text>
                <Text className="text-fray-700 text-sm">Online</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={solvedActiveChat.messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
          />

          <View style={styles.joinButtonContainer}>
            <TouchableOpacity
              onPress={handleSolvedChat}
              style={styles.joinButton}
            >
              <View>
                <Text
                  style={{ color: "white", fontSize: 16, paddingInline: 10 }}
                >
                  Start Conversation Again
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 15, color: "#99A1AF" }}>
                Start conversation to start chatting again!
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

export default SolvedChat;

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
  joinButtonContainer: {
    display: "flex",
    alignItems: "center",
    paddingBlock: 18,
    borderTopWidth: 1,
    borderColor: "#F9FAFB",
    gap: 5,
  },
  joinButton: {
    width: 200,
    height: 40,
    backgroundColor: "#25A0E2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    borderRadius: 5,
  },
});
