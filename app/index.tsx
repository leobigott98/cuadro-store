import Video from "@/components/video";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("screen");

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
    width: width*0.3,
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
    fontSize: 32,
    color: "#ffffff",
    fontWeight: "bold",
    marginHorizontal: 'auto'
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
