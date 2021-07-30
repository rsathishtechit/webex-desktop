import * as React from "react";
import * as ReactDOM from "react-dom";
import Login from "./components/login";

class App extends React.Component {
  componentDidMount() {
    console.log("mounted");
    electron.ipc.receive((data) => console.log(data));
  }
  render() {
    return <Login />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
