import React from 'react';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import FormControl, { FormControlTypeMap } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import Input, { InputProps } from '@material-ui/core/Input';
// @material-ui/icons
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check';
// core components
import styles from 'assets/jss/material-dashboard-react/components/customInputStyle';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const anyStyles = styles as any;

const useStyles = makeStyles(anyStyles);


interface CustomInputType {
  formControlProps:FormControlTypeMap['props'] & {className?:string};
  labelText?: string;
  id?:string;
  labelProps?:InputLabelProps;
  error?:boolean;
  success?:boolean;
  inputProps?:InputProps;
  value?:string;
}

export default function CustomInput(props:CustomInputType) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    value,
    ...rest
  } = props;

  

  const labelClasses = classNames({
    [` ${  classes.labelRootError}`]: error,
    [` ${  classes.labelRootSuccess}`]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });

  const successCheck = success ? (
    <Check className={`${classes.feedback  } ${  classes.labelRootSuccess}`} />
  ) : null;

  return (
    <FormControl
      {...formControlProps}
      className={`${formControlProps.className  } ${  classes.formControl}`}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}
      <Input
        classes={{
          root: marginTop,
          disabled: classes.disabled,
          underline: underlineClasses
        }}
        id={id}
        {...inputProps}
        {...rest}
      />
      {error ? (
        <Clear className={`${classes.feedback  } ${  classes.labelRootError}`} />
      ) : successCheck}
    </FormControl>
  );
}

// CustomInput.propTypes = {
//   labelText: PropTypes.node,
//   labelProps: PropTypes.object,
//   id: PropTypes.string,
//   inputProps: PropTypes.object,
//   formControlProps: PropTypes.object,
//   error: PropTypes.bool,
//   success: PropTypes.bool
// };
