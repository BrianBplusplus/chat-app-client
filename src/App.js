import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = function(event) {
      console.log("event test ", event);

      const { data } = event;
      console.log("data test", data);

      const parsed = JSON.parse(data);
      console.log("parsed test", parsed);
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Yo!</h1>
      </div>
    );
  }
}

export default App;
