import React, { FC } from 'react';
import styled from 'styled-components';
import Grid, { GridTypeMap } from '@material-ui/core/Grid';


type GridItemType = Omit<GridTypeMap['props'], 'item'>;

const GridItem: FC<GridItemType> = (props) => <Grid item {...props} />;


const StyledGrid = styled(GridItem)`
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  flex-basis: auto;
`;

export default StyledGrid;
