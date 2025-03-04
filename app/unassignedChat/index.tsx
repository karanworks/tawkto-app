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
import { useSelector } from "react-redux";
import { RootState } from "../_layout";
import moment from "moment";
import socket from "~/socket/socket";
import useGetUser from "~/hooks/getUser";
import { handleActiveChat, handleAddChat } from "~/slices/chats/reducer";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useColorScheme } from "~/lib/useColorScheme";

interface ItemPropType {
  item: Messagetype;
}

function UnassignedChat() {
  const unassingedActiveChat = useSelector(
    (state: RootState) => state.Inbox.unassingedActiveChat
  ) as ChatType | null;

  const router = useRouter();
  const user = useGetUser();
  const dispatch = useAppDispatch();
  const { isDarkColorScheme } = useColorScheme();

  function handleJoinConversation() {
    if (!user || !unassingedActiveChat) {
      return;
    }

    socket.emit("join-conversation", {
      agentId: user.id,
      visitorId: unassingedActiveChat.visitorId,
      chatId: unassingedActiveChat.id,
      workspaceId: user.workspace.id,
    });

    dispatch(handleActiveChat(unassingedActiveChat));
    dispatch(handleAddChat(unassingedActiveChat));
    router.navigate("/chat");

    // toast.success("Chat moved to open chats !", {
    //   position: "bottom-center",
    //   autoClose: 3000,
    //   theme: "colored",
    // });
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
      {unassingedActiveChat && (
        <KeyboardAvoidingView
          // style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
          style={{
            ...styles.container,
            backgroundColor: `${isDarkColorScheme ? "#212529" : "white"}`,
          }}
        >
          <View
            style={{
              ...styles.header,
              backgroundColor: `${isDarkColorScheme ? "#212529" : "white"}`,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>

            <View className="flex flex-row gap-2">
              <View style={styles.headerAvatar}>
                <Text style={styles.headerAvatarText}>C</Text>
              </View>

              <View>
                <Text
                  style={styles.headerTitle}
                  className={`${
                    isDarkColorScheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {unassingedActiveChat.visitor.name}
                </Text>
                <Text
                  className={`text-sm ${
                    isDarkColorScheme ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Online
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            data={unassingedActiveChat.messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
          />

          <View style={styles.joinButtonContainer}>
            <TouchableOpacity
              onPress={handleJoinConversation}
              style={styles.joinButton}
            >
              <View>
                <Text style={{ color: "white", fontSize: 16 }}>
                  Join Conversation
                </Text>
              </View>
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 15, color: "#99A1AF" }}>
                Join conversation to start chatting!
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

export default UnassignedChat;

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
    // backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    paddingBlock: 18,
    borderTopWidth: 1,
    borderColor: "#F9FAFB",
    gap: 5,
  },
  joinButton: {
    width: 180,
    height: 40,
    backgroundColor: "#25A0E2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    borderRadius: 5,
  },
});
