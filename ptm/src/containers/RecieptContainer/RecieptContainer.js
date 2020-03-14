import React, { useState } from "react";
import { Grid, Button, Typography, Dialog } from "@material-ui/core";
import ExpenseGroup from "../../components/ExpenseGroup/ExpenseGroup";
import { Receipt } from "../../components/Reciept";
import { Modal } from "../../components/Modal";
import useForms from "../../utils/useForms";

const RecieptContainer = () => {
  const [items, setItems] = useState([
    { id: 1, description: "1st item", value: "123", currency: "CAD" },
    { id: 2, description: "2nd item", value: "456", currency: "CAD" },
    { id: 3, description: "3rd item", value: "789", currency: "CAD" }
  ]);

  const initialInput = {
    description: "",
    currency: "",
    value: ""
  };
  const { inputs, setInputs, handleInputChange } = useForms(initialInput);
  const [showModal, setShowModal] = useState(false);
  const addReceipt = e => {
    setShowModal(true);
    setInputs(initialInput);
  };
  const submitReceipt = e => {};

  const handleSubmit = item => {
    setItems(prev => [...prev, inputs]);
    setShowModal(false);
  };

  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography align="right">
          <Button onClick={addReceipt} color="secondary" variant="contained">
            Add Receipt
          </Button>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ExpenseGroup items={items}></ExpenseGroup>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          <Button onClick={submitReceipt} variant="contained" color="primary">
            Submit
          </Button>
        </Typography>
      </Grid>
      {showModal && (
        <Modal
          maxWidth="md"
          fullWidth
          open={showModal}
          handleClose={e => setShowModal(false)}
          handleSubmit={handleSubmit}
          title={"Add Receipt"}
        >
          <Receipt
            inputs={inputs}
            handleInputChange={handleInputChange}
          ></Receipt>
        </Modal>
      )}
    </Grid>
  );
};

export default RecieptContainer;
