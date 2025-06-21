import { View, Text, TouchableOpacity } from "react-native";
import { s } from "./style";
import StatusIcon from "../StatusIcon";
import { Trash2 } from "lucide-react-native";
import type { ItemData } from "@/types/item";

type ItemProps = {
	data: ItemData;
	onRemove: () => void;
	onUpdateStatus: () => void;
};

export default function Item({ data, onRemove, onUpdateStatus }: ItemProps) {
	return (
		<View style={s.container}>
			<TouchableOpacity onPress={onUpdateStatus}>
				<StatusIcon status={data.status} />
			</TouchableOpacity>
			<Text style={s.description}>{data.description}</Text>
			<TouchableOpacity onPress={onRemove}>
				<Trash2 size={20} />
			</TouchableOpacity>
		</View>
	);
}
