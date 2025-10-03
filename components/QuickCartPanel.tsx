import { useCart } from "@/context/CartContext";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function QuickCartPanel() {
  const { cart, openQuickView, setOpenQuickView } = useCart();
  const router = useRouter();

  if (!openQuickView) return null;

  return (
    <View style={styles.overlay}>
      {/* BACKDROP */}
      <Pressable style={styles.backdrop} onPress={() => setOpenQuickView(false)} />

      {/* PANEL */}
      <Animated.View
        entering={SlideInRight.duration(300)}
        exiting={SlideOutRight.duration(300)}
        style={styles.panel}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Carrito</Text>
          <TouchableOpacity onPress={() => setOpenQuickView(false)}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={cart}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.name} x{item.quantity}
              </Text>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.viewCartBtn}
          onPress={() => {
            setOpenQuickView(false);
            router.push("/catalog/cart");
          }}
        >
          <Text style={styles.viewCartText}>Ver Carrito</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 999,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1, // this takes all space outside the panel
    backgroundColor: "rgba(0,0,0,0.3)", // optional dim background
  },
  panel: {
    width: width * 0.7,
    height: "100%",
    backgroundColor: "#fff",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "700" },
  close: { fontSize: 18, fontWeight: "bold" },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderColor: "#eee" },
  itemText: { fontSize: 14 },
  viewCartBtn: {
    backgroundColor: "#EF3C42",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  viewCartText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

