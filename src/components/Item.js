import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import React from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import AddDevice from "./AddDevice";
import AddUser from "./AddUser";
import DeleteSubItem from "./DeleteSubItem";

const getLanguage = () => (
  navigator.languages !== undefined
    ? navigator.languages[0]
    : navigator.language);

const convertDateToLocal = (date) =>
  new Date(date).toLocaleDateString(getLanguage());

/**
 * Renders item with information about it.
 * Renders sub items.
 * Renders actions to edit and delete item.
 * Renders actions to add and delete sub item.
 * @param props
 * @return {React.Component}
 */

const Item = (props) => {
  const {item} = props;
  const beginDate = convertDateToLocal(item.beginDate);
  const expirationDate = convertDateToLocal(item.expirationDate);
  const activeUsers = item.users.filter(u => u.disabled === 0);

  return (
    <ExpansionPanel style={{width: "100%"}}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
      >
        <Typography variant="h6">{item.title}</Typography>
        <Divider/>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails style={{flexDirection: "column"}}>
        <div style={{display: "flex"}}>
          <div style={{flex: 1}}>
            <Typography>Begin Date: {beginDate}</Typography>
            {item.expirationDate &&
            <Typography>Expiration Date: {expirationDate}</Typography>}
          </div>
          <div>
            <EditItem item={item}/>
            <DeleteItem item={item}/>
          </div>
        </div>
        <Divider/>
        <div style={{display: "flex"}}>
          <Typography color="primary" style={{marginTop: 20, flex: 1}}>
            Devices:
          </Typography>
          <AddDevice item={item}/>
        </div>
        {item.devices.length === 0 &&
        <Typography>
          No devices used for this project
        </Typography>
        }
        <List>
          {item.devices.length > 0 && item.devices.map(device => (
            <ListItem key={device.deviceId} divider>
              <ListItemText>
                {device.serialNumber}
              </ListItemText>
              <DeleteSubItem
                item={item}
                subItem={{
                  subItemId: device.deviceId,
                  subItemIdKey: "deviceId",
                  subItem: "devices",
                  label: "device"
                }}
              />
            </ListItem>
          ))}
        </List>
        <div style={{display: "flex"}}>
          <Typography color="primary" style={{marginTop: 20, flex: 1}}>
            Users:
          </Typography>
          <AddUser item={item}/>
        </div>
        {activeUsers.length === 0 &&
        <Typography>
          No users attended for this project
        </Typography>
        }
        <List>
          {activeUsers.map(user => (
            <ListItem key={user.appuserId} divider>
              <ListItemText>
                {`${user.firstName} ${user.lastName}`}
              </ListItemText>
              <DeleteSubItem
                item={item}
                subItem={{
                  subItemId: user.appuserId,
                  subItemIdKey: "appuserId",
                  subItem: "users",
                  label: "user"
                }}
              />
            </ListItem>
          ))}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default Item;
