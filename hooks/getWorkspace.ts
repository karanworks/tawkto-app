import React, { useState } from "react";
import { Workspace } from "~/.expo/types/types";
import { getItem } from "~/helper/storage";

function useGetWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);

  React.useEffect(() => {
    async function loadWorkspace() {
      const storedWorkspace = await getItem("workspace");
      setWorkspace(storedWorkspace);
    }
    loadWorkspace();
  }, []);

  return workspace;
}

export default useGetWorkspace;
