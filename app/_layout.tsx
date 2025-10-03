import { Stack } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import * as StatusBar from "expo-status-bar";
import { Platform } from "react-native";
import React, { useEffect } from "react";
import { useKeepAwake } from "expo-keep-awake";
import { CartProvider } from "@/context/CartContext";
import QuickCartPanel from "@/components/QuickCartPanel";

export default function RootLayout() {
  useEffect(() => {
    const goImmersive = async () => {
      if (Platform.OS === "android") {
        await NavigationBar.setVisibilityAsync("hidden");
        //await NavigationBar.setBehaviorAsync('immersiveSticky');
      }
    };
    StatusBar.setStatusBarHidden(true);
    goImmersive();
  }, []);

  useKeepAwake();

  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <QuickCartPanel />
    </CartProvider>
  );
}
