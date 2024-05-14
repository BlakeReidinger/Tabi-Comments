import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "../../services/serviceHelpers";

let commentFormService = { endpoint: `${API_HOST_PREFIX}/api/comments` };

const addComment = (payload) => {
  const config = {
    method: "POST",
    url: commentFormService.endpoint,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getComment = (entityId, entityTypeId) => {
  const config = {
    method: "GET",
    url: `${commentFormService.endpoint}/${entityId}/${entityTypeId}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateComment = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${commentFormService.endpoint}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { addComment, getComment, updateComment };
