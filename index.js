/* eslint-disable quotes */
/**
 * @format
 */
import "./global.css"; // Ensure this works with your setup
import { AppRegistry } from "react-native";
import App from "./App";
import React from 'react';
import { name as appName } from "./app.json";
import ReduxToolkitProvider from "./src/utils/global/ReduxToolkitProvider";
import GlobalUserLayout from "./src/utils/global/GlobalUserLayout";
import ToastManager from "toastify-react-native";
import { Provider as PaperProvider } from 'react-native-paper';

// Root component wraps the App with ReduxToolkitProvider
const Root = () => (
    <ReduxToolkitProvider>
        <GlobalUserLayout>
            <PaperProvider>
                <App />
            </PaperProvider>
            <ToastManager />
        </GlobalUserLayout>
    </ReduxToolkitProvider>
);

// Register the app with the root component
AppRegistry.registerComponent(appName, () => Root);
