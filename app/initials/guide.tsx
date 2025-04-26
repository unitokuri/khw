import { StyleSheet, View, Text } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { lightColors } from "@/theme";

export default function GuideScreen() {
  return (
    <View style={styles.container}>
      <FontAwesome6
        name="map-location-dot"
        size={60}
        color={lightColors.common.primaryColor}
      />
      <Text style={styles.notice}>
        장소를 추천해 드리기 위해서 위치 정보를 공유해주세요.
      </Text>
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
  notice: {
    color: lightColors.common.color,
    marginTop: 30,
    marginHorizontal: 20,
  },
});
