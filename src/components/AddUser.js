import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import {useDataContext} from "../providers/DataProvider";
import MenuItem from "@material-ui/core/MenuItem";

/**
 * Renders Icon Button with dialog to
 * add new user to Item.
 * @param props
 * @return {React.Fragment}
 */

const AddUser = (props) => {
  const {item} = props;
  const {data, users, onSetData} = useDataContext();
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const notAttendedUsers = users.filter(user => (
    !item.users.find(value => value.appuserId === user.appuserId) &&
    user.disabled === 0
  ));
  const disabled = notAttendedUsers.length === 0;
  const editedItem = item;
  const selectedUser = notAttendedUsers
    .find(user => user.appuserId === selectedUserId);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedUserId(0);
    setOpen(false);
  };

  const handleChange = event => {
    setSelectedUserId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    selectedUser.projectId = item.id;
    editedItem.users.push(selectedUser);
    onSetData([...data.filter(i => i.id !== item.id), editedItem]);
    setSelectedUserId(0);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} disabled={disabled}>
        <Tooltip title="Add User">
          <AddIcon color={disabled ? "disabled" : "primary"}/>
        </Tooltip>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent style={{display: "flex", flexDirection: "column"}}>
            <TextField
              select
              variant="outlined"
              label="User"
              value={selectedUserId}
              onChange={handleChange}
            >
              <MenuItem value={0} disabled>
                Full Name
              </MenuItem>
              {notAttendedUsers.map(user => (
                <MenuItem
                  key={user.appuserId}
                  value={user.appuserId}
                >
                  {`${user.firstName} ${user.lastName}`}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={selectedUserId === 0}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddUser;