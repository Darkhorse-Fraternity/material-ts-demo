/* eslint-disable react/jsx-curly-newline */
import React, { FC, useState, useRef } from 'react';
// @material-ui/core components

import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button, { RegularButtonType } from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
// import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
// import CardFooter from 'components/Card/CardFooter';
// import Table from 'components/Table/Table';
import Select from '@material-ui/core/Select';
// import VirtualizedTable from 'components/Table/VirtualizedTable';
import {
  InfiniteLoader,
  Table,
  Column,
  //   ListRowRenderer,
  IndexRange,
  Index,
  AutoSizer,
} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
  FormControl,
  MenuItem,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useApiGetOrder } from 'api';
import moment from 'moment';
import { resolve } from 'path';

const categorys = [
  { lable: '选择1', value: 'value1' },
  { lable: '选择2', value: 'value2' },
  { lable: '选择3', value: 'value3' },
  { lable: '选择4', value: 'value4' },
  { lable: '选择5', value: 'value5' },
];

interface RadioButtonType extends Omit<RegularButtonType, 'onClick'> {
  disabled?: boolean;
  value?: unknown;
  checked: boolean;
  onClick: (e: unknown) => void;
}

const RadioButton: FC<RadioButtonType> = (props) => {
  const { children, disabled, checked, onClick, value, ...rest } = props;
  return (
    <Button
      color={checked ? 'primary' : 'danger'}
      disabled={disabled}
      onClick={(e) => {
        onClick && onClick(value);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  formControl: {
    minWidth: 120,
  },
  tableResponsive: {
    width: '100%',
    marginTop: 10,
    overflowX: 'auto',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useStyles = makeStyles(styles as any);

// const remoteRowCount = 0;

const noRowsRenderer = () => {
  return <div>No rows</div>;
};

export default function Search() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');

  const [listParams, setListParams] = useState({
    skip: '0',
    limit: '20',
  });

  const { data, revalidate, isValidating } = useApiGetOrder(listParams);
  const { results = [] } = data || {};

  const list = [...results];
  //   const ref = useRef(results);
  // if(listParams.)
  const rowCount = 20;

  function isRowLoaded({ index }: Index) {
    return !!list[index];
  }

  function loadMoreRows({ startIndex, stopIndex }: IndexRange) {
    console.log('111', startIndex, stopIndex);

    // setListParams({
    //   skip: `${startIndex}`,
    //   limit: `${stopIndex - startIndex}`,
    // });
    // 如果是异步的话，就做延迟吧。

    // eslint-disable-next-line no-shadow
    return new Promise((resolve) => {
      setTimeout(() => {
        // revalidate().then((isDone) => {
        //   resolve(isDone);
        // });
      }, 100);
    });
  }

  //   const rowRenderer: ListRowRenderer = ({ key, index, style }) => {
  //     return (
  //       <div key={key} style={style}>
  //         {list[index].statu}
  //       </div>
  //     );
  //   };

  const handleChange = (event: unknown) => {
    setValue(event as string);
  };

  const [age, setAge] = React.useState('');

  const handleChangeAge = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          分类:{'   '}
          {categorys.map(({ value: value1, lable }) => (
            <RadioButton
              value={value1}
              key={value1}
              checked={value === value1}
              onClick={handleChange}
            >
              {lable}
            </RadioButton>
          ))}
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          观众:{'   '}
          <FormControl className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-label">年龄</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChangeAge}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          多选:{'   '}
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChangeState}
                  name="checkedA"
                />
              }
              label="Secondary"
            />
            <FormControlLabel
              control={<Checkbox name="checkedC" />}
              label="Uncontrolled"
            />
          </FormGroup>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <CustomInput
            labelText="Company (disabled)"
            id="company-disabled"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              disabled: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={3}>
          <CustomInput
            labelText="Username"
            id="username"
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <CustomInput
            labelText="Email address"
            id="email-address"
            formControlProps={{
              fullWidth: true,
            }}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Simple Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader> */}
            <CardBody>
              <InfiniteLoader
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                rowCount={1000}
              >
                {({ onRowsRendered, registerChild }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => (
                      <Table
                        ref={registerChild}
                        onRowsRendered={onRowsRendered}
                        noRowsRenderer={noRowsRenderer}
                        width={width}
                        height={300}
                        headerHeight={40}
                        rowHeight={30}
                        rowCount={list.length}
                        rowGetter={({ index }) => list[index]}
                      >
                        <Column
                          label="序号"
                          //   cellDataGetter={({ rowData }) => rowData.objectId}
                          cellRenderer={({ rowIndex }) => rowIndex}
                          dataKey="index"
                          width={width / 6}
                          minWidth={50}
                        />
                        <Column
                          label="支付方式"
                          cellDataGetter={({ rowData }) => rowData.payType}
                          //   cellRenderer={({ rowIndex }) => rowIndex}
                          dataKey="payType"
                          width={width / 6}
                          minWidth={50}
                        />
                        <Column
                          label="支付状态"
                          cellDataGetter={({ rowData }) =>
                            rowData.statu ? '已完成' : '未完成'
                          }
                          //   cellRenderer={({ rowIndex }) =>
                          //     rowIndex === 1 ? '已完成' : '未完成'
                          //   }
                          dataKey="statu"
                          width={width / 6}
                          minWidth={50}
                        />
                        <Column
                          label="支付时间"
                          cellDataGetter={({ rowData }) =>
                            moment(rowData.startTime.iso)
                          }
                          //   cellRenderer={({ rowIndex }) => rowIndex}
                          dataKey="time"
                          width={width / 6}
                          minWidth={200}
                        />
                      </Table>
                    )}
                  </AutoSizer>
                )}
              </InfiniteLoader>
              {/* <VirtualizedTable
                rowCount={list.length}
                rowGetter={({ index }) => list[index]}
                columns={[
                  {
                    width: 200,
                    label: '支付方式',
                    dataKey: 'payType',
                  },
                  {
                    width: 120,
                    label: '支付状态',
                    dataKey: 'statu',
                  },
                  //   {
                  //     width: 120,
                  //     label: '支付时间',
                  //     dataKey: 'startTime',
                  //   },
                ]}
              /> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
