import type { FilterStatus } from "./FilterStatus";

export type ItemData = {
	id: string;
	description: string;
	status: FilterStatus;
};

export type ItemContextType = {
	items: ItemData[];
	onAddItem: (description: string) => Promise<void>;
	onUpdateItemStatus: (item: ItemData) => Promise<void>;
	onRemoveItem: (id: string) => Promise<void>;
};
