import React from "react";
import { Grid, Typography } from "@material-ui/core";

const ExpenseItem = ({ description, value, currency }) => {
  return (
    <Grid data-test="expenseItem" container spacing={4}>
      <Grid item xs={6}>
        <Typography data-test="expenseItemDescription">
          {description}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography align="right" data-test="expenseItemValueCurrency">
          {value} {currency}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ExpenseItem;
