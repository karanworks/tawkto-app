import * as React from "react";
import { Image, TouchableOpacity, View } from "react-native";
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
import { Input } from "~/components/ui/input";
import logoLight from "../assets/images/logo-light.png";
import { Link, useNavigation, useRouter } from "expo-router";

const GITHUB_AVATAR_URI =
  "https://i.pinimg.com/originals/ef/a2/8d/efa28d18a04e7fa40ed49eeb0ab660db.jpg";

export default function Screen() {
  const [progress, setProgress] = React.useState(78);
  const navigation = useNavigation();
  const router = useRouter();

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
  }

  // Handle the navigation when "Go to chats page" is clicked
  function goToChatsPage() {
    router.push("/(tab)/index"); // Replace with your actual route name
  }

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm pb-6 rounded-2xl">
        <CardHeader className="items-center">
          {/* <Avatar alt="Rick Sanchez's Avatar" className="w-24 h-24">
          <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
          <AvatarImage source={logoLight} />
            <AvatarFallback>
              <Text>Webwers</Text>
            </AvatarFallback>

          </Avatar> */}
          <Image source={logoLight} style={{ width: 75, height: 75 }} />
          <View className="p-3" />
          <CardTitle className="pb-2 text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <View className="justify-around gap-3 w-full">
            <View className="items-center justify-between flex-row">
              <Text className="text-foreground">Email</Text>
              <Input
                placeholder="Enter your email"
                aria-labelledby="email"
                aria-errormessage="emailError"
                className="w-64"
              />
            </View>
            <View className="items-center justify-between flex-row">
              <Text className="text-foreground">Password</Text>
              <Input
                placeholder="Enter your password"
                aria-labelledby="email"
                aria-errormessage="emailError"
                className="w-64"
              />
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="default"
            className="shadow shadow-foreground/5"
            onPress={updateProgressValue}
            style={{ backgroundColor: "#25A0E2" }}
          >
            <Text>Login</Text>
          </Button>

          {/* onPress={goToChatsPage} */}
          <TouchableOpacity>
            <Link href="(tabs)">
              <Text className="text-blue-500">Go to chats page</Text>
            </Link>
          </TouchableOpacity>
        </CardFooter>
      </Card>
    </View>
  );
}
