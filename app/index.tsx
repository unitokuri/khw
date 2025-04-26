import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DotLoading } from "@/components";
import { lightColors } from "@/theme";

export default function Index() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const isDone = await AsyncStorage.getItem("initial_done");
      if (isDone) {
        router.replace("/home");
      } else {
        router.replace("/initials/guide");
      }
    };

    checkFirstLaunch().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    <View style={styles.container}>
      <DotLoading />
    </View>;
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightColors.common.backgroundColor,
    flex: 1,
    justifyContent: "center",
  },
});
