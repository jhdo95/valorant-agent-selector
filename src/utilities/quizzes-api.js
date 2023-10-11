import sendRequest from './send-request';
const BASE_URL = '/api/quizzes';

export function fetchQuizQuestions() {
  return sendRequest(`${BASE_URL}/questions`, 'GET');
}