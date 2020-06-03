import React, { FC, ReactNode } from 'react';
// @material-ui/core components

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// core components
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import CustomInput from 'components/CustomInput/CustomInput';
import Button, { RegularButtonType } from 'components/CustomButtons/Button';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import Table from 'components/Table/Table';
import Select from '@material-ui/core/Select';
import {
  FormControl,
  MenuItem,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';


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

export default function Search() {
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
          <Card plain>
            {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader> */}
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  分类:{'   '}
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
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal-code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: '#AAAAAA' }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about-me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            {/* <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Simple Table</h4>
              <p className={classes.cardCategoryWhite}>
                Here is a subtitle for this table
              </p>
            </CardHeader> */}
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={['Name', 'Country', 'City', 'Salary']}
                tableData={[
                  ['Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
                  ['Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
                  ['Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
                  ['Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
                  [
                    'Doris Greene',
                    'Malawi',
                    'Feldkirchen in Kärnten',
                    '$63,542',
                  ],
                  ['Mason Porter', 'Chile', 'Gloucester', '$78,615'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
