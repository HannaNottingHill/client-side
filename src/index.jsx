import ReactDOM from "react-dom";
import React from "react";

import { MainView } from "./components/main-view/main-view";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
ReactDOM.render(<App />, container);
