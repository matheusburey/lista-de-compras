import {
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";
import { s } from "./style";

type ButtonProps = TouchableOpacityProps & {
	title: string;
};

export default function Button({ title, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity style={s.container} activeOpacity={0.8} {...rest}>
			<Text style={s.text}>{title}</Text>
		</TouchableOpacity>
	);
}
