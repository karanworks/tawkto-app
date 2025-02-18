import { useState } from "react";
import { Image, TouchableOpacity, View, Text } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
const logoLight = require("../assets/images/logo-light.png");
import { Link, useRouter } from "expo-router";
import { Label } from "~/components/ui/label";
import { login } from "../slices/login/thunk";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import usePushNotification from "~/hooks/usePushNotification";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { sendPushNotification, expoPushToken } = usePushNotification();

  function handleFormSubmit() {
    dispatch(login({ email, password })).then((res) => {
      router.navigate("/(tabs)");
    });
  }

  function handleEmailChange(text: string) {
    setEmail(text);
  }
  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  return (
    <View className="flex-1 justify-center items-center gap-5 p-6 bg-secondary/30">
      <Card className="w-full max-w-sm pb-6 rounded-2xl">
        <CardHeader className="items-center">
          <Image source={logoLight} style={{ width: 60, height: 60 }} />
          <View className="p-2" />
          <View className="flex items-center pb-2 text-center">
            <View style={{ marginBottom: 3 }}>
              <Text
                className="text-primary"
                style={{
                  fontSize: 22,
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
                className="text-primary"
                style={{ fontSize: 16, marginBottom: 5 }}
              >
                Email
              </Label>
              <Input
                placeholder="example@gmail.com"
                id="email"
                aria-labelledby="email"
                aria-errormessage="emailError"
                value={email}
                onChangeText={handleEmailChange}
              />
            </View>
            <View>
              <Label
                nativeID="password"
                className="text-primary"
                style={{ fontSize: 16, marginBottom: 5 }}
              >
                Password
              </Label>
              <Input
                id="password"
                placeholder="Enter your password"
                aria-labelledby="email"
                aria-errormessage="emailError"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
              />
            </View>
          </View>
        </CardContent>
        <CardFooter className="flex-col gap-3 pb-0">
          <Button
            variant="default"
            className="shadow shadow-foreground/5 w-full"
            style={{ backgroundColor: "#25A0E2" }}
            onPress={handleFormSubmit}
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
          <Button
            variant="default"
            className="shadow shadow-foreground/5 w-full"
            style={{ backgroundColor: "#25A0E2" }}
            onPress={() => {
              if (expoPushToken) {
                sendPushNotification(
                  expoPushToken,
                  "You have received a new message",
                  "Hiii"
                );
              }
            }}
          >
            <Text style={{ color: "white" }}>Send Notification</Text>
          </Button>

          {/* onPress={goToChatsPage} */}
          {/* <TouchableOpacity>
            <Link href="/(tabs)">
              <Text className="text-blue-500">Go to chats page</Text>
            </Link>
          </TouchableOpacity> */}
        </CardFooter>
      </Card>
    </View>
  );
}
