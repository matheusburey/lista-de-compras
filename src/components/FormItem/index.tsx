import { useContext, useState } from "react";
import { Alert, View } from "react-native";

import { ItemContext } from "@/context/Item";
import Button from "../Button";
import Input from "../Input";
import { s } from "./style";

export default function FormItem() {
	const { onAddItem } = useContext(ItemContext);
	const [inputValue, setInputValue] = useState("");

	async function handleAddItem() {
		try {
			const item = inputValue.trim();
			if (!item) {
				return Alert.alert("Item não pode ser vazio");
			}
			await onAddItem(item);
			Alert.alert("Adicionado", `Adicionado "${item}" à lista de compras`);
			setInputValue("");
		} catch (error) {
			console.log(error);
			Alert.alert("Ops", "Não foi possível adicionar o item");
		}
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
