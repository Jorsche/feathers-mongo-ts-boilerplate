import * as WidgetActionTypes from './WidgetActionTypes';

export const setReduxVar = (aVar: number) => ({
  type: WidgetActionTypes.REDUXVAR,
  reduxVar: aVar,
});
