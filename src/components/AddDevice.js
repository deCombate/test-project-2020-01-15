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
 * add new device to Item.
 * List of devices consists from devices that
 * are not included at Item.
 * @param props
 * @return {React.Fragment}
 */

const AddDevice = (props) => {
  const {item} = props;
  const {data, devices, onSetData} = useDataContext();
  const [open, setOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(0);
  const notIncludedDevices = devices.filter(device => (
    !item.devices.find(value => value.deviceId === device.deviceId)));
  const disabled = notIncludedDevices.length === 0;
  const editedItem = item;
  const selectedDevice = notIncludedDevices
    .find(device => device.deviceId === selectedDeviceId);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDeviceId(0);
    setOpen(false);
  };

  const handleChange = event => {
    setSelectedDeviceId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    selectedDevice.projectId = item.id;
    editedItem.devices.push(selectedDevice);
    onSetData([...data.filter(i => i.id !== item.id), editedItem]);
    setSelectedDeviceId(0);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleOpen} disabled={disabled}>
        <Tooltip title="Add Device">
          <AddIcon color={disabled ? "disabled" : "primary"}/>
        </Tooltip>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Device</DialogTitle>
          <DialogContent style={{display: "flex", flexDirection: "column"}}>
            <TextField
              select
              variant="outlined"
              label="Device"
              value={selectedDeviceId}
              onChange={handleChange}
            >
              <MenuItem value={0} disabled>
                Serial Number
              </MenuItem>
              {notIncludedDevices.map(device => (
                <MenuItem
                  key={device.deviceId}
                  value={device.deviceId}
                >
                  {device.serialNumber}
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
              disabled={selectedDeviceId === 0}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default AddDevice;
