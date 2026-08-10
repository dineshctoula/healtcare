export const API_BASE = '/api';

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn('Backend API offline or loading, using fallback catalog', err);
    return null;
  }
}

export async function bookConsultation(bookingData: any) {
  const res = await fetch(`${API_BASE}/consultations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Consultation request failed');
  return await res.json();
}

export async function trackDataFlow(query: string) {
  const res = await fetch(`${API_BASE}/verification/track/${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Tracking search failed');
  const data = await res.json();
  return data.data;
}

export async function applyCandidate(candidateData: any) {
  const res = await fetch(`${API_BASE}/recruitment/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(candidateData),
  });
  if (!res.ok) throw new Error('Candidate registration failed');
  return await res.json();
}

export async function requestStaffing(staffingData: any) {
  const res = await fetch(`${API_BASE}/recruitment/staffing-request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(staffingData),
  });
  if (!res.ok) throw new Error('Staffing request failed');
  return await res.json();
}

export async function fetchExamQuestions(category?: string) {
  const url = category ? `${API_BASE}/exam-prep/questions?category=${encodeURIComponent(category)}` : `${API_BASE}/exam-prep/questions`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch exam questions');
  const data = await res.json();
  return data.data;
}

export async function submitExamAnswers(answers: { questionId: string; selectedIndex: number }[]) {
  const res = await fetch(`${API_BASE}/exam-prep/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error('Exam submission failed');
  const data = await res.json();
  return data.data;
}

export async function fetchAdminStats() {
  const res = await fetch(`${API_BASE}/admin/stats`);
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  const data = await res.json();
  return data.data;
}
