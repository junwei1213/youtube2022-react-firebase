import "./profile.scss";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/profile/Profile";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="profileContainer">
        <Navbar />
    <Box
    >
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ borderColor: 'divider' }} 
         centered
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="My Order" {...a11yProps(1)} />
        <Tab label="My Favourite" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Profile />
        {/* <div className="item">
            <div className="item">
              <img
              src={data.img}
              alt=""
              className="avatar"
            />
              <div className="details">
                <h1 className="itemTitle">{data.displayName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.country}</span>
                </div>
              </div>
            </div>
            </div> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
    </div>
    </div>
  );
}
