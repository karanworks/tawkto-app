import * as React from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Text } from "~/components/ui/text";

export default function ChatsDropdown() {
  const contentInsets = {
    top: 10, // padding from the top
    right: 15, // padding from the right
    bottom: 10, // padding from the bottom
    left: 15, // padding from the left
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Text>Open</Text>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent insets={contentInsets} className="w-64 native:w-72">
        {/* <DropdownMenuLabel>Your Chats</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}

        <DropdownMenuItem>
          <Text>Unassigned</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text>My Open</Text>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Text>Solved</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
