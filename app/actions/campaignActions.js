import agent from '../agent';
import {
  CAMPAIGN_RESET_REDIRECT,
  CAMPAIGNS_PAGE_UNLOAD,
  CREATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  EDIT_CAMPAIGN_LOAD,
  FILTER_CAMPAIGN,
  GET_CAMPAIGNS,
  GET_DETAIL_CAMPAIGN,
  UPDATE_CAMPAIGN
} from '../constants/actionTypes';

export function getCampaigns(page = 1) {
  return {
    type: GET_CAMPAIGNS,
    payload: agent.Campaign.getAll(page)
  };
}

export function onLoadEdit(id) {
  return {
    type: EDIT_CAMPAIGN_LOAD,
    payload: agent.Campaign.show(id)
  };
}

export function createCampaign(data) {
  return {
    type: CREATE_CAMPAIGN,
    payload: agent.Campaign.create(data)
  };
}

export function deleteCampaign(id) {
  return {
    type: DELETE_CAMPAIGN,
    payload: agent.Campaign.delete(id)
  };
}

export function onUnLoad() {
  return {
    type: CAMPAIGNS_PAGE_UNLOAD
  };
}

export function getCampaign(id) {
  return {
    type: GET_DETAIL_CAMPAIGN,
    payload: agent.Campaign.show(id)
  };
}

export function onFilter(type, page = 1) {
  return {
    type: FILTER_CAMPAIGN,
    payload: agent.Campaign.filter(type, page)
  };
}

export function putCampaign(id, data) {
  return {
    type: UPDATE_CAMPAIGN,
    payload: agent.Campaign.update(id, data)
  };
}

export function onRedirect() {
  return {
    type: CAMPAIGN_RESET_REDIRECT
  };
}
