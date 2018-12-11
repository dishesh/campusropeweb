import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import {
  SUBMIT_NEW_NGO,
  FETCH_NGOS,
  FETCH_NGO_BY_ID,
  UPDATE_NGO_BY_ID,
} from './constants';
import { setNgos, setInViewNgo } from './actions';
import featherClient, { ngoService } from './../../feathers';
import { startFetchingData, stopFetchingData } from '../Home/actions';

export function* submitNewNgoDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    yield ngoService.create(values);
    yield call(resetForm);
    yield put(replace('/ngos'));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    yield call(setSubmitting, false);
  }
}

export function* fetchNgosSaga() {
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    const ngos = yield ngoService.find({});
    yield put(setNgos(ngos.data));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
  }
}

export function* updateNgoSaga({ ngo }) {
  try {
    yield put(startFetchingData());
    yield ngoService.patch(ngo._id, ngo);
    yield put(replace('/ngos/verification'));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(startFetchingData());
  }
}

export function* fetchNgoByIdSaga({ ngoId }) {
  try {
    yield put(startFetchingData());
    const ngo = yield ngoService.get(ngoId);
    yield put(setInViewNgo(ngo));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
  }
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_NGO, submitNewNgoDetails),
    takeLatest(FETCH_NGOS, fetchNgosSaga),
    takeLatest(FETCH_NGO_BY_ID, fetchNgoByIdSaga),
    takeLatest(UPDATE_NGO_BY_ID, updateNgoSaga),
  ];
}
