import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Displayer from "./Displayer";

// TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-tabpanel-${index}`}
      aria-labelledby={`scrollable-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 ,bgcolor:"#f9e8979f"}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-tab-${index}`,
    "aria-controls": `scrollable-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        bgcolor: "background.paper",
        width: "100%",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        textColor="inherit"
        indicatorColor="none"
        sx={{
          "& .MuiTab-root": {
            borderRadius: "10px 10px 0 0",
            textTransform: "none",
            fontWeight: "bold",
            mx: 0.5,
          },
          "& .Mui-selected": {
            bgcolor: "#f9e8979f",
            color: "black !important",
            border:"2px solid #dfcf7e77",
            borderBottom:'none',
            boxShadow:"0em 0em 10px #f4e0bac1",
          },
        }}
      >
        <Tab label="Monday" {...a11yProps(0)} />
        <Tab label="Tuesday" {...a11yProps(1)} />
        <Tab label="Wednesday" {...a11yProps(2)} />
        <Tab label="Thursday" {...a11yProps(3)} />
        <Tab label="Friday" {...a11yProps(4)} />
        <Tab label="Saturday" {...a11yProps(5)} />
        <Tab label="Sunday" {...a11yProps(6)} />
      </Tabs>

        {/*Contents:*/}
      <TabPanel value={value} index={0}>
        <Displayer  title="Breakfast: Egg Toast"
  content="180 kcal | 90g protein"
  extra="Ingredients: 1 egg, 2 pieces of bread... + steps"/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
      
      </TabPanel>
      <TabPanel value={value} index={3}>
    
      </TabPanel>
      <TabPanel value={value} index={4}>
       just relax.
      </TabPanel>
      <TabPanel value={value} index={5}>
        sd
      </TabPanel>
      <TabPanel value={value} index={6}>
        new day
      </TabPanel>
    </Box>
  );
}
