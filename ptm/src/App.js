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
        <h1>
          <Typography align="center">Expense Manager</Typography>
        </h1>
      </Grid>
      <Grid item md={6}>
        <RecieptContainer />
      </Grid>
    </Grid>
  );
}

export default App;
