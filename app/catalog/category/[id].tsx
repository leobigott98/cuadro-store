// app/catalog/category/[id].tsx
import ProductCard from "@/components/ProductCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { Link, useLocalSearchParams } from "expo-router";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

export default function CategoryPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find((c) => c.id === id);

  if (!category) {
    return (
      <ScreenWrapper>
        <Text style={{ padding: 16 }}>Categoría no encontrada</Text>
      </ScreenWrapper>
    );
  }

  const categoryProducts = products.filter((p) =>
    category.products.includes(p.id)
  );

  // chunk into rows of 3
const rows: (typeof categoryProducts)[] = [];
for (let i = 0; i < categoryProducts.length; i += 3) {
  rows.push(categoryProducts.slice(i, i + 3));
}


  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>{category.name}</Text>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
          <Link asChild href={"/catalog/categories"}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Volver a Categorías</Text>
            </Pressable>
          </Link>
          {/* <Link asChild href={"/catalog/cart"}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Ver Carrito</Text>
            </Pressable>
          </Link> */}
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: width*0.05,
    fontWeight: "bold",
    padding: 16,
  },
  scrollContent: {
    padding: width * 0.02,
    paddingBottom: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
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
    paddingBottom: width*0.12,
    marginHorizontal: width*0.02,
    //backgroundColor: "#00000080",
  },
  button: {
    backgroundColor: "#EF3C42",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    width: width*0.4,
    marginHorizontal: 12,
  },
  buttonText: {
     color: "#fff",
    fontSize: width*0.04,
    fontWeight: "600",
  },
});
