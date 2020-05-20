import defaultSettings from '../config/defaultSettings';
import { TOGGLE_SIDER } from '../actions/types';

const initialState = {
  ...defaultSettings,
  sider: {
    collapsed: true,
  },
};

export default function settingsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SIDER:
      return {
        ...state,
        ...{
          sider: {
            collapsed: !state.sider.collapsed,
          },
        },
      };
    default:
      return state;
  }
}