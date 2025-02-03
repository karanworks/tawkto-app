
interface chatType{
    id: number,
    name: string,
    message: string,
    messageCount: number,
    time: string,
    initial: string,

}

export const chatsData: chatType[] = [
    {
      id: 1,
      name: "Chetan Subedi",
      // message: "Hey, Chetan this side",
      message: "Hey, Chetan this side from Ascent BPO.",
      messageCount: 3,
      time: "02:15 PM",
      initial: "C",
    },
    {
      id: 2,
      name: "Karan",
      message: "Hey!",
      messageCount: 3,
      time: "01:23 PM",
      initial: "K",
    },
    {
      id: 3,
      name: "Vicky",
      message: "Hello guys welcome to my podcast!",
      messageCount: 3,
      time: "01:23 PM",
      initial: "V",
    },
    {
      id: 4,
      name: "Pihu",
      message: "Hello, I am pihu.",
      messageCount: 3,
      time: "01:23 PM",
      initial: "P",
    },
  ];
