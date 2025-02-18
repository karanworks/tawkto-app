import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Bell, Clock } from "lucide-react-native";
import usePushNotification from "~/hooks/usePushNotification";
import * as Notifications from "expo-notifications";

export default function NotificationsScreen() {
  const { notification } = usePushNotification();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (notification) {
      setNotifications((prev) => [notification, ...prev]);
    }

    // Listen for manual notifications
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotifications((prev) => [notification, ...prev]);
      }
    );

    return () => {
      subscription.remove();
    };
  }, [notification]);

  return (
    <View className="flex-1 p-4 bg-white dark:bg-black">
      <Text className="text-xl font-bold mb-4">Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center p-4 mb-3 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg">
            {/* Notification Icon */}
            <Bell size={24} className="text-blue-500 mr-3" />

            {/* Notification Content */}
            <View className="flex-1">
              <Text className="text-lg font-semibold text-black dark:text-white">
                {item.request.content.title}
              </Text>
              <Text className="text-gray-600 dark:text-gray-400">
                {item.request.content.body}
              </Text>
            </View>

            {/* Time Icon (Placeholder) */}
            <Clock size={16} className="text-gray-500 ml-2" />
          </View>
        )}
      />
    </View>
  );
}
