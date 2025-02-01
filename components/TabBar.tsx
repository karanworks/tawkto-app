import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Inbox } from "~/lib/icons/Inbox";
import { MessageCircle } from "~/lib/icons/MessageCircle";
import { UserRound } from "~/lib/icons/UserRound";



const TabBar = ({ state, descriptors, navigation }) => {

  const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const icons = {
        index: (props) => <MessageCircle  className="text-foreground" size={23} strokeWidth={1.25} {...props} />,
        inbox: (props) => <Inbox  className="text-foreground" size={23} strokeWidth={1.25} {...props} />,
        profile: (props) => <UserRound className="text-foreground" size={23} strokeWidth={1.25} {...props} />,

    }

  return (
    // <View style={{ flexDirection: 'row' }}>
    <View style={styles.tabbar}>
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
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

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
                        color: isFocused ? colors.primary : colors.text
                    })}
                <Text style={{ color: isFocused ? colors.primary : colors.text , fontSize: 15}}>
                   
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  )
}


const styles = StyleSheet.create({
    tabbar:{
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderColor: "blue",
        borderWidth: 2,
        borderRadius: 25,
        borderCurve: "continuous",
        // shadow doesn't work for android
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1
    },

    tabbarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 4
    }
})

export default TabBar