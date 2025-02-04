import * as React from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
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
// import { Text } from "~/components/ui/text";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Input } from "~/components/ui/input";
const logoLight = require("../assets/images/logo-light.png");
import { Link, useNavigation, useRouter } from "expo-router";
import { Label } from "~/components/ui/label";

export default function Screen() {
  const [progress, setProgress] = React.useState(78);
  const navigation = useNavigation();
  const router = useRouter();

  function updateProgressValue() {
    setProgress(Math.floor(Math.random() * 100));
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
          <Image source={logoLight} style={{ width: 60, height: 60 }} />
          <View className="p-2" />
          <View className="flex items-center pb-2 text-center">
            <View style={{ marginBottom: 3 }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                }}
              >
                Welcome back!
              </Text>
            </View>

            <View>
              <Text
                style={{
                  fontSize: 16,
                }}
                className="text-gray-600"
              >
                Please enter your details to login
              </Text>
            </View>
          </View>
        </CardHeader>
        <CardContent>
          <View className="justify-around gap-4 w-full">
            <View>
              <Label
                nativeID="email"
                className="text-foreground text-gray-700"
                style={{ fontSize: 16, marginBottom: 5 }}
              >
                Email
              </Label>
              <Input
                placeholder="example@gmail.com"
                id="email"
                aria-labelledby="email"
                aria-errormessage="emailError"
              />
            </View>
            <View>
              <Label
                nativeID="password"
                className="text-foreground text-gray-700"
                style={{ fontSize: 16, marginBottom: 5 }}
              >
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                aria-labelledby="email"
                aria-errormessage="emailError"
              />
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="default"
            className="shadow shadow-foreground/5 w-full"
            onPress={updateProgressValue}
            style={{ backgroundColor: "#25A0E2" }}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>

          {/* onPress={goToChatsPage} */}
          <TouchableOpacity>
            <Link href="/(tabs)">
              <Text className="text-blue-500">Go to chats page</Text>
            </Link>
          </TouchableOpacity>
        </CardFooter>
      </Card>
    </View>
  );
}
