import React, { useState } from "react";
import { User } from "~/.expo/types/types";
import { getItem } from "~/helper/storage";

function useGetUser() {
  const [user, setUser] = useState<User | null>(null);

  React.useEffect(() => {
    async function loadUser() {
      const storedUser = await getItem("user");
      if (storedUser) setUser(storedUser);
      setUser(storedUser);
    }
    loadUser();
  }, []);

  return user;
}

export default useGetUser;
