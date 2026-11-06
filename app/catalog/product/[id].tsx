import ScreenWrapper from "@/components/ScreenWrapper";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const SLIDER_HEIGHT = width * 1.5;

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter(); 
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <Text style={styles.notFound}>Product not found</Text>;

  const goToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={product.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ width, height: SLIDER_HEIGHT }}>
              <Image source={item} style={styles.sliderImage} />
            </View>
          )}
          keyExtractor={(_, idx) => String(idx)}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
        />

        {/* Left Arrow */}
        {currentIndex > 0 && (
          <Pressable
            style={[styles.arrow, { left: 10 }]}
            onPress={() => goToIndex(currentIndex - 1)}
          >
            <Ionicons name="chevron-back" size={28} color="white" />
          </Pressable>
        )}

        {/* Right Arrow */}
        {currentIndex < product.images.length - 1 && (
          <Pressable
            style={[styles.arrow, { right: 10 }]}
            onPress={() => goToIndex(currentIndex + 1)}
          >
            <Ionicons name="chevron-forward" size={28} color="white" />
          </Pressable>
        )}

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>

        {/* Quantity Selector */}
        {/* <View style={styles.qtyContainer}>
          <Pressable style={styles.qtyButton} onPress={decreaseQty}>
            <Ionicons name="remove" size={20} color="black" />
          </Pressable>
          <Text style={styles.qtyText}>{quantity}</Text>
          <Pressable style={styles.qtyButton} onPress={increaseQty}>
            <Ionicons name="add" size={20} color="black" />
          </Pressable>
        </View> */}

        {/* <Pressable
          style={styles.button}
          onPress={() => addToCart({ ...product, quantity })}
        >
          <Text style={styles.buttonText}>Agregar al Carrito</Text>
        </Pressable> */}

        <Pressable
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Volver a la Categoría</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  sliderImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  arrow: {
    position: "absolute",
    top: "40%",
    padding: 6,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    zIndex: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
    paddingHorizontal: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    paddingHorizontal: 16,
  },
  notFound: { padding: 16, fontSize: 18 },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
  },
  qtyButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    backgroundColor: "#f2f2f2",
  },
  qtyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
  },

  button: {
    backgroundColor: "#EF3C42",
    padding: 12,
    marginBottom: width * 0.12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    marginHorizontal: 'auto',
    width: width * 0.3
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "600" },
});
