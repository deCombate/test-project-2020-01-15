import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import React from "react";
import Item from "../components/Item";
import {useDataContext} from "../providers/DataProvider";


const MainPage = () => {
  const context = useDataContext();
  const items = context.data.filter(i => i.deleted === 0);

  return (
    <React.Fragment>
      <Typography
        variant="h4"
        color="primary"
        style={{margin: 20, textAlign: "center"}}
      >
        Projects
      </Typography>
      <Divider/>
      <List>
        {items.map(item => (
          <ListItem key={item.id}>
            <Item item={item}/>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default MainPage;