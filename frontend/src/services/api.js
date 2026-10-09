export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchProjects(signal) {
  const baseUrl = API_BASE_URL.replace(/\/+$/, '');

  const response = await fetch(`${baseUrl}/projects/`, {
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Projects could not be loaded. Please try again.');
  }

  const projects = await response.json();

  if (!Array.isArray(projects)) {
    throw new Error('The projects API returned an unexpected response.');
  }

  return projects;
}