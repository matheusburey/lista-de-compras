import {
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";

import { FilterStatus } from "@/types/FilterStatus";
import StatusIcon from "../StatusIcon";
import { s } from "./style";

type InputProps = TouchableOpacityProps & {
	status: FilterStatus;
	isActive: boolean;
};

export default function Filter({ status, isActive, ...rest }: InputProps) {
	return (
		<TouchableOpacity
			style={[s.container, { opacity: isActive ? 1 : 0.5 }]}
			disabled={isActive}
			{...rest}
		>
			<StatusIcon status={status} />
			<Text style={s.title}>
				{status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
			</Text>
		</TouchableOpacity>
	);
}
