import type { SQLiteDatabase } from "expo-sqlite";

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
