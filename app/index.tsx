import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import Video from "@/components/video";
import { Link } from "expo-router";

export default function Page() {


/*   React.useEffect(() => {
    if (player) {
      player.play();
      player.loop = true; // Enable looping
    }
  }, [player]); */

  return (
    <View style={styles.container}>
      <Video/>
      {/* Button Ovelay */}
      <View style={styles.overlayContent}>
        <Link 
          asChild
          href={'/catalog/'}
          >
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Catálogo</Text>
            </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContent: {
    position: "absolute",
    bottom: 30, // distance from bottom
    left: 0,
    right: 0,
    alignItems: "center", // centers horizontally
  },
  button: {
    backgroundColor: "#EF3C42",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4, // nice shadow on Android
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
  },
});

/* import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
} */
