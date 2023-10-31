export const generateRandomIntegerInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const convertKmToMiles = (kilometers) => {
  const miles = (kilometers * 0.621371).toFixed(2);
  return miles;
};

// Define your distance calculation function here
export const calculateDistance = (location1, location2) => {
  const earthRadius = 6371; // Earth's radius in kilometers

  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.latitude;
  const lon2 = location2.longitude;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c; // Distance in kilometers

  return convertKmToMiles(distance); // Convert to miles using your existing utility function
};
