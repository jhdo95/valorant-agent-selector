import sendRequest from './send-request';
const BASE_URL = '/api/quizzes';

export function fetchQuizQuestions() {
  return sendRequest(`${BASE_URL}/questions`, 'GET');
}

export function fetchSelectedAgent(role) {
    return sendRequest(`${BASE_URL}/selectedAgent/${role}`, 'GET');
  }