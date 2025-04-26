import { StyleSheet, View, Text } from "react-native";
import { lightColors } from "@/theme";

export default function ListsScreen() {
  return (
    <View style={styles.container}>
      <Text>Lists Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.common.backgroundColor,
  },
});
