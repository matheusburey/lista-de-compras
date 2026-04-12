import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Filter from "@/components/Filter";
import FormItem from "@/components/FormItem";
import ListItem from "@/components/ListItem";
import { FilterStatus } from "@/types/FilterStatus";
import { s } from "./style";

export function ShoppingListScreen() {
	const [filter, setFilter] = useState<FilterStatus | null>(null);
	return (
		<>
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
		</>
	);
}
