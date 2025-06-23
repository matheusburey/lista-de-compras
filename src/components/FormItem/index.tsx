import { Alert, View } from "react-native";
import Input from "../Input";
import Button from "../Button";
import { ItemContext } from "@/context/Item";
import { useContext, useState } from "react";
import { s } from "./style";

export default function FormItem() {
	const { onAddItem } = useContext(ItemContext);
	const [inputValue, setInputValue] = useState("");

	async function handleAddItem() {
		const description = inputValue.trim();
		if (!description) {
			Alert.alert("Descrição não pode ser vazia");
			return;
		}
		await onAddItem(description);
		setInputValue("");
	}

	return (
		<View style={s.container}>
			<Input
				value={inputValue}
				onChangeText={setInputValue}
				placeholder="O que você precisa comprar?"
			/>
			<Button
				onPress={handleAddItem}
				disabled={!inputValue}
				title="Adicionar"
			/>
		</View>
	);
}
