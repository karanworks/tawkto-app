import axios from "axios";

class API_CLIENT {
  get = (url: string) => {
    return axios.get(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ReactNativeApp",
        "Content-Type": "application/json",
      },
    });
  };

  post = (url: string, data: any) => {
    return axios.post(url, data, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ReactNativeApp",
        "Content-Type": "application/json",
      },
    });
  };

  patch = (url: string, data: any) => {
    return axios.patch(url, data, {
      headers: {
        Accept: "application/json",
        "User-Agent": "ReactNativeApp",
        "Content-Type": "application/json",
      },
    });
  };
}

export { API_CLIENT };
