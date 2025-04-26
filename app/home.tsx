import { StyleSheet, View, Text } from "react-native";
import { lightColors } from "@/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.common.backgroundColor,
  },
});
