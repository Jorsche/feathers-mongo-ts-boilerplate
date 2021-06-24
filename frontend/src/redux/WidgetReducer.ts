import * as types from './WidgetActionTypes';

export interface IWidgetAction {
  type: string,
  reduxVar: number,
}

const initialState = {
  reduxVar: 0,
};

// eslint-disable-next-line complexity
const WidgetReducer = (state = initialState, action: IWidgetAction) => {
  switch (action.type) {
    case types.REDUXVAR:
      return { ...state, reduxVar: action.reduxVar };
    default:
      return state;
  }
};

export default WidgetReducer;
