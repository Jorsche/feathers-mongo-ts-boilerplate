/* eslint-disable @typescript-eslint/naming-convention */
import { RESTRICTED } from '../AppConstants';
import * as types from './AppActionTypes';

export interface IAppAction {
  type: string,
  permission: number,
  mobileMode: boolean,
  windowWidth: number,
  title: string,
  subTitle: string,
  userProfile: any,
  connected: boolean,

  // eslint-disable-next-line @typescript-eslint/naming-convention
  currentGC_CODE: string,
  showTitle: boolean,
  isPOPWidgetMounted: boolean,
  showHistIncChart: boolean,
}

const initialState = {
  permission: RESTRICTED,
  mobileMode: true,
  windowWidth: 400,
  title: '',
  subTitle: '',
  userProfile: {},
  connected: false,
  currentGC_CODE: '',
  showTitle: true,
  isPOPWidgetMounted: false,
  showHistIncChart: false,
};

// eslint-disable-next-line complexity
const AppReducer = (state = initialState, action: IAppAction) => {
  switch (action.type) {
    case types.APP_PERMISSION:
      return { ...state, permission: action.permission };

    case types.APP_MOBILE_MODE:
      return { ...state, mobileMode: action.mobileMode };

    case types.APP_WINDOW_WIDTH:
      return { ...state, windowWidth: action.windowWidth };

    case types.APP_TITLE:
      return { ...state, title: action.title };

    case types.APP_SUB_TITLE:
      return { ...state, subTitle: action.subTitle };

    case types.APP_USER_PROFILE:
      return { ...state, userProfile: action.userProfile };

    case types.APP_CONNECTED:
      return { ...state, connected: action.connected };

    case types.APP_GC_CODE:
      return { ...state, currentGC_CODE: action.currentGC_CODE };

    case types.APP_SHOW_TITLE:
      return { ...state, showTitle: action.showTitle };

    case types.APP_POP_WIDGET_MOUNTED:
      return { ...state, isPOPWidgetMounted: action.isPOPWidgetMounted };
    case types.APP_INC_CHART_MOUNTED:
      return { ...state, showHistIncChart: action.showHistIncChart };

    default:
      return state;
  }
};

export default AppReducer;
