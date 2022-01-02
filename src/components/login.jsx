import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";

export default function Login() {
  const [client, setClient] = useState("");
  const [secret, setSecret] = useState("");
  const [redirect, setRedirect] = useState("");
  const [scope, setScope] = useState(``);
  const [state, setState] = useState("");

  function openWindow() {
    electron.ipcRenderer.send("AUTH", {
      client,
      secret,
      redirect,
      scope,
      state,
    });
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid container justifyContent="center">
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Client Id</InputLabel>
          <Input
            value={client}
            onChange={(e) => setClient(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Secret ID</InputLabel>
          <Input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Redirect URL</InputLabel>
          <Input
            value={redirect}
            onChange={(e) => setRedirect(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">Scope</InputLabel>
          <Input
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="my-input">State</InputLabel>
          <Input
            value={state}
            onChange={(e) => setState(e.target.value)}
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="my-helper-text">Required</FormHelperText>
        </FormControl>
        <Button onClick={openWindow}>Login</Button>
      </Grid>
    </React.Fragment>
  );
}
