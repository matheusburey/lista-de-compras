import type { ReactNode } from "react";

import { ItemProvider } from "./Item";

interface IProviderProps {
	children: ReactNode;
}

export function Providers({ children }: IProviderProps) {
	return <ItemProvider>{children}</ItemProvider>;
}
