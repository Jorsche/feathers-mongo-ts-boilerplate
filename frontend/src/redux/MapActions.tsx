import * as MapActionTypes from './MapActionTypes';
import { CURRENT_VIEW_TYPE } from './MapActionTypes';
import {IAOSelect, ICurrentAlertInfoView, ICurrentPlanInfoView } from './MapReducer';

export const setAreaOfOps = (AOCenter: number[], AORange: number, AOShape: any, AOSelect: IAOSelect) => ({
  type: MapActionTypes.MAP_AREA_OF_OPS,
  AOCenter,
  AORange,
  AOShape,
  AOSelect,
});

export const setCurrentAlertInfoView = (currentAlertInfoView: ICurrentAlertInfoView) => ({
  type: MapActionTypes.CURRENT_ALERT_INFO_VIEW,
  currentAlertInfoView,
});

export const setCurrentPlanInfoView = (currentPlanInfoView: ICurrentPlanInfoView) => ({
  type: MapActionTypes.CURRENT_PLAN_INFO_VIEW,
  currentPlanInfoView,
});

export const setCurrentViewName = (currentViewName: CURRENT_VIEW_TYPE) => ({
  type: MapActionTypes.CURRENT_VIEW_NAME,
  currentViewName,
});

export const type2Title = (type: any) => {
  const titles: any = {
    WIDGET_WEATHER: 'Weather',
    WIDGET_TRAFFIC: 'Traffic',
    WIDGET_DRAW: 'Battle Plan',
    WIDGET_AIR: 'Air Domain',
    WIDGET_AIR_POWER: 'Air Power Domain',
    WIDGET_AIR_DEFENCE: 'Air Defence Domain',
    WIDGET_AIR_SPACE: 'Air Space Domain',
    WIDGET_SEA: 'Sea Domain',
    WIDGET_LAND: 'Land Domain',
    WIDGET_INFO: 'Information Domain',
    WIDGET_CYBER: 'Cyber Domain',
  };
  return titles[type];
};
