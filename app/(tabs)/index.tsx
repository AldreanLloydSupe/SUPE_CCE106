import { Image } from "expo-image";
import { StyleSheet, Text } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView style={styles.content}>
        <ThemedText style={styles.title}>App title: Bai</ThemedText>
        <ThemedText style={styles.myName}>
          Student name: Aldrean Lloyd Supe
        </ThemedText>
        <ThemedText style={styles.myYear}>
          Course/Section: BSIT 3rd Year
        </ThemedText>
        <ThemedText style={styles.idea}>
          Short app idea: Simple React Native app
        </ThemedText>
        <Text></Text>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: "#D6DEE2",
    borderRadius: 10,
    width: "100%",
    position: "relative",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#101820",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
    color: "#101820",
  },
  myName: {
    fontSize: 16,
    color: "#182026",
    textDecorationLine: "underline",
  },
  myYear: {
    fontSize: 16,
    color: "#182026",
  },
  idea: {
    fontSize: 16,
    color: "#182026",
  },
});
