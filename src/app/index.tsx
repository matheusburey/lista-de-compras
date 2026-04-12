import { SQLiteProvider } from "expo-sqlite";
import { View } from "react-native";

import { Providers } from "@/context";
import { DATABASE_NAME, migrateDbIfNeeded } from "@/database/items";
import { ShoppingListScreen } from "@/screens/ShoppingListScreen";
import { s } from "./style";

export default function App() {
	return (
		<View style={s.container}>
			<SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
				<Providers>
					<ShoppingListScreen />
				</Providers>
			</SQLiteProvider>
		</View>
	);
}
