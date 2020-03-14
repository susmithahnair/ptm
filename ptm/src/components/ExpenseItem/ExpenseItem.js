import React from "react";
import { Grid, Typography } from "@material-ui/core";

const ExpenseItem = ({ description, value, currency }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Typography>{description}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right">
          {value}&nbsp;{currency}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExpenseItem;
