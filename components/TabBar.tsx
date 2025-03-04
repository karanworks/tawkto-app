import React from "react";
import { View, StyleSheet } from "react-native";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Inbox } from "~/lib/icons/Inbox";
import { MessageCircle } from "~/lib/icons/MessageCircle";
import { UserRound } from "~/lib/icons/UserRound";
import { Text } from "~/components/ui/text";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useColorScheme } from "~/lib/useColorScheme";

interface IconProps {
  color: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: {
    color: string;
    [key: string]: any;
  };
}
// Define valid route names
type RouteNames = "index" | "inbox" | "profile";

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const { isDarkColorScheme } = useColorScheme();

  const icons: Record<RouteNames, React.FC<IconProps>> = {
    index: (props: IconProps) => (
      <MessageCircle
        className="text-foreground"
        size={23}
        strokeWidth={1.25}
        stroke={props.color}
        // {...props}
        // style={{ color: props.color }}
      />
    ),
    inbox: (props: IconProps) => (
      <Inbox
        className="text-foreground"
        size={23}
        strokeWidth={1.25}
        stroke={props.color}
        // {...props}
        // style={{ color: props.color }}
      />
    ),
    profile: (props: IconProps) => (
      <UserRound
        className="text-foreground"
        size={23}
        strokeWidth={1.25}
        stroke={props.color}
        // {...props}
        // style={{ color: props.color }}
      />
    ),
  };

  return (
    // <View style={{ flexDirection: 'row' }}>
    <View
      style={styles.tabbar}
      className={isDarkColorScheme ? "bg-gray-800" : "bg-white"}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Type guard to ensure route.name is a valid RouteNames
        const isValidRouteName = (name: string): name is RouteNames => {
          return name in icons;
        };

        // Skip rendering if route name is not valid
        if (!isValidRouteName(route.name)) {
          return null;
        }

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            // style={{ flex: 1 }}
            style={styles.tabbarItem}
          >
            {icons[route.name]({
              color: isFocused
                ? isDarkColorScheme
                  ? "hsl(201, 100%, 75%)" // Light blue for dark mode focus
                  : "hsl(201, 77%, 52%)" // Regular blue for light mode focus
                : isDarkColorScheme
                ? "#A9A9A9" // Lighter gray for dark mode
                : "#696969", // Dark gray for light mode
            })}

            {/* <Text style={{ color: isFocused ? colors.primary : colors.text , fontSize: 15}}> */}
            <Text
              style={{
                color: isFocused
                  ? isDarkColorScheme
                    ? "hsl(201, 100%, 75%)" // Light blue for dark mode focus
                    : "hsl(201, 77%, 52%)" // Regular blue for light mode focus
                  : isDarkColorScheme
                  ? "#A9A9A9" // Lighter gray for dark mode
                  : "#696969", // Dark gray for light mode,
                fontSize: 13,
                fontWeight: "bold",
              }}
            >
              {/* {label} */}
              {typeof label === "string" ? label : ""}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "red",
    marginHorizontal: 20,
    paddingVertical: 10,
    // borderColor: "blue",
    // borderWidth: 2,
    borderRadius: 25,
    borderCurve: "continuous",
    elevation: 5,
    // shadow doesn't work for android

    // shadowColor: "black",
    // shadowOffset: { width: 0, height: 10 },
    // shadowRadius: 10,
    // shadowOpacity: 0.1
  },

  tabbarItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
});

export default TabBar;
