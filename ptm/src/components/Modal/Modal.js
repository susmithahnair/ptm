import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({ handleSubmit, ...props }) {
  return (
    <div>
      <Dialog open={props.open} {...props} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        <DialogContent style={{ minHeight: "200px", paddingTop: "20px" }}>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
