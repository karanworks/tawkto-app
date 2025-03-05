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
import useGetUser from "~/hooks/getUser";
import { useEffect, useState } from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { updateWorkspace } from "~/slices/workspace/thunk";
import { useAppDispatch } from "~/hooks/useAppDispatch";

function WorkspaceSettings() {
  const user = useGetUser();

  const dispatch = useAppDispatch();
  const [workspaceName, setWorkspaceName] = useState(
    user?.workspace?.name || ""
  );
  const { isDarkColorScheme } = useColorScheme();
  useEffect(() => {
    if (user?.workspace?.name) {
      setWorkspaceName(user.workspace.name);
    }
  }, [user?.workspace?.name]);

  function handleWorkspaceName(text: string) {
    setWorkspaceName(text);
  }

  function handleUpdateDetails() {
    dispatch(
      updateWorkspace({ workspaceId: user?.workspace?.id, workspaceName })
    ); // Dispatch the updateWorkspace thunk
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
          <CardTitle>Workspace Details</CardTitle>
          <CardDescription>
            Update your workspace name and other details
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-4 native:gap-2">
          <View className="gap-1">
            <Label nativeID="workspaceName">Workspace Name</Label>
            <Input
              aria-labelledby="workspaceName"
              onChangeText={handleWorkspaceName}
              value={workspaceName}
              style={{
                backgroundColor: `${isDarkColorScheme ? "#424b52" : "white"}`,
              }}
            />
          </View>
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

export default WorkspaceSettings;

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
