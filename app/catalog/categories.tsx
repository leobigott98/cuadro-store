// app/catalog/categories.tsx
import ScreenWrapper from "@/components/ScreenWrapper";
import { categories } from "@/data/categories";
import { Link } from "expo-router";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const {width} = Dimensions.get("screen");

export default function CategoriesPage() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Link href={{
                pathname: '/catalog/category/[id]',
                params: {id: item.id}
                }} 
                asChild>
              <Pressable style={styles.categoryCard}>
                <Text style={styles.categoryName}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
        />
        {/* Fixed footer */}
              <View style={styles.buttons}>
                <Link asChild href={"/"}>
                  <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Volver al Inicio</Text>
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
    padding: 16,
  },
  list: {
    gap: 12,
  },
  categoryCard: {
    backgroundColor: "#EF3C42",
    padding: width*0.02,
    borderRadius: 10,
    alignItems: "center",
  },
  categoryName: {
    color: "#fff",
    fontSize: width*0.05,
    fontWeight: "600",
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
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
    flex: 1,
    marginHorizontal: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: width*0.04,
    fontWeight: "600",
  },
});
