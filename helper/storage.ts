import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export async function getItem(key: string) {
//   const value = await SecureStore.getItemAsync("user");
//   return value && JSON.parse(value);
// }
// export async function setItem(key: string, data: any) {
//   return await SecureStore.setItemAsync(key, JSON.stringify(data));
// }
export async function getItem(key: string) {
  const value = await AsyncStorage.getItem(key);
  return value && JSON.parse(value);
}
export async function setItem(key: string, data: any) {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
}
