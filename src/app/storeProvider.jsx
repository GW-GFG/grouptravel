"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";

export default function StoreProvider({ children }) {
	const { store } = makeStore();

	return <Provider store={store}>{children}</Provider>;
}