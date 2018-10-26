/*
 *
 * UserProfile reducer
 *
 */

import {
  DEFAULT_ACTION,
  PROFILE_TAB_SELECTION_ACTION,
  PROFILE_INFO_FETCH_SUCCESS_ACTION,
} from './constants';
import ProfileTabType from './ProfileTabTypeModel';

export const initialState = {
  selectedTab: ProfileTabType.typeTypeMap.ABOUT_TAB,
  userProfileInfo: {},
};

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case PROFILE_INFO_FETCH_SUCCESS_ACTION:
      return {
        ...state,
        userProfileInfo: action.userProfile,
      };
    case PROFILE_TAB_SELECTION_ACTION:
      return {
        ...state,
        selectedTab: action.selectedTab,
      };
    default:
      return state;
  }
}

export default userProfileReducer;
