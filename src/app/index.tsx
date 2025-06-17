import { Image, View } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { s } from "./style";

export default function App() {
	return (
		<View style={s.container}>
			<Image style={s.logo} source={require("@/assets/logo.png")} />
			<View style={s.form}>
				<Input placeholder="O que você precisa comprar?" />
				<Button title="Adicionar" />
			</View>
			<View style={s.content}>
				
			</View>
		</View>
	);
}
