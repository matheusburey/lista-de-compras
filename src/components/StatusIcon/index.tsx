import { CircleCheck, CircleDashed } from "lucide-react-native";

import { FilterStatus } from "@/types/FilterStatus";

export default function StatusIcon({ status }: { status: FilterStatus }) {
	return status === FilterStatus.PENDING ? (
		<CircleDashed size={20} color="#000000" />
	) : (
		<CircleCheck size={20} color="#2C46B1" />
	);
}
