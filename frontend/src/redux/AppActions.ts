import * as AppActionTypes from './AppActionTypes';

export const setPermission = (iPermission: number) => ({
  type: AppActionTypes.APP_PERMISSION,
  permission: iPermission,
});

export const setMobileMode = (isMobileMode: boolean) => ({
  type: AppActionTypes.APP_MOBILE_MODE,
  mobileMode: isMobileMode,
});

export const setWindowWidth = (iWidth: number) => ({
  type: AppActionTypes.APP_WINDOW_WIDTH,
  windowWidth: iWidth,
});

export const setTitle = (iTitle: string) => ({
  type: AppActionTypes.APP_TITLE,
  title: iTitle,
});

export const setSubTitle = (iSubTitle: string) => ({
  type: AppActionTypes.APP_SUB_TITLE,
  subTitle: iSubTitle,
});

export const setUserProfile = (iUserProfile: any) => ({
  type: AppActionTypes.APP_USER_PROFILE,
  userProfile: iUserProfile,
});

export const setConnected = (iConnected: boolean) => ({
  type: AppActionTypes.APP_CONNECTED,
  connected: iConnected,
});

export const setShowTitle = (iShowTitle: boolean) => ({
  type: AppActionTypes.APP_SHOW_TITLE,
  showTitle: iShowTitle,
});

export const setCurrentGARO = (GC_CODE: string) => ({
  type: AppActionTypes.APP_GC_CODE,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  currentGC_CODE: GC_CODE,
});

export const setPOPWidgetMounted = (mounted: boolean) => ({
  type: AppActionTypes.APP_POP_WIDGET_MOUNTED,
  isPOPWidgetMounted: mounted,
});

export const setShowHistIncChart = (iShowHistIncChart: boolean) => ({
  type: AppActionTypes.APP_INC_CHART_MOUNTED,
  showHistIncChart: iShowHistIncChart,
});
