import sendRequest from './send-request';
const BASE_URL = '/api/quizzes';


export function fetchSelectedAgent(role) {
    return sendRequest(`${BASE_URL}/selectedAgent/${role}`, 'GET');
  }
export function calcRecommendations(role, answers) {
    return sendRequest(`${BASE_URL}/calcRecommendations`, 'POST', { role, answers });
}