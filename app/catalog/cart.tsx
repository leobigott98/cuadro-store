// app/cart.tsx
import { useCart } from "@/context/CartContext";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
/* import * as ScreenCapture from "expo-screen-capture"; */
//import { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const { width } = Dimensions.get("screen");

export default function CartPage() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              {/* Left side: product info */}
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>
                  ${item.price * item.quantity}
                </Text>

                {/* Quantity controls */}
                <View style={styles.qtyContainer}>
                  <Pressable
                    style={styles.qtyButton}
                    onPress={() =>
                      item.quantity > 1
                        ? updateQuantity(item.id, item.quantity - 1)
                        : removeFromCart(item.id)
                    }
                  >
                    <Ionicons name="remove" size={18} color="#000" />
                  </Pressable>

                  <Text style={styles.qtyText}>{item.quantity}</Text>

                  <Pressable
                    style={styles.qtyButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Ionicons name="add" size={18} color="#000" />
                  </Pressable>
                </View>

                <Pressable onPress={() => removeFromCart(item.id)}>
                  <Text style={styles.removeText}>Eliminar</Text>
                </Pressable>
              </View>

              {/* Right side: small image */}
              <Image
                source={item.images[0]}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          )}
        />

        <View style={styles.buttons}>
          <Link href={"/catalog/categories"} asChild>
            <Pressable onPress={() => clearCart()} style={styles.button}>
              <Text style={styles.buttonText}>Volver a Categorías</Text>
            </Pressable>
          </Link>
          <Link href={"/"} asChild>
            <Pressable onPress={() => clearCart()} style={styles.button}>
              <Text style={styles.buttonText}>Procesar Pedido</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  itemInfo: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  qtyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
  },
  removeText: {
    color: "#EF3C42",
    fontSize: 14,
    fontWeight: "500",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  buttons: {
    marginBottom: width * 0.06,
  },
  button: {
    backgroundColor: "#EF3C42",
    borderRadius: 12,
    padding: 12,
    marginBottom: width * 0.01,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: width * 0.04,
    fontWeight: "600",
  },
});
