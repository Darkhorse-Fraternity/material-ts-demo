import React, { FC } from 'react';
// @material-ui/core components

import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
// import { RegularButtonType } from 'components/CustomButtons/Button';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import { FormGroup, Checkbox, FormControlLabel, CheckboxProps } from '@material-ui/core';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Card from 'components/Card/Card';
import CardFooter from 'components/Card/CardFooter';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button, { ButtonTypeMap } from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
// const moment = require('moment');
require('moment/locale/zh-cn');

const validationSchema = yup.object().shape({
  startTime: yup
    .date()
    .required()
  // .matches(reg, '手机号码不正确。')
    .label('开始时间'),
  endTime: yup
    .date()
    .required()
  // .matches(reg, '手机号码不正确。')
    .label('结束时间'),
  payType: yup.string().max(50).trim().required().label('支付类型'),
  statu: yup.number().max(1).required().label('支付状态'),
  discrib: yup.string().max(1).trim().required().label('支付描述'),
});

export type OrderType = {
  startTime: Date;
  endTime: Date;
  payType:string;
  statu:number;
  discrib:string;
};


const categorys = [
  { lable: '微信支付', value: 'wechat' },
  { lable: '支付宝', value: 'alipay' },
  { lable: '余额', value: 'cash' },
];

interface RadioButtonType extends Omit<ButtonTypeMap['props'], 'onClick'> {
  disabled?: boolean;
  value?: unknown;
  checked: boolean;
  onClick?: (e: unknown) => void;
}

const RadioButton: FC<RadioButtonType> = (props) => {
  const { children, disabled, checked, onClick, value, ...rest } = props;
  return (
    <Button
      disabled={disabled}
      color="primary"
      style={{ width: 100, marginLeft: '20px' }}
      variant={checked ? 'outlined' : undefined}
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
  label: {
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: 400,
    paddingLeft: '0',
    letterSpacing: 'normal',
  },
};

const useStyles = makeStyles(styles);


interface RadioButtonsType {
  value?:string;
  onChange?:(e: unknown) => void
}

const RadioButtons = (props:RadioButtonsType)=>{
  const { value, onChange } = props;
  return (
    <>
      {categorys.map(({ value: value1, lable }) => (
        <RadioButton
          value={value1}
          key={value1}
          checked={value === value1}
          onClick={onChange}
        >
          {lable}
        </RadioButton>
      ))}
    </>
  );
};


interface CheckboxGroupType extends CheckboxProps {
  value?:{checked:boolean}
  onCheck?:(e:{checked:boolean})=>void
}

const CheckboxGroup = (props:CheckboxGroupType)=>{
  const { onCheck, value } = props;
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={!!value && value.checked}
            onChange={(e, checked)=>{                
              onCheck && onCheck({ checked });
            }}
            name="checkedA"
          />
          }
        label="已支付"
      />
    </FormGroup>
  );
};


export default function Add(props: unknown) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const { control, handleSubmit, errors } = useForm<OrderType>({
    validationSchema,
    mode: 'onSubmit',
    defaultValues: { payType: 'wechat' },
  });

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
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel
                    style={{ color: '#AAAAAA' }}
                    className={classes.label}
                  >
                    支付方式
                  </InputLabel>
                  <Controller
                    as={RadioButtons}
                    // error={!!errors.payType}
                    name="payType"
                    control={control}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel
                    style={{ color: '#AAAAAA' }}
                    className={classes.label}
                  >
                    支付状态
                  </InputLabel>
                  <Controller
                    as={CheckboxGroup}
                    // error={!!errors.payType}
                    name="statu"
                    onChangeName="onCheck"
                    control={control}
                  />
                  {/* <CheckboxGroup checkState={state} /> */}
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel
                    style={{ color: '#AAAAAA' }}
                    className={classes.label}
                  >
                    开始时间
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Controller
                      as={Datetime}
                    // error={!!errors.payType}
                      inputProps={{ placeholder: '选择开始时间' }}
                      name="startTime"
                      control={control}
                    />

                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <InputLabel
                    style={{ color: '#AAAAAA' }}
                    className={classes.label}
                  >
                    结束时间
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Controller
                      as={Datetime}
                    // error={!!errors.payType}
                      inputProps={{ placeholder: '选择结束时间' }}
                      name="endTime"
                      control={control}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: '#AAAAAA' }}>订单描述</InputLabel>
                  <Controller
                    as={CustomInput}
                    // error={!!errors.payType}
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                    name="discrib"
                    control={control}
                  />
                  {/* <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  /> */}
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
