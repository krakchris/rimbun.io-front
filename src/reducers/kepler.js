import { createAction, handleActions } from 'redux-actions';
import KeplerGlSchema from 'kepler.gl/schemas';
import { setExportFiltered } from 'kepler.gl/actions'
import { toast } from 'react-toastify';
// CONSTANTS
export const SAVE_CONFIG = 'SAVE_CONFIG';
export const CHANGE_NOTIFY = 'CHANGE_NOTIFY';

// ACTIONS
export const saveConfig = createAction(SAVE_CONFIG);


export const setMapConfig = (payload) => {

    return async (dispatch) => {
        dispatch(saveConfig(payload));
        toast.success("Config is saved !", {
            position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(setExportFiltered(true));
    }
}


// INITIAL_STATE
const initialState = {
    appName: 'example'
};

// REDUCER
const keplerReducer = handleActions(
  {
    [SAVE_CONFIG]: (state, action) => ({
      ...state,
      mapConfig: localStorage.setItem(
        "data",
        JSON.stringify(KeplerGlSchema.save(action.payload))
      )
    })
  },
  initialState
);

export default keplerReducer;
