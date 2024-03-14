/* ANCIENNE VERSION FONCTIONNELLE
"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/redux/store";

export default function StoreProvider({ children }) {
	const { store } = makeStore();

	return <Provider store={store}>{children}</Provider>;
}

// END ANCIENNE VERSION FONCTIONNELLE */

"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/redux/store";

export default function StoreProvider({ children }) {
	const { store, persistor } = makeStore();

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>{children}</PersistGate>
		</Provider>
	);
}