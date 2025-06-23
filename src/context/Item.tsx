import { createContext, useEffect, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";

import type { ItemContextType, ItemData } from "@/types/item";
import { uuidv7 } from "uuidv7";
import { FilterStatus } from "@/types/FilterStatus";
import * as DbItem from "@/database/items";

export const ItemContext = createContext({} as ItemContextType);

export function ItemProvider({ children }: { children: React.ReactNode }) {
	const db = useSQLiteContext();
	const [items, setItems] = useState<ItemData[]>([]);

	async function onAddItem(description: string) {
		const newItem = {
			id: uuidv7(),
			description: description,
			status: FilterStatus.PENDING,
		};

		await DbItem.insertItem(db, newItem);
		setItems((prevState) => [...prevState, newItem]);
	}

	async function onRemoveItem(itemId: string) {
		await DbItem.deleteItem(db, itemId);
		setItems((prevState) => prevState.filter((i) => i.id !== itemId));
	}

	async function onUpdateItemStatus(item: ItemData) {
		const newStatus =
			item.status === FilterStatus.PENDING
				? FilterStatus.DONE
				: FilterStatus.PENDING;
		await DbItem.updateItem(db, newStatus, item.id);
		await getItems();
	}

	async function getItems() {
		const items = await DbItem.getAllItems(db);
		setItems(items);
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		getItems();
	}, []);

	return (
		<ItemContext.Provider
			value={{
				items,
				onAddItem,
				onUpdateItemStatus,
				onRemoveItem,
			}}
		>
			{children}
		</ItemContext.Provider>
	);
}
