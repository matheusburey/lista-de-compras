import { Image, View, TouchableOpacity, Text, FlatList } from "react-native";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Filter from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { s } from "./style";
import { useState } from "react";
import Item from "@/components/Item";
import type { ItemData } from "@/types/item";

export default function App() {
	const [inputValue, setInputValue] = useState("");
	const [items, setItems] = useState<ItemData[]>([]);
	const [filter, setFilter] = useState<FilterStatus | null>(null);

	function onAddItem() {
		const idx = items.length ? items.length - 1 : 0;
		const id = `${Number(items[idx]?.id || 0) + 1}`;
		setItems((prevState) => [
			...prevState,
			{
				id,
				description: inputValue,
				status: FilterStatus.PENDING,
			},
		]);
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

	return (
		<View style={s.container}>
			<Image style={s.logo} source={require("@/assets/logo.png")} />
			<View style={s.form}>
				<Input
					value={inputValue}
					onChangeText={setInputValue}
					placeholder="O que você precisa comprar?"
				/>
				<Button onPress={onAddItem} title="Adicionar" />
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
					data={items}
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
