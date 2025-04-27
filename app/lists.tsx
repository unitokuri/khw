import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Linking,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { lightColors } from "@/theme";
import { useFetchNearByPlacesQuery } from "@/queries";
import { DotLoading } from "@/components";

export default function ListsScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const {
    isLoading: isFetchLoading,
    isError,
    error,
    data,
  } = useFetchNearByPlacesQuery(
    location?.coords?.latitude,
    location?.coords?.longitude,
    "restaurant"
  );

  useEffect(() => {
    const getUserLocation = async () => {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      return location;
    };

    getUserLocation()
      .then((location) => {
        setLocation(location);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isError) {
    throw error;
  }

  if (isLoading || isFetchLoading) {
    return (
      <View style={styles.container}>
        <DotLoading />
      </View>
    );
  }

  const openInGoogleMaps = (destination: {
    latitude: number;
    longitude: number;
  }) => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=walking`
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                openInGoogleMaps({
                  latitude: item.geometry.location.lat,
                  longitude: item.geometry.location.lng,
                })
              }
            >
              <View
                style={[
                  styles.card,
                  item.opening_hours?.open_now && styles.activeCard,
                ]}
              >
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.text}>평점: {item.rating} ⭐</Text>
                <Text style={styles.text}>
                  영업 여부:{" "}
                  {item.opening_hours?.open_now ? "영업 중" : "영업 종료"}
                </Text>
                <Text style={styles.text}>주소: {item.vicinity}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
  card: {
    backgroundColor: lightColors.ListsScreen.card.backgroundColor,
    borderWidth: 2,
    borderColor: lightColors.common.borderColor,
    borderRadius: 10,
    marginBottom: 12,
    padding: 15,
  },
  activeCard: {
    backgroundColor: lightColors.common.backgroundColor,
    borderColor: lightColors.common.primaryColor,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: lightColors.common.color,
    marginTop: 1,
  },
});
