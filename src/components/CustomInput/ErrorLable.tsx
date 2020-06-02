
import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { FieldError } from 'react-hook-form';

const StyledErrorLable = styled.div`
   color:red;
   /* font-size: 1.5em; */
`;

interface ErrorLableType extends HTMLAttributes<HTMLDivElement> {
  error?:FieldError | string
}


const ErrorLable:FC<ErrorLableType> = ({ error, ...rest })=>{
  if(error){
    return <StyledErrorLable {...rest}>{typeof error ==='string'?error: error.message} </StyledErrorLable>;
  }
  return null;
};






export default ErrorLable;