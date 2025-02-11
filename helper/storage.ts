import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value && JSON.parse(value);
  } catch (error) {
    console.error("Error while getting item in AsyncStorage:", error);
  }
}
export async function setItem(key: string, data: any) {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error while setting item in AsyncStorage:", error);
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing item from AsyncStorage:", error);
  }
}
