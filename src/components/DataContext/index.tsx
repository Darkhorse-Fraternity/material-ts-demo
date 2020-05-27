import React, { createContext, useReducer, FC } from 'react';

export interface UserType {
  sessionToken: string;
  updatedAt: string;
  objectId: string;
  username: string;
  createdAt: string;
  emailVerified: boolean;
  mobilePhoneVerified: boolean;
}

export interface StateType {
  user: UserType | undefined;
}
export type Action = { type: 'login'; user: UserType } | { type: 'logout' };

interface DataContextType {
  config: Object;
  initialState?: StateType;
}

export interface BaseProviderValueType {
  data: StateType;
  dispatch: React.Dispatch<Action>;
}

const defaultInitialState = {
  user: undefined,
};

const userString = localStorage.getItem('sessionToken');
if (userString) {
  const user = JSON.parse(userString);
  //   console.log('user', user);
  defaultInitialState.user = user;
}

export const DataContext = createContext<BaseProviderValueType>({
  data: defaultInitialState,
  dispatch: () => {},
});
const BaseProvider = DataContext.Provider;

export const Provider: FC<DataContextType> = (props) => {
  const { children, initialState = defaultInitialState } = props;

  const dataReducer = (preState: StateType, action: Action) => {
    switch (action.type) {
      case 'login':
        localStorage.setItem('sessionToken', JSON.stringify(action.user));
        return { ...preState, user: action.user };
      case 'logout':
        localStorage.removeItem('sessionToken');
        return { ...preState, user: undefined };
      default:
        return { ...preState };
    }
  };

  const [data, _dispatch] = useReducer(dataReducer, initialState);
  //   const dataReducer = createDataReducer(initialState);
  //   const reducer = useReducer(dataReducer, initialState);
  //   const [data, _dispatch] = reducer;

  //   const value = {
  //     data,
  //   };
  const value = {
    data,
    dispatch: _dispatch,
  };

  return <BaseProvider value={value}>{children}</BaseProvider>;
};

export const { Consumer } = DataContext;

export default DataContext;
