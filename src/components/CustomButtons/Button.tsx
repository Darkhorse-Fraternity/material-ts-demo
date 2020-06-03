import React, { FC, HTMLAttributes } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
// import PropTypes from 'prop-types';

// material-ui components
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonTypeMap } from '@material-ui/core/Button';

import styles from 'assets/jss/material-dashboard-react/components/buttonStyle';
import { CircularProgress } from '@material-ui/core';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylesAny = styles as any;

const useStyles = makeStyles(stylesAny);


interface RegularButtonTypeIn  extends  HTMLAttributes<HTMLButtonElement>{
  color?:  'primary'|
  'info'|
  'success'|
  'warning'|
  'danger'|
  'rose'|
  'white'|
  'transparent';
  size?: 'sm'|'lg';
  simple?: boolean;
  round?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?:boolean;
  justIcon?: boolean;
  className?: string;
  loading?: boolean;
  // use this to pass the classes props from Material-UI
  muiClasses?: object;
}
type ButtonTypeProps =  ButtonTypeMap<{}>['props'];
type ButtonTypeMap2 = Omit<ButtonTypeProps, 'color'|'size'>;

export type RegularButtonType =  RegularButtonTypeIn & ButtonTypeMap2;

const RegularButton:FC<RegularButtonType> = props=> {
  const classes = useStyles();
  const {
    color = 'primary',
    round,
    children,
    disabled,
    simple,
    size = 'sm',
    block,
    link,
    justIcon,
    className ='',
    muiClasses,
    loading,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });

 

  return (
    <Button {...rest} classes={muiClasses} className={btnClasses} disabled={disabled || loading}>
      {loading? <CircularProgress size={20}  />:children}
    </Button>
  );
};


export default RegularButton;
// RegularButton.propTypes = {
//   color: PropTypes.oneOf([
//     'primary',
//     'info',
//     'success',
//     'warning',
//     'danger',
//     'rose',
//     'white',
//     'transparent'
//   ]),
//   size: PropTypes.oneOf(['sm', 'lg']),
//   simple: PropTypes.bool,
//   round: PropTypes.bool,
//   disabled: PropTypes.bool,
//   block: PropTypes.bool,
//   link: PropTypes.bool,
//   justIcon: PropTypes.bool,
//   className: PropTypes.string,
//   // use this to pass the classes props from Material-UI
//   muiClasses: PropTypes.object,
//   children: PropTypes.node
// };
