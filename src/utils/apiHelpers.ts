import axios from 'axios';
import config from '../config';
import { container } from '@sapphire/framework';

export async function postRequest(url: string, body: object) {
  const request_url = config.apiBaseUrl + url;
  container.logger.info(`Sending post request to ${request_url}`);
  return await axios //
    .post(request_url, body)
    .then((response) => {
      return response.data.message;
    })
    .catch((error) => {
      container.logger.error(error);
      const error_message = error?.response
        ? `${error.response?.status}`
        : error.code == 'ECONNREFUSED'
        ? "API couldn't be reached and probably isn't running. Ping <@211481842312806400>"
        : `${error.code}`;
      return `API Error: ${error_message}`;
    });
}
