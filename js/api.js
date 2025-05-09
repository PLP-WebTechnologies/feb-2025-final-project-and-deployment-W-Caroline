// API service for communicating with the backend
const API_BASE_URL = 'https://your-fastapi-backend.com/api';

async function apiRequest(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('authToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        method,
        headers,
    };
    
    if (data) {
        config.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// Example API functions
export async function login(email, password, role) {
    return apiRequest('/auth/login', 'POST', { email, password, role });
}

export async function getTeacherClasses() {
    return apiRequest('/teacher/classes');
}

export async function getStudentGrades(studentId) {
    return apiRequest(`/student/${studentId}/grades`);
}

export async function submitGrade(classId, studentId, assignment, score) {
    return apiRequest('/grades', 'POST', { classId, studentId, assignment, score });
}