import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {useDataContext} from "../providers/DataProvider";

/**
 * Renders Icon Button and dialog to delete
 * particular sub item from Item.
 * @param props
 * @return {React.Fragment}
 */

const DeleteSubItem = (props) => {
  const {data, onSetData} = useDataContext();
  const {item, subItem} = props;
  const [open, setOpen] = useState(false);
  const capitalizedLabel = subItem.label.replace(/^\w/, c => c.toUpperCase());

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const editedItem = item;
    editedItem[subItem.subItem] = editedItem[subItem.subItem]
      .filter(si => si[subItem.subItemIdKey] !== subItem.subItemId);
    onSetData([...data.filter(i => i.id !== editedItem.id), editedItem]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen}>
        <Tooltip title={`Delete ${capitalizedLabel}`}>
          <DeleteIcon color="error"/>
        </Tooltip>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Delete {capitalizedLabel} </DialogTitle>
          <DialogContent style={{display: "flex", flexDirection: "column"}}>
            <Typography color="secondary">
              Are you sure you want to delete
              this {subItem.label} from the project?
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

export default DeleteSubItem;
