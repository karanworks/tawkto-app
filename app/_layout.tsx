import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";
import rootReducer from "../slices";
import useGetUser from "~/hooks/getUser";
import "~/socket/socket";
import usePushNotification from "~/hooks/usePushNotification";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { setNotificatnonExpoPushToken } from "~/slices/expoPushToken/reducer";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

const store = configureStore({ reducer: rootReducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const user = useGetUser();

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Login",
              headerRight: () => <ThemeToggle />,
              headerStyle: {
                backgroundColor: isDarkColorScheme ? "#212529" : "white",
              },
            }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="accountSettings/index"
            options={{
              title: "Account Settings",
              headerStyle: {
                backgroundColor: isDarkColorScheme ? "#212529" : "white",
              },
            }}
          />
          <Stack.Screen
            name="workspaceSettings/index"
            options={{
              title: "Workspace Settings",
              headerStyle: {
                backgroundColor: isDarkColorScheme ? "#212529" : "white",
              },
            }}
          />
          <Stack.Screen name="chat/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="unassignedChats/index"
            options={{
              title: "Unassigned Chats",
              headerStyle: {
                backgroundColor: isDarkColorScheme ? "#212529" : "white",
              },
            }}
          />
          <Stack.Screen
            name="unassignedChat/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="solvedChat/index"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="solvedChats/index"
            options={{
              title: "Solved Chats ",
              headerStyle: {
                backgroundColor: isDarkColorScheme ? "#212529" : "white",
              },
            }}
          />
          <Stack.Screen
            name="notifications/index"
            options={{ title: "Notifications" }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </Provider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
