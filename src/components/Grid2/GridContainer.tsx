import React, { FC } from 'react';
// nodejs library to set properties for components
// import PropTypes from 'prop-types';

// @material-ui/core components
// import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridJustification } from '@material-ui/core/Grid';

const styles = {
  grid: {
    marginRight: '-15px',
    marginLeft: '-15px',
    width: 'auto'
  }
};

const useStyles = makeStyles(styles);


interface GridContainerType {
  className?:string;
  justify?:GridJustification;
}

const GridContainer:FC<GridContainerType> = (props)=> {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={`${classes.grid  } ${  className}`}>
      {children}
    </Grid>
  );
};

GridContainer.defaultProps = {
  className: ''
};

// GridContainer.propTypes = {
//   children: PropTypes.node,
//   className: PropTypes.string
// };
export default GridContainer;