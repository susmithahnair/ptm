import React from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";

const Receipt = ({ inputs, handleInputChange }) => {
  return (
    <Grid container justify="center" spacing={4}>
      <Grid xs={12}>
        <TextField
          label="Description"
          name="description"
          value={inputs.description}
          onChange={handleInputChange}
          fullWidth
          required
        ></TextField>
      </Grid>
      <Grid xs={12}>
        <TextField
          label="Amount"
          name="value"
          type="number"
          value={inputs.value}
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
      <Grid xs={12}>
        <TextField
          select
          label="currency"
          name="currency"
          value={inputs.currency}
          onChange={handleInputChange}
          fullWidth
          required
        >
          <MenuItem value="CAD">CAD</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </TextField>
      </Grid>
    </Grid>
  );
};

export default Receipt;
