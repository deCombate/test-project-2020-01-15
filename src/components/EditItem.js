import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import {useDataContext} from "../providers/DataProvider";

const convertDate = (date) =>
  date ?
    new Date(date).toISOString().split("T")[0] :
    "";

/**
 * Renders Icon Button and dialog.
 * with inputs to edit item.
 * Update context data with edited.
 * @param props
 * @return {React.Fragment}
 */

const EditItem = (props) => {
  const {data, onSetData} = useDataContext();
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(props.item);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setItem(props.item);
    setOpen(false);
  };

  const onChange = (name) => (event) => {
    if ((name === "beginDate" || name === "expirationDate")
      && event.target.value
    ) {
      setItem({
          ...item,
          [name]: new Date(event.target.value).toISOString()
        }
      );
    } else if (name === "title") {
      setItem({...item, [name]: event.target.value});
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSetData([...data.filter(i => i.id !== item.id), item]);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen}>
        <Tooltip title="Edit Item">
          <EditIcon color="primary"/>
        </Tooltip>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogContent style={{display: "flex", flexDirection: "column"}}>
            <TextField
              variant="outlined"
              label="Title"
              value={item.title}
              onChange={onChange("title")}
              required
              style={{marginBottom: 20}}
            />
            <TextField
              variant="outlined"
              label="Begin Date"
              type="date"
              value={convertDate(item.beginDate)}
              onChange={onChange("beginDate")}
              required
              style={{marginBottom: 20}}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                max: convertDate(item.expirationDate),
              }}

            />
            <TextField
              variant="outlined"
              label="Expiration Date"
              type="date"
              value={convertDate(item.expirationDate)}
              onChange={onChange("expirationDate")}
              required
              style={{marginBottom: 20}}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: convertDate(item.beginDate)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default EditItem;
