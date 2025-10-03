import ScreenWrapper from "@/components/ScreenWrapper";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useLocalSearchParams } from "expo-router";
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
const SLIDER_HEIGHT = width * 1.2; 

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  if (!product) return <Text style={styles.notFound}>Product not found</Text>;

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <FlatList
          data={product.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={{ width, height: SLIDER_HEIGHT }}> 
              <Image source={item} style={styles.sliderImage} />
            </View>
          )}
          keyExtractor={(_, idx) => String(idx)}
        />
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Pressable style={styles.button} onPress={() => addToCart(product)}>
          <Text style={styles.buttonText}>Agregar al Carrito</Text>
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
    width: "100%",  // take full width of container
    height: '100%',    // fixed height for carousel
    resizeMode: "cover",
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
  notFound: {
    padding: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#EF3C42",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    marginHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

