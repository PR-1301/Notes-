import axios from "axios";

export const loginUser = (credentials) => {
  return axios.post(
    "https://classroom-4pkw.onrender.com/student/login",
    credentials
  );
};

export const loginAdmin = (credentials) => {
  return axios.post(
    "https://classroom-4pkw.onrender.com/admin/login",
    credentials
  );
};

export const registerStudent = (credentials) => {
  return axios.post(
    "https://classroom-4pkw.onrender.com/student/register",
    credentials
  )
}
export const uploadNotes = (token, formData) => {
  return axios.post(
    "https://classroom-4pkw.onrender.com/notes/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};
