import React from "react";
import "./App.css";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { ReceiptContainer } from "./containers/ReceiptContainer";
const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "100vh"
  }
}));
function App() {
  const styles = useStyles();
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={styles.container}
    >
      <Grid item sm={11}>
        <h1 align="center">Expense Manager</h1>
      </Grid>
      <Grid item sm={11} md={6}>
        <ReceiptContainer />
      </Grid>
    </Grid>
  );
}

export default App;
