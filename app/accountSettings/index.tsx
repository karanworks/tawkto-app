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

function AccountSettings() {
  return (
    <View style={styles.cardContainer}>
      <Card className="w-full max-w-sm" style={styles.updateDetailsCard}>
        <CardHeader>
          <CardTitle>Account Info</CardTitle>
          <CardDescription>
            Update your name and email other details
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 native:gap-2">
          <View className="gap-1">
            <Label nativeID="name">Name</Label>
            <Input aria-aria-labelledby="name" defaultValue="Karan" />
          </View>
          <View className="gap-1">
            <Label nativeID="email">Email</Label>
            <Input id="email" defaultValue="karan@gmail.com" />
          </View>
          <View className="gap-1">
            <Label nativeID="password">Password</Label>
            <Input id="password" defaultValue="123456" secureTextEntry />
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
