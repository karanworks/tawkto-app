import * as React from "react";
import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { CircleUser } from "~/lib/icons/CircleUser";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { BriefcaseBusiness } from "~/lib/icons/BriefcaseBusiness";
import { UsersRound } from "~/lib/icons/UsersRound";
import { useRouter } from "expo-router";
import { getItem } from "~/helper/storage";

export default function Profile() {
  const [user, setUser] = React.useState(null);

  const router = useRouter();
  console.log("PROFILE PAGE RENDERED");

  React.useEffect(() => {
    async function loadUser() {
      const storedUser = await getItem("user");
      if (storedUser) setUser(storedUser);
      console.log("GOT THE USER IN PROFILE ->", storedUser);
    }
    loadUser();
  }, []);

  function handleNavigateToAccountSettings() {
    router.push("/accountSettings");
  }
  function handleNavigateToWorkspaceSettings() {
    router.push("/workspaceSettings");
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
    {
      name: "Manage Members",
      icon: UsersRound,
      description: "Invite new members and manage the older ones.",
      onPress: () => {
        console.log("Manager members button was clicked");
      },
    },
  ];

  return (
    <View
      className="flex-1 p-3 bg-secondary"
      style={styles.androidSafeAreaView}
    >
      <View className="mb-4">
        <Text style={styles.welcomeText}>Welcome Karan!</Text>
      </View>

      <Card className="w-full rounded-2xl">
        {/* <CardHeader>
          
          <View className="p-3" />
          <CardTitle className="pb-2">Profile Settings</CardTitle>
          <View className="flex-row">
            <CardDescription className="text-base font-semibold">
              Scientist
            </CardDescription>
            
          </View>
        </CardHeader> */}
        <CardContent className="p-4">
          <View>
            {settings?.map((setting, index) => (
              <TouchableOpacity
                key={index}
                onPress={setting.onPress}
                activeOpacity={0.6}
              >
                <View className="flex flex-row items-center justify-between p-4 border-b-2 border-gray-50">
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
                        <Text className="text-gray-600">
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
          </View>
        </CardContent>
        {/* <CardFooter className="flex-col gap-3 pb-0">
          <View className="flex-row items-center overflow-hidden">
            <Text className="text-sm text-muted-foreground">Productivity:</Text>
            <LayoutAnimationConfig skipEntering>
              <Animated.View
                key={progress}
                entering={FadeInUp}
                exiting={FadeOutDown}
                className="w-11 items-center"
              >
                <Text className="text-sm font-bold text-sky-600">
                  {progress}%
                </Text>
              </Animated.View>
            </LayoutAnimationConfig>
          </View>
          <Progress
            value={progress}
            className="h-2"
            indicatorClassName="bg-sky-600"
          />
          <View />
          <Button
            variant="outline"
            className="shadow shadow-foreground/5"
            onPress={updateProgressValue}
          >
            <Text>Update</Text>
          </Button>
        </CardFooter> */}
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
