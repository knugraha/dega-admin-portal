import axios from '../utils/axios';
import { successNotification, errorNotification } from '../utils/notification';

import {
  GET_SPACES_SUCCESS,
  GET_SPACES_FAILURE,
  ADD_SPACE_FAILURE,
  ADD_SPACE_SUCCESS,
  LOADING_SPACES,
  API_ADD_SPACES,
  API_GET_SPACES,
} from '../constants/spaces';

export const getSpaces = () => {
  console.log('Get Spaces');
  return async (dispatch, getState) => {
    dispatch(loadingSpaces());
    const response = await axios({
      url: API_GET_SPACES,
      method: 'get',
    }).catch((error) => {
      errorNotification(error.message);
      dispatch(getSpacesFailure(error.message));
    });
    if (response) {
      console.log(response);
      dispatch(getSpacesSuccess(response.data.results));
    }
  };
};

const loadingSpaces = () => ({
  type: LOADING_SPACES,
});

const getSpacesSuccess = (spaces) => ({
  type: GET_SPACES_SUCCESS,
  payload: spaces,
});

const getSpacesFailure = (error) => ({
  type: GET_SPACES_FAILURE,
  payload: {
    error,
  },
});

export const addSpaces = (data) => {
  return async (dispatch, getState) => {
    dispatch(loadingSpaces());
    const response = await axios({
      url: API_ADD_SPACES,
      method: 'post',
      data: data,
    }).catch((error) => {
      errorNotification(error.message);
      dispatch(addSpacesFailure(error.message));
    });
    if (response) {
      console.log(response);
      successNotification();
      dispatch(addSpacesSuccess(data));
    }
  };
};

const addSpacesSuccess = (space) => ({
  type: ADD_SPACE_SUCCESS,
  payload: {
    ...space,
  },
});

const addSpacesFailure = (error) => ({
  type: ADD_SPACE_FAILURE,
  payload: {
    error,
  },
});
