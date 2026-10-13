export const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || '/api';

export class ApiError extends Error {
  constructor(message, fields = {}) {
    super(message);
    this.name = 'ApiError';
    this.fields = fields;
  }
}

export async function submitEnquiry(enquiry) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${API_BASE_URL.replace(/\/+$/, '')}/contact/`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
      signal: controller.signal,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      if (response.status === 400) throw new ApiError('Please check the highlighted fields.', data);
      if (response.status === 429) {
        throw new ApiError('Too many attempts. Please try again later or email me directly.');
      }
      throw new ApiError('Your message could not be confirmed. Try again or email me directly.');
    }
    if (typeof data.message !== 'string') throw new ApiError('Unexpected response. Please try again.');
    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError('Unable to confirm delivery. Please check your connection and try again, or email me directly.');
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchProjects(signal) {
  const baseUrl = API_BASE_URL.replace(/\/+$/, '');

  const response = await fetch(`${baseUrl}/projects/`, {
    signal,
    cache: 'no-store',
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
