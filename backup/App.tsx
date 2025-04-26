import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const fetchNearbyPlaces = async (latitude, longitude) => {
  const radius = 1000;
  const type = 'restaurant';
  const apiKey = 'AIzaSyCMOix-BWI2-KFBNhqRxq5Oi_Jt8DhorTc';

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results.slice(0, 5);
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      setLocation(currentLocation);

      const { latitude, longitude } = currentLocation.coords;
      const placesData = await fetchNearbyPlaces(latitude, longitude);
      setPlaces(placesData);
    })();
  }, []);

  const openInGoogleMaps = (destinationLat, destinationLng) => {
    if (!location) return;

    const originLat = location.coords.latitude;
    const originLng = location.coords.longitude;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}&travelmode=walking`;

    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        openInGoogleMaps(
          item.geometry.location.lat,
          item.geometry.location.lng
        )
      }}>
      <View style={styles.card}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>평점: {item.rating} ⭐</Text>
        <Text>영업 여부: {item.opening_hours?.open_now ? '영업 중' : '영업 종료'}</Text>
        <Text>주소: {item.vicinity}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={places}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  card: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 12
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
