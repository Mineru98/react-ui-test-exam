import React from "react";
import "./App.css";
import FormComponent from "./FormComponent";

function App() {
	return (
		<div className="App">
			<FormComponent onSubmit={() => {}} onCancel={() => {}} />{" "}
		</div>
	);
}

export default App;
