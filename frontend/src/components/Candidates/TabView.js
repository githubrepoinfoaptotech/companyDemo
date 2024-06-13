import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "../../themes/style";


function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

export default function TabView({ jdData,removePercentage }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabClick = (index) => {
    setValue(index);
  };

  // const handleChange = (event, newValue) => {
  //   const nextTab = newValue === jdData.length - 1 ? 0 : newValue + 1;
  //   setValue(nextTab);
  // };

  return (
    <div className={classes.tabRoot}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          // onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          aria-label="scrollable auto tabs example"
        >
          {jdData?.map((row, index) => (
            <Tab
              key={index}
              label={
                <Box p={3} style={{display: "flex",justifyContent: 'space-between',gap: '15px'}} onClick={() => handleTabClick(index)}>
                  <Box
                    style={{ cursor: "pointer" }}
                  >
                    <Typography>{row.requirementName}</Typography>
                  </Box>
                  <Box
                    className={classes.resumeUploadParent}
                    style={{ cursor: "pointer" }}
                  >
                    <CloseIcon className={classes.matchJdCloseIcon} onClick={(event)=>{event.stopPropagation() ;removePercentage(row.requirementId)}} />
                  </Box>
                </Box>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {jdData?.map((row, index) => (
        <TabPanel key={index} value={value} index={index}>
          {row.description}
        </TabPanel>
      ))}
    </div>
  );
}
