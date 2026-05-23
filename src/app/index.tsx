import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Providers } from "@/context";
import { DATABASE_NAME, migrateDbIfNeeded } from "@/database/migrate";
import { ShoppingListScreen } from "@/screens/ShoppingListScreen";
import { s } from "./style";

SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		async function doAsyncStuff() {
			try {
				console.log("Doing async stuff...");
				await new Promise((resolve) => setTimeout(resolve, 1000));
				console.log("Async stuff done!");
			} catch (e) {
				console.warn(e);
			} finally {
				setIsReady(true);
			}
		}

		doAsyncStuff();
	}, []);

	useEffect(() => {
		if (isReady) {
			SplashScreen.hide();
		}
	}, [isReady]);

	if (!isReady) {
		return null;
	}

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
