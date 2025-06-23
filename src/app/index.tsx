import {
	Image,
	View,
	TouchableOpacity,
	Text,
	FlatList,
	Alert,
} from "react-native";
import { use, useEffect, useMemo, useState } from "react";
import { uuidv7 } from "uuidv7";

import Item from "@/components/Item";
import type { ItemData } from "@/types/item";

import Input from "@/components/Input";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

import { s } from "./style";
import { getAllItems, insertItem } from "@/database/items";

export default function App() {
	const [inputValue, setInputValue] = useState("");
	const [items, setItems] = useState<ItemData[]>([]);
	const [filter, setFilter] = useState<FilterStatus | null>(null);

	function onAddItem() {
		const description = inputValue.trim();
		if (!description) {
			Alert.alert("Descrição não pode ser vazia");
			return;
		}

		const newItem = {
			id: uuidv7(),
			description: description,
			status: FilterStatus.PENDING,
		};

		setItems((prevState) => [...prevState, newItem]);
		insertItem(newItem);
		setInputValue("");
	}

	function onRemoveItem(item: ItemData) {
		setItems((prevState) => prevState.filter((i) => i !== item));
	}

	function onUpdateItemStatus(item: ItemData) {
		setItems((prevState) =>
			prevState.map((i) => {
				if (i === item) {
					return {
						...i,
						status:
							i.status === FilterStatus.PENDING
								? FilterStatus.DONE
								: FilterStatus.PENDING,
					};
				}
				return i;
			}),
		);
	}

	const filteredItems = useMemo(() => {
		if (filter) {
			return items.filter((i) => i.status === filter);
		}
		return items;
	}, [items, filter]);

	useEffect(() => {
		(async () => {
			const items = await getAllItems();
			console.log(items);
			setItems(items);
		})();
	}, []);

	return (
		<View style={s.container}>
			<Image style={s.logo} source={require("@/assets/logo.png")} />
			<View style={s.form}>
				<Input
					value={inputValue}
					onChangeText={setInputValue}
					placeholder="O que você precisa comprar?"
				/>
				<Button onPress={onAddItem} disabled={!inputValue} title="Adicionar" />
			</View>
			<View style={s.content}>
				<View style={s.contentHeader}>
					<Filter
						status={FilterStatus.DONE}
						isActive={filter === FilterStatus.DONE}
						onPress={() => setFilter(FilterStatus.DONE)}
					/>
					<Filter
						status={FilterStatus.PENDING}
						isActive={filter === FilterStatus.PENDING}
						onPress={() => setFilter(FilterStatus.PENDING)}
					/>
					<TouchableOpacity
						style={s.clearButton}
						onPress={() => setFilter(null)}
					>
						<Text style={s.clearText}>Limpar</Text>
					</TouchableOpacity>
				</View>
				<FlatList
					contentContainerStyle={s.listContent}
					showsVerticalScrollIndicator={false}
					data={filteredItems}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Item
							data={item}
							onRemove={() => onRemoveItem(item)}
							onUpdateStatus={() => onUpdateItemStatus(item)}
						/>
					)}
					ItemSeparatorComponent={() => <View style={s.separator} />}
					ListEmptyComponent={() => (
						<Text style={s.emptyListText}>
							{!filter
								? "Nenhum item cadastrado"
								: filter === FilterStatus.PENDING
									? "Nenhum item pendente"
									: "Nenhum item comprado"}
						</Text>
					)}
				/>
			</View>
		</View>
	);
}
