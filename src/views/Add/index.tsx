import React, { FC } from 'react';
// @material-ui/core components

import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button, { RegularButtonType } from 'components/CustomButtons/Button';
import Select from '@material-ui/core/Select';
import {
  FormControl,
  MenuItem,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Card from 'components/Card/Card';
import CardFooter from 'components/Card/CardFooter';


const categorys = [
  { lable:'选择1', value:'value1' }, 
  { lable:'选择2', value:'value2' }, 
  { lable:'选择3', value:'value3' }, 
  { lable:'选择4', value:'value4' }, 
  { lable:'选择5', value:'value5' }];

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
};

const useStyles = makeStyles(styles);

export default function Add(props:unknown) {
    
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>订单</h4>
              <p className={classes.cardCategoryWhite}>订单提交</p>
            </CardHeader>
            <CardBody>
              <GridItem xs={12} sm={12} md={12}>
                支付方式:{'   '}
                {categorys.map(({ value:value1, lable })=>(
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
                支付状态:{'   '}
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
              <GridContainer>
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
            </CardBody>
            <CardFooter>
              <Button color="primary">提交</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
