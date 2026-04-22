import {
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";
import { s } from "./style";

type ButtonProps = TouchableOpacityProps & {
	title: string;
};

export default function Button({ title, disabled, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			style={[s.button, disabled && s.buttonDisabled]}
			activeOpacity={0.8}
			disabled={disabled}
			{...rest}
		>
			<Text style={s.text}>{title}</Text>
		</TouchableOpacity>
	);
}
