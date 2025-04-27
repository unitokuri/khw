import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { lightColors } from "@/theme";
import Feather from "@expo/vector-icons/Feather";

export default function HomeScreen() {
  const router = useRouter();

  const handleBtnPress = () => {
    router.push("/lists");
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleBtnPress}>
        <Feather name="map-pin" size={50} color="black" />
        <Text style={styles.label}>검색</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.common.backgroundColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    textAlign: "center",
    fontWeight: "bold",
    color: lightColors.common.color,
    marginTop: 5,
  },
});
