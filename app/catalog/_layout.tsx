import { Stack } from "expo-router";
import React from "react";

export default function CatalogLayout() {
  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerTitleStyle: { color: "#fff" },
        headerTintColor: "#fff", // back button white
      }}
    >
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="cart" options={{ title: "" }} />
      <Stack.Screen name="product/[id]" options={{ title: ""}}/>
    </Stack>
  );
}

