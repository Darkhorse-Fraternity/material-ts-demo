import React, { useContext, useEffect, useState, useCallback, BaseSyntheticEvent } from 'react';
import * as yup from 'yup';
// @material-ui/core components
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
// import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
// core components
import Header from 'components/Header/Header';
import HeaderLinks from 'components/Header/HeaderLinks';
import Footer from 'components/Footer/FooterFront';
import GridContainer from 'components/Grid2/GridContainer';
import GridItem from 'components/Grid2/GridItem';
import Button from 'components/CustomButtons/Button';
import Card from 'components/Card2/Card';
import CardBody from 'components/Card2/CardBody';
import CardHeader from 'components/Card2/CardHeader';
import CardFooter from 'components/Card2/CardFooter';
import CustomInput from 'components/CustomInput/CustomInput';
import { DataContext } from 'components/DataContext';
import { useApiLogin } from 'api';
import {} from 'config/yue';
import styles from 'assets/jss/material-kit-react/views/loginPage';
import image from 'assets/img/bg7.jpg';
import ErrorLable from 'components/CustomInput/ErrorLable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyStyles = styles as any;

const useStyles = makeStyles(anyStyles);

// const ErrorLableCenter = ErrorLable.

// const reg = /^1([345789])\d{9}$/;
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .max(50)
    .trim()
    .required()
    // .matches(reg, '手机号码不正确。')
    .label('账号'),
  password: yup
    .string()
    .max(50)
    .trim()
    .required()
    .label('密码'),
});

export type LoginType = {
  username: string;
  password: string;
};


interface LoginPageType {}

export default function LoginPage(props: LoginPageType) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  const { control, handleSubmit, errors } = useForm<LoginType>({
    validationSchema,
    mode: 'onSubmit',
    // defaultValues: {password: '11111'},
  });

  

  setTimeout(() => {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  const { dispatch } = useContext(DataContext);
  const [signData, setSignData] = useState<LoginType>();

  const { data, revalidate, mutate, error, isValidating } = useApiLogin(
    { username:signData?.username || '', password:signData?.password ||'' },
    { autoTrigger: false, shouldRetryOnError:false }
  );

  const onSubmit = (signIndata: LoginType, event?:BaseSyntheticEvent) => {
    event && event.preventDefault();
    setSignData(signIndata);
    // mutate();
  };
  const memoHanleSubmit = useCallback(handleSubmit(onSubmit), []);


  useEffect(() => {
    if (data) {
      dispatch({ type: 'login', user: data });
    }
    return () => {
      mutate(undefined, false);
    };
  }, [data, dispatch, mutate]);


  useEffect(()=>{
    if(signData){
      revalidate();
    } 
  }, [signData, revalidate]);

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material TS Demo"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>登录</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        // href="#pablo"
                        // target="_blank"
                        color="transparent"
                        // onClick={(e) => e.preventDefault()}
                      >
                        <i className="fab fa-twitter" />
                      </Button>
                      <Button
                        justIcon
                        // href="#pablo"
                        // target="_blank"
                        color="transparent"
                        // onClick={(e) => e.preventDefault()}
                      >
                        <i className="fab fa-facebook" />
                      </Button>
                      <Button
                        justIcon
                        // href="#pablo"
                        // target="_blank"
                        color="transparent"
                        // onClick={(e) => e.preventDefault()}
                      >
                        <i className="fab fa-google-plus-g" />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <ErrorLable error={error?.response?.data.error} style={{ textAlign:'center' }} />
                  <CardBody>
                    <Controller
                      as={CustomInput}
                      error={!!errors.username}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      name="username"
                      labelText="账号"
                      control={control}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                      //   defaultValue="?"
                    />
                    <ErrorLable error={errors.username} />
                    {/* <div> asdasdasdsd</div> */}
                    {/* <CustomInput
                      labelText="账号"
                      id="account"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    /> */}
                    {/* <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'email',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    /> */}

                    <Controller
                      as={CustomInput}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      error={!!errors.password}
                      name="password"
                      labelText="密码"
                      control={control}
                      inputProps={{
                        type: 'text',
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: 'off',
                      }}
                    />
                    <ErrorLable error={errors.password} />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
              
                    <Button
                      simple
                      loading={isValidating}
                      color="primary"
                      size="lg"
                    //   startIcon={}
                      onClick={memoHanleSubmit}
                    >
                      点击登录
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
