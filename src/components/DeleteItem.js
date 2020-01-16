import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import {useDataContext} from "../providers/DataProvider";

/**
 * Renders Icon Button and dialog to
 * delete item
 * @param props
 * @return {React.Fragment}
 */

const DeleteItem = (props) => {
  const {data, onSetData} = useDataContext();
  const {item} = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const itemToDelete = item;
    itemToDelete.deleted = 1;
    onSetData([...data.filter(i => i.id !== itemToDelete.id), itemToDelete]);
    setOpen(false);
  };

  return(
    <React.Fragment>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Delete Item">
          <DeleteIcon color="error"/>
        </Tooltip>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Delete Item</DialogTitle>
          <DialogContent style={{display: "flex", flexDirection: "column"}}>
            <Typography color="secondary">
              Are you sure you want to delete this item?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button color="secondary" type="submit">
              Delete
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteItem;
