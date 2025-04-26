import { useState, useContext } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { useRouter, usePathname, Stack } from "expo-router";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightColors } from "@/theme";
import { DotLoading } from "@/components";
import { UserContext } from "@/contexts";

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === "granted";
};

export default function InitialLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userContextValue } = useContext(UserContext);

  const handleBtnPress = () => {
    if (pathname === "/initials/guide") {
      setIsLoading(true);
      requestLocationPermission().finally(() => {
        setIsLoading(false);
        router.replace("/initials/form");
      });
    } else {
      AsyncStorage.setItem("user_info", JSON.stringify(userContextValue));
      AsyncStorage.setItem("initial_done", "true");
      router.replace("/home");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <DotLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="form" />
        </Stack>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleBtnPress}>
          <Text style={styles.buttonText}>
            {pathname === "/initials/guide" ? "계속하기" : "다음"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lightColors.common.backgroundColor,
  },
  body: {
    width: "100%",
    height: "85%",
  },
  footer: {
    width: "100%",
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: lightColors.common.primaryColor,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    width: "90%",
  },
  buttonText: {
    color: lightColors.common.secondaryColor,
    fontSize: 14,
    textAlign: "center",
  },
});
