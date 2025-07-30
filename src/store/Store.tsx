import { configureStore } from "@reduxjs/toolkit";
import { AdminApiService } from "../services/service";
import { Provider } from "react-redux";

/**
 * Configures the Redux store.
 * Combines reducers, adds middleware (including the service's middleware),
 * and sets up the store for use in the application.
 */
export const store = configureStore({
    reducer: {
        [AdminApiService.reducerPath]: AdminApiService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(AdminApiService.middleware),
    devTools: true, // Enables Redux DevTools for debugging
});

/**
 * Type definition for the application's state.
 */
export type AppState = ReturnType<typeof store.getState>;

/**
 * Type definition for the application's dispatch function.
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Provides the Redux store to the application's components.
 * Wraps the application with the Redux Provider, making the store available to all connected components.
 * @param {React.FC<{ children: React.ReactNode }>} props - The component's props, including children.
 * @returns {JSX.Element} The Redux Provider with the store and the children.
 */
const AppStoreProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    return <Provider store={store}>{props.children} </Provider>;
};

export { AppStoreProvider };
