const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

export async function compareResumes(oldFile, newFile) {
  const formData = new FormData();
  formData.append("oldResume", oldFile);
  formData.append("newResume", newFile);

  const res = await fetch(`${API_BASE}/api/compare`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong while comparing resumes.");
  }

  return data.report;
}
