import { Pressable, StyleSheet, View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Label } from "~/components/ui/label";
import { useColorScheme } from "~/lib/useColorScheme";
import useGetUser from "~/hooks/getUser";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { updateUser } from "~/slices/user/thunk";

function AccountSettings() {
  const user = useGetUser();
  const dispatch = useAppDispatch();

  const { isDarkColorScheme } = useColorScheme();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  // const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    if (user) {
      setNameValue(user?.name);
      setEmailValue(user?.email);
    }
  }, [user]);

  function handleUpdateDetails() {
    console.log("Update details button clicked", nameValue, emailValue);
    dispatch(
      updateUser({ userId: user?.id, name: nameValue, email: emailValue })
    );
  }

  return (
    <View
      style={{
        ...styles.cardContainer,
        backgroundColor: `${isDarkColorScheme ? "#212529" : "white"}`,
      }}
    >
      <Card
        className="w-full max-w-sm"
        style={{
          ...styles.updateDetailsCard,
          backgroundColor: `${isDarkColorScheme ? "#292E32" : "white"}`,
        }}
      >
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>
            Update your name and email other details
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 native:gap-2">
          <View className="gap-1">
            <Label nativeID="name">Name</Label>
            <Input
              aria-labelledby="name"
              value={nameValue}
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
              onChangeText={(text) => setNameValue(text)}
            />
          </View>
          <View className="gap-1">
            <Label nativeID="email">Email</Label>
            <Input
              id="email"
              value={emailValue}
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
              onChangeText={(text) => setEmailValue(text)}
            />
          </View>
          {/* <View className="gap-1">
            <Label nativeID="password">Password</Label>
            <Input
              id="password"
              value={passwordValue}
              secureTextEntry
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
              onChangeText={(text) => setPasswordValue(text)}
            />
          </View> */}
        </CardContent>
        <CardFooter>
          <Pressable
            onPress={handleUpdateDetails}
            style={styles.updateDetailsButtonContainer}
          >
            <View style={styles.updateDetailsButtonWrapper}>
              <Text style={styles.updateDetailsButtonText}>Update Details</Text>
            </View>
          </Pressable>
        </CardFooter>
      </Card>
    </View>
  );
}

export default AccountSettings;

const styles = StyleSheet.create({
  cardContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    paddingTop: 40,
  },

  updateDetailsCard: {},

  updateDetailsButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },

  updateDetailsButtonWrapper: {
    height: 40,
    width: 150,
    backgroundColor: "#25A0E2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  updateDetailsButtonText: {
    color: "white",
  },
});
