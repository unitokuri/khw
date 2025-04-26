import { StyleSheet, View } from "react-native";
import { lightColors } from "@/theme";
import { Form } from "@/components";

export default function FormScreen() {
  return (
    <View style={styles.container}>
      <Form />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.common.backgroundColor,
    flex: 1,
  },
});
