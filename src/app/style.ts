import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#D0D2D8",
		paddingTop: 62,
	},
	logo: {
		height: 34,
		width: 134,
	},
	content: {
		flex: 1,
		width: "100%",
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		padding: 24,
		paddingTop: 32,
		marginTop: 24,
	},
	contentHeader: {
		width: "100%",
		flexDirection: "row",
		gap: 12,
		borderBottomWidth: 1,
		borderBottomColor: "#E4E6EC",
		paddingBottom: 12,
	},
	clearButton: { marginLeft: "auto" },
	clearText: {
		fontSize: 12,
		fontWeight: 600,
		color: "#828282",
	},
});
