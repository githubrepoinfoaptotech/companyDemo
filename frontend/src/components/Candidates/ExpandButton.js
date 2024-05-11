import React from "react";
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
 import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
 import Tooltip from "@material-ui/core/Tooltip";


 const ExpandButton = ({
  areAllRowsExpanded,
  buttonClass,
  expandableRowsHeader,
  expandedRows,
  iconClass,
  iconIndeterminateClass,
  isHeaderCell,
  onExpand,
}) => {
  return (
   
     <Tooltip title="View progress bar" placement="right" aria-label="bar">
      {isHeaderCell && !areAllRowsExpanded() && areAllRowsExpanded && expandedRows.data.length > 0 ? (
        <IconButton
          onClick={onExpand}
          style={{ padding: 0 }}
          disabled={expandableRowsHeader === false}
          className={buttonClass}>
          <RemoveCircleIcon id="expandable-button" className={iconIndeterminateClass} />
        </IconButton>
      ) : (
       
        <IconButton
          onClick={onExpand}
          style={{ padding: 0 }}
          disabled={expandableRowsHeader === false}
          className={buttonClass}>
          <KeyboardArrowRightIcon id="expandable-button" className={iconClass} />
        </IconButton>
      
       
      )}
      </Tooltip>
      

  );
};


export default ExpandButton;
