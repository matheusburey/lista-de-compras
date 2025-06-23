import { ItemContext } from "@/context/Item";
import { useContext, useEffect, useMemo } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import Item from "../Item";
import { s } from "./style";
import { FilterStatus } from "@/types/FilterStatus";
import type { ItemData } from "@/types/item";

export default function ListItem({ filter }: { filter: FilterStatus | null }) {
	const { items, onRemoveItem, onUpdateItemStatus } = useContext(ItemContext);

	const filteredItems = useMemo(() => {
		if (filter) {
			return items.filter((i) => i.status === filter);
		}
		return items;
	}, [items, filter]);

	function handleDeleteItem(itemId: ItemData) {
		Alert.alert(
			"Excluir item",
			`Deseja excluir o item "${itemId.description}"?`,
			[
				{
					text: "Não",
					style: "cancel",
				},
				{
					text: "Sim",
					style: "destructive",
					onPress: () => onRemoveItem(itemId.id),
				},
			],
		);
	}

	return (
		<FlatList
			contentContainerStyle={s.listContent}
			showsVerticalScrollIndicator={false}
			data={filteredItems}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Item
					data={item}
					onRemove={() => handleDeleteItem(item)}
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
	);
}
