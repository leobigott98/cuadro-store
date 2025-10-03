import { useCart } from "@/context/CartContext";
import { useRouter } from "expo-router";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function QuickCartPanel() {
  const { cart, openQuickView, setOpenQuickView, updateQuantity, removeFromCart } = useCart();
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
              <Text style={styles.itemName}>{item.name}</Text>

              {/* Quantity controls */}
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() =>
                    item.quantity > 1
                      ? updateQuantity(item.id, item.quantity - 1)
                      : removeFromCart(item.id)
                  }
                >
                  <Text style={styles.qtyText}>–</Text>
                </TouchableOpacity>

                <Text style={styles.qtyValue}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
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
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
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
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  itemName: { fontSize: 14, flex: 1 },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  qtyText: { fontSize: 16, fontWeight: "600" },
  qtyValue: { fontSize: 14, fontWeight: "500", minWidth: 20, textAlign: "center" },
  viewCartBtn: {
    backgroundColor: "#EF3C42",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  viewCartText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

