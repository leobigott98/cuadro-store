import React, { ReactNode } from "react";
import { ImageBackground, Platform, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenWrapper({ children }: { children: ReactNode }) {
  return (
    <ImageBackground
      source={require("@/assets/images/fondo_cuadro_store.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.content}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  content: {
  flex: 1,
  paddingTop: Platform.OS === "ios" ? 60 : 300,
},
});
