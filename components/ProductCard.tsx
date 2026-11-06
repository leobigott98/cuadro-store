import { Product } from "@/context/CartContext";
import { Link } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");
// spacing  → 16 (padding) + 2 gaps of 8 between 3 cards
const CARD_WIDTH = (width - width*0.04 - width*0.02 * 2) / 3; 
const CARD_HEIGHT = CARD_WIDTH * 2; 

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={{
        pathname: "/catalog/product/[id]",
        params: { id: product.id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image source={product.images[0]} style={styles.image} resizeMode="cover" />
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    //marginBottom: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "75%",
    marginBottom: 8,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  name: {
    fontSize: CARD_WIDTH * 0.09,
    fontWeight: "600",
    textAlign: "center",
  },
  price: {
    fontSize: CARD_WIDTH * 0.1,
    color: "#666",
    marginTop: 4,
  },
});
