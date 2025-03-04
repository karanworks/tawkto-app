import * as React from "react";
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { CircleUser } from "~/lib/icons/CircleUser";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { BriefcaseBusiness } from "~/lib/icons/BriefcaseBusiness";
import { UsersRound } from "~/lib/icons/UsersRound";
import { useRouter } from "expo-router";
import { removeItem } from "~/helper/storage";
import { Button } from "~/components/ui/button";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Profile() {
  const router = useRouter();
  const { isDarkColorScheme } = useColorScheme();

  function handleNavigateToAccountSettings() {
    router.navigate("/accountSettings");
  }
  function handleNavigateToWorkspaceSettings() {
    router.navigate("/workspaceSettings");
  }

  async function handleLogout() {
    await removeItem("user");
    router.dismissAll();
    //TODO: REDIRECTING TO LOGIN PAGE AFTER LOGOUT
  }

  const settings = [
    {
      name: "Account Settings",
      icon: CircleUser,
      description: "Manage your name, email and other details here.",
      onPress: handleNavigateToAccountSettings,
    },
    {
      name: "Workspace Settings",
      icon: BriefcaseBusiness,
      description:
        "Manage your workspace settings like name, members etc here.",
      onPress: handleNavigateToWorkspaceSettings,
    },
    // {
    //   name: "Manage Members",
    //   icon: UsersRound,
    //   description: "Invite new members and manage the older ones.",
    //   onPress: () => {
    //     console.log("Manager members button was clicked");
    //   },
    // },
  ];

  return (
    <View
      className="flex-1 p-3 bg-secondary"
      // style={}
      style={{
        ...styles.androidSafeAreaView,
        backgroundColor: `${isDarkColorScheme ? "#212529" : "white"}`,
      }}
    >
      <View className="mb-4">
        <Text style={styles.welcomeText}>Welcome Karan!</Text>
      </View>

      <Card
        className="w-full rounded-2xl"
        style={{
          backgroundColor: isDarkColorScheme ? "#292E32" : "#e5e5e5",
        }}
      >
        <CardContent className="p-4">
          <View>
            {settings?.map((setting, index) => (
              <TouchableOpacity
                key={index}
                onPress={setting.onPress}
                activeOpacity={0.6}
              >
                <View
                  className={`flex flex-row items-center justify-between p-4 border-b ${
                    isDarkColorScheme
                      ? "border-b-gray-700"
                      : "border-b-gray-100"
                  }`}
                >
                  <View className="flex flex-row gap-4 items-center">
                    <View>
                      {React.createElement(setting.icon, {
                        className: "text-foreground",
                        size: 23,
                        strokeWidth: 1.25,
                      })}
                    </View>

                    <View className="w-72">
                      <Text style={{ fontSize: 16 }}>{setting.name}</Text>

                      <View>
                        <Text
                          className={
                            isDarkColorScheme
                              ? "text-gray-300"
                              : "text-gray-600"
                          }
                        >
                          {setting.description}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View>
                    <ChevronRight
                      className="text-foreground"
                      size={23}
                      strokeWidth={1.25}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View
              style={{
                width: "90%",
                alignSelf: "center",
                marginTop: 15,
              }}
            >
              <Button
                variant="outline"
                style={{
                  borderColor: "#fa0f2e",
                  backgroundColor: isDarkColorScheme ? "#292E32" : "#e5e5e5",
                }}
                onPress={handleLogout}
              >
                <Text style={{ color: "#fa0f2e" }}>Logout</Text>
              </Button>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  androidSafeAreaView: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
