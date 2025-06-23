import type { SQLiteDatabase } from "expo-sqlite";

import type { ItemData } from "@/types/item";
import type { FilterStatus } from "@/types/FilterStatus";

export const DATABASE_NAME = "./database.db";
const DATABASE_VERSION = 1;

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
	const res = await db.getFirstAsync<{ user_version: number }>(
		"PRAGMA user_version",
	);
	let currentDbVersion = res?.user_version ?? 0;

	if (currentDbVersion >= DATABASE_VERSION) {
		return;
	}

	if (currentDbVersion === 0) {
		await db.execAsync(`
            CREATE TABLE IF NOT EXISTS items (
                id TEXT PRIMARY KEY NOT NULL,
                description TEXT NOT NULL,
                status TEXT NOT NULL
            );
        `);
		currentDbVersion = 1;
	}
	await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

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
