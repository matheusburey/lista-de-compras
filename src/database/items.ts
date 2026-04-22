import type { SQLiteDatabase } from "expo-sqlite";

import type { FilterStatus } from "@/types/FilterStatus";
import type { ItemData } from "@/types/item";

export async function getAllItems(db: SQLiteDatabase): Promise<ItemData[]> {
	return db.getAllAsync("SELECT * FROM items;");
}

export async function insertItem(db: SQLiteDatabase, item: ItemData) {
	return db.runAsync(
		"INSERT INTO items (id, description, status) VALUES (?, ?, ?);",
		item.id,
		item.description,
		item.status,
	);
}

export async function updateItem(
	db: SQLiteDatabase,
	newStatus: FilterStatus,
	itemId: string,
) {
	return db.runAsync(
		"UPDATE items SET status = ? WHERE id = ?;",
		newStatus,
		itemId,
	);
}

export async function deleteItem(db: SQLiteDatabase, id: string) {
	return db.runAsync("DELETE FROM items WHERE id = ?;", id);
}
