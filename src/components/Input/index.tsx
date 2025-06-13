import { TextInput, type TextInputProps } from "react-native";
import { s } from "./style";

type InputProps = TextInputProps;

export default function Input({ ...rest }: InputProps) {
	return <TextInput style={s.container} {...rest} />;
}
