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

function AccountSettings() {
  const { isDarkColorScheme } = useColorScheme();
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
              defaultValue="Karan"
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
            />
          </View>
          <View className="gap-1">
            <Label nativeID="email">Email</Label>
            <Input
              id="email"
              defaultValue="karan@gmail.com"
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
            />
          </View>
          <View className="gap-1">
            <Label nativeID="password">Password</Label>
            <Input
              id="password"
              defaultValue="123456"
              secureTextEntry
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
            />
          </View>
        </CardContent>
        <CardFooter>
          <Pressable
            onPress={() => console.log("Update details button clicked")}
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
