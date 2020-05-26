import React, { FC } from 'react';
// nodejs library to set properties for components
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const styles = {
  grid: {
    padding: '0 15px !important'
  }
};

const useStyles = makeStyles(styles);

// type AGrid = typeof Grid
// type ViewProps = AGrid['props'];

const  GridItem:FC<Partial<Record<Breakpoint, boolean | GridSize>>> = props=> {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
};


export default GridItem;