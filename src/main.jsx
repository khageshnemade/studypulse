import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Path to the Tailwind CSS file
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import store, { persistor } from "./redux/store/store.js"; // Import store and persistor

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
