import ProductCard from "@/components/ProductCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { products } from "@/data/products";
import { Link } from "expo-router";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CatalogPage() {
  // Split products into chunks of 3 for rows
  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Scrollable products */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          {rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </View>
          ))}
        </ScrollView>

        {/* Fixed footer */}
        <View style={styles.buttons}>
          <Link asChild href={"/"}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Volver al Inicio</Text>
            </Pressable>
          </Link>
          <Link asChild href={"/catalog/cart"}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Ver Carrito</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  scrollContent: {
    padding: width * 0.02,
    paddingBottom: 120, // enough space for footer
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: width * 0.02,
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#00000080", // semi-transparent bg
  },
  button: {
    backgroundColor: "#EF3C42",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
