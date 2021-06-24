import * as MapActionTypes from './MapActionTypes';

export interface ICurrentPlanInfoView {
  type: undefined | string,
  baseId?: string,
  waveNo?: number
}

export interface ICurrentAlertInfoView {
  type: undefined | string,
  content?: string,
}

export interface IAOSelect {
  type: string,
  name: string,
  value: string
}

export interface IMapAction {
  type: string,
  AOCenter: number[],
  AORange: number,
  AOShape: any,
  AOSelect: IAOSelect,

  currentViewName: MapActionTypes.CURRENT_VIEW_TYPE,
  currentPlanInfoView: ICurrentPlanInfoView
  currentAlertInfoView: ICurrentAlertInfoView
}

const initialState = {
  AOCenter: [103.8, 1.353156122703993],
  AORange: 50,
  AOShape: null,
  AOSelect: { type: 'GARO', name: 'ALL', value: 'ALL' },
  currentViewName: MapActionTypes.CURRENT_VIEW_TYPE.NONE,
  currentPlanInfoView: { type: undefined },
  currentAlertInfoView: { type: undefined },
};

const MapReducer = (state = initialState, action: IMapAction) => {
  const { type } = action;
  if (type === MapActionTypes.MAP_AREA_OF_OPS) {
    const { AOCenter, AORange, AOShape, AOSelect } = action;
    return { ...state, AOCenter, AORange, AOShape, AOSelect };
  } if (type === MapActionTypes.CURRENT_VIEW_NAME) {
    const { currentViewName } = action;
    return { ...state, currentViewName };
  } if (type === MapActionTypes.CURRENT_PLAN_INFO_VIEW) {
    const { currentPlanInfoView } = action;
    return { ...state, currentPlanInfoView };
  } if (type === MapActionTypes.CURRENT_ALERT_INFO_VIEW) {
    const { currentAlertInfoView } = action;
    return { ...state, currentAlertInfoView };
  }
  return state;
};

export default MapReducer;
