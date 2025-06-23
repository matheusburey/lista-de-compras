import { useState } from "react";
import { Image, View, TouchableOpacity, Text, Alert } from "react-native";
import { SQLiteProvider } from "expo-sqlite";

import { s } from "./style";

import Filter from "@/components/Filter";
import ListItem from "@/components/ListItem";
import FormItem from "@/components/FormItem";
import { DATABASE_NAME, migrateDbIfNeeded } from "@/database/items";
import { FilterStatus } from "@/types/FilterStatus";
import { Providers } from "@/context";

export default function App() {
	const [filter, setFilter] = useState<FilterStatus | null>(null);

	return (
		<View style={s.container}>
			<SQLiteProvider databaseName={DATABASE_NAME} onInit={migrateDbIfNeeded}>
				<Providers>
					<Image style={s.logo} source={require("@/assets/logo.png")} />
					<FormItem />
					<View style={s.content}>
						<View style={s.contentHeader}>
							<Filter
								status={FilterStatus.PENDING}
								isActive={filter === FilterStatus.PENDING}
								onPress={() => setFilter(FilterStatus.PENDING)}
							/>
							<Filter
								status={FilterStatus.DONE}
								isActive={filter === FilterStatus.DONE}
								onPress={() => setFilter(FilterStatus.DONE)}
							/>
							<TouchableOpacity
								style={s.clearButton}
								onPress={() => setFilter(null)}
							>
								<Text style={s.clearText}>Limpar</Text>
							</TouchableOpacity>
						</View>
						<ListItem filter={filter} />
					</View>
				</Providers>
			</SQLiteProvider>
		</View>
	);
}
