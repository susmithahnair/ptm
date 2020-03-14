import React from "react";
import "./App.css";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { RecieptContainer } from "./containers/RecieptContainer";
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
      <Grid item md={12}>
        <Typography align="center">
          <h1>Expense Manager</h1>
        </Typography>
      </Grid>
      <Grid item md={6}>
        <RecieptContainer />
      </Grid>
    </Grid>
  );
}

export default App;
