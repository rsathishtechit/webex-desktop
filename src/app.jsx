import * as React from "react";
import * as ReactDOM from "react-dom";
import Login from "./components/login";

class App extends React.Component {
  componentDidMount() {
    console.log("mounted");
    electron.ipcRenderer.receive(
      "CODE",
      async ({ client, secret, redirect, code }) => {
        console.log({
          grant_type: "authorization_code",
          client_id: client,
          client_secret: secret,
          code: code,
          redirect_uri: redirect,
        });
        const res = await fetch("https://webexapis.com/v1/access_token", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: client,
            client_secret: secret,
            code: code,
            redirect_uri: redirect,
          }),
        });
        res.json().then(console.log);
      }
    );
  }
  render() {
    return <Login />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
