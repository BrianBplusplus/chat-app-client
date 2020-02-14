import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = {
    messages: [],
    value: ""
  };

  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      const { data } = event;

      const action = JSON.parse(data);
      console.log("parsed test", action);

      const { type, payload } = action;

      if (type === "ALL_MESSAGES") {
        this.setState({ messages: payload });
      }

      if (type === "SINGLE_MESSAGE") {
        const messages = [...this.state.messages, payload];

        this.setState({ messages });
      }
    };
  }

  clear = () => {
    this.setState({ value: "" });
  };

  onChange = event => {
    const { value } = event.target;

    this.setState({ value });
  };

  onSubmit = event => {
    event.preventDefault();
    console.log("submitted");
  };

  render() {
    const paragraphs = this.state.messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));

    return (
      <div className="App">
        <p>Yo!</p>
        <form onSubmit={this.onSubmit}>
          <input
            value={this.state.value}
            onChange={this.onChange}
            type="text"
          />{" "}
          <button>submit</button>
        </form>

        <button onClick={this.clear}>clear</button>

        {paragraphs}
      </div>
    );
  }
}

export default App;
