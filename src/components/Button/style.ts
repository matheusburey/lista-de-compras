import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
	button: {
		backgroundColor: "#2C46B1",
		height: 48,
		width: "100%",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonDisabled: {
		opacity: 0.6,
	},
	text: {
		color: "#fff",
		fontSize: 14,
		fontWeight: 600,
	},
});
