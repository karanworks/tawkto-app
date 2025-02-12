import { useState, useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Animated, Easing } from "react-native";

export default function TypingAnimation() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: -3, 
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0, 
            duration: 600,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 500);
    animateDot(dot3, 800);
  }, []);

  return (
    <View style={styles.typingIndicator}>
      <Animated.View
        style={[styles.typingDot, { transform: [{ translateY: dot1 }] }]}
      />
      <Animated.View
        style={[styles.typingDot, { transform: [{ translateY: dot2 }] }]}
      />
      <Animated.View
        style={[styles.typingDot, { transform: [{ translateY: dot3 }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  typingIndicator: {
    height: 35,
    width: 60,
    alignSelf: "flex-start",
    backgroundColor: "#F0F0F0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#888",
    marginHorizontal: 2,
  },
});
