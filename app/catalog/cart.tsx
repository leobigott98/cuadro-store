// app/cart.tsx
import { View, Text, Button, FlatList, Pressable, StyleSheet, Image } from "react-native";
import { useCart } from "@/context/CartContext";
/* import * as ScreenCapture from "expo-screen-capture"; */
//import { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Link } from "expo-router";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  //const [checkoutDone, setCheckoutDone] = useState(false);

  /* const handleCheckout = async () => {
    try {
     // await ScreenCapture.captureScreen({ format: "png" }); 
      setCheckoutDone(true);
    } catch (err) {
      console.error(err);
    }
  }; */


  if (cart.length === 0) {
    return <Text style={{ padding: 16 }}>Your cart is empty</Text>;
  }

  return (
    <ScreenWrapper>
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>${item.price * item.quantity}</Text>
            <Image source={item.images[0]} style={styles.image} resizeMode="cover" />
            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <Link 
      href={'/'}
      asChild>
        <Pressable onPress={()=> clearCart()} style={styles.button}>
          <Text style={styles.buttonText}>Procesar Pedido</Text>
        </Pressable>
      </Link>
    </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EF3C42',
    borderRadius: 12,
    padding: 8,
    marginBottom: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 'auto'
  },
  image: {
    width: "25%",
    height: "100%",
    marginBottom: 8,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },

})
