import React, { FC } from 'react';
// nodejs library to set properties for components
// import PropTypes from 'prop-types';
// @material-ui/core components
// import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import Grid, { GridSize } from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

const StyledGrid = styled(Grid)`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex-basis: auto;
`;

// const styles = {
//   grid: {
//     position: 'relative',
//     width: '100%',
//     minHeight: '1px',
//     paddingRight: '15px',
//     paddingLeft: '15px',
//     flexBasis: 'auto',
//   },
// };

// const useStyles = makeStyles(styles);

interface GridItemType {
  className?: string;
}

const GridItem: FC<
Partial<Record<Breakpoint, boolean | GridSize>> & GridItemType
> = (props) => {
  //   const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <StyledGrid item {...rest} className={className}>
      {children}
    </StyledGrid>
  );
};

GridItem.defaultProps = {
  className: '',
};

export default GridItem;
