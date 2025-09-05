import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{borderRadius:"10px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Monday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
        <Tab label="Tuesday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
        <Tab label="Wednesday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
        <Tab label="Thursday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
        <Tab label="Friday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
        <Tab label="Saturday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
        <Tab label="Sunday" sx={{fontWeight:"Bolder",fontSize:"1.2em",width:"10em"}} />
      </Tabs>
    </Box>
  );
}
