import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import project from "../data/project";
import device from "../data/device";
import user from "../data/user";

export const DataContext = createContext(null);

const projects = JSON.parse(JSON.stringify(project));
const devices = JSON.parse(JSON.stringify(device));
const users = JSON.parse(JSON.stringify(user));

const devicesList = devices.filter((device, index, self) =>
  index === self.findIndex((t) => (t.deviceId === device.deviceId))
);

const usersList = users.filter((user, index, self) =>
  index === self.findIndex((t) => (t.appuserId === user.appuserId))
);

const initialData = projects.map(project => {
  const item = project;
  item.devices = devices.filter(device => device.projectId === project.id);
  item.users = users.filter(user => user.projectId === project.id);
  return(item);
});

/**
 * Provide context for application;
 * Maintains data synchronization with local storage;
 * @param props
 * @return {React.Context}
 */

const DataProvider = props => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const currentData = localStorage.getItem("data");
    if (currentData && currentData.length > 0) {
      setData(JSON.parse(currentData));
    } else {
      localStorage.setItem("data", JSON.stringify(initialData));
      setData(initialData);
    }
  }, []);

  const onSetData = newData => {
    const sortedData = newData.sort((a, b) => (a.id > b.id) ? 1 : -1);
    localStorage.setItem("data", JSON.stringify(sortedData));
    setData(sortedData);
  };

  const dataValue = useMemo(() => {
    return {
      data: [...data],
      devices: devicesList,
      users: usersList,
      onSetData
    };
  }, [data]);

  return <DataContext.Provider value={dataValue} {...props} />;
};

export const useDataContext = () => useContext(DataContext);

export default DataProvider;