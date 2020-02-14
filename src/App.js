import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = {
    messages: []
  };

  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event test ", event);

      const { data } = event;
      console.log("data test", data);

      const parsed = JSON.parse(data);
      console.log("parsed test", parsed);

      this.setState({ messages: parsed });
    };
  }

  render() {
    const paragraphs = this.state.messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));

    return (
      <div className="App">
        <p>Yo!</p>
        {paragraphs}
      </div>
    );
  }
}

export default App;
