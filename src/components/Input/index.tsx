import { TextInput, type TextInputProps } from "react-native";
import { s } from "./style";

type InputProps = TextInputProps;

export default function Input({ ...rest }: InputProps) {
	return (
		<TextInput placeholderTextColor="#74798B" style={s.container} {...rest} />
	);
}
