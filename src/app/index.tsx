import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Text, View } from "react-native";

export default function Index() {
  const tasks = useQuery(api.tasks.get);

  return (
    <View
      className="flex-1 items-center justify-center bg-dark"
    >
      {tasks?.map((task) => (
        <Text className="text-white" key={task._id}>{task.text}</Text>
      ))}
    </View>
  );
}
