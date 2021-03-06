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
import { number } from 'prop-types';

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



export default function SearchForm() {
  const classes = useStyles();
  const [value, setValue] = React.useState('female');




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
  );
}
