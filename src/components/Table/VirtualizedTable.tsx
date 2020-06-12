import React, { FC, Validator } from 'react';
import { AutoSizer, InfiniteLoader, Table, TableProps, Index, IndexRange, Column } from 'react-virtualized';

import styled from 'styled-components';

const StyleNodataView = styled.div`
    background-color:red;
    display:flex;
`;

const StyleNodataText = styled.p`
    align-self: center;
    margin:100px;
`;

export const NoRowsRenderer = () => {
  return (
    <StyleNodataView>
      没有数据
    </StyleNodataView>
  );
};


export interface VirtualizedTableType extends Omit<TableProps, 'width'>{
  data: Object[];
  isRowLoaded?: (params: Index) => boolean;
  loadMoreRows: (params: IndexRange) => Promise<unknown>;
  //   rowCount?:number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: ({ width }:{width:number})=>any;
  width?:number
}



const VirtualizedTable:FC<VirtualizedTableType>= (props)=>{
  const { 
    children, 
    data, 
    rowGetter =({ index }:Index) => data[index],
    isRowLoaded=({ index }:Index) => !!data[index], 
    loadMoreRows, 
    rowCount= 1000,
    width:outWidth,
    ...rest
  } = props;
  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <Table
              ref={registerChild}
              onRowsRendered={onRowsRendered}
              noRowsRenderer={NoRowsRenderer}
              width={outWidth || width}
              height={300}
              headerHeight={40}
              rowHeight={30}
              rowCount={data.length}
              rowGetter={rowGetter}
              {...rest}
            >
              {children({ width })}
            </Table>
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default VirtualizedTable;