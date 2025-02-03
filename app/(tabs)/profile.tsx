import * as React from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
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
import { CircleUser } from "~/lib/icons/CircleUser";
import { ChevronRight } from "~/lib/icons/ChevronRight";
import { BriefcaseBusiness } from "~/lib/icons/BriefcaseBusiness";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Profile() {
  const [progress, setProgress] = React.useState(78);

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  const settings = [
    {
      name: "Account Settings",
      icon: CircleUser,
      description: "Manage your name, email here.",
    },
    {
      name: "Workspace Settings",
      icon: BriefcaseBusiness,
      description: "Manage your workspace settings like name, members etc here.",
    }

  ]

  return (


    <View className="flex-1 mt-16 p-3 bg-secondary" style={styles.androidSafeAreaView}>

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


            {
              
              settings?.map((setting,index) => (





          
          <View className="flex flex-row items-center justify-between p-4 border-b-2 border-gray-50" key={index}>

            <View className="flex flex-row gap-4 items-center">

            <View>
                      {React.createElement(setting.icon, { className: "text-foreground", size: 23, strokeWidth: 1.25 })}

              </View>
              
              <View className="w-72">
                <Text style={{ fontSize: 16, }}>{setting.name}</Text>
                
              <View>    
                        <Text className="text-gray-600">{setting.description}</Text>
              </View>

            </View>
            </View>

            <View>
                              <ChevronRight  className="text-foreground" size={23} strokeWidth={1.25}  />

            </View>
            
            </View>





              ))


          }
            

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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0

  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "bold"
  }
})