import axios from 'axios';

import LocalStorageService from "../services/LocalStorageService";

import { Project, Task } from '../types/types';

const localStorageService = LocalStorageService.getService();


const api = axios.create({
    baseURL: "https://tushirikiane-project-tracking-app.onrender.com/",
    headers: {
        'Content-Type': 'application/json',
    },
});


// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
// Add a request interceptor
api.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

api.interceptors.response.use((response) => {
    return response
},
    function (error) {
        const originalRequest = error.config;
        if (error?.response?.status === 401 && !originalRequest?._retry) {
            console.log('401 error Getting refresh token')
            originalRequest._retry = true;
            return api.post('auth/jwt/refresh/',
                {
                    "refresh": localStorageService.getRefreshToken()
                })
                .then(res => {
                    if (res.status === 200) {
                        // 1) put token to LocalStorage
                        localStorageService.setToken(res.data);

                        // 2) Change Authorization header
                        api.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

                        // 3) return originalRequest object with axios.
                        return api(originalRequest);
                    }
                })
        }

        // return Error object with Promise
        return Promise.reject(error);
    });

export async function login(data: { email: string; password: string; }) {
    try {
        const response = await api.post('auth/jwt/create/', data);
        console.log("Attempt")
        localStorageService.setToken(response.data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function logout() {
    const response = await api.post('/token/logout');
    return response.data;
}

// {
//     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwODUwNjc5MiwiaWF0IjoxNzA4NDIwMzkyLCJqdGkiOiI4MTZmNmI0NjlkNWU0ZDVlODgwYmUzNWY2MmVlOTAzOSIsInVzZXJfaWQiOjJ9.HDvSgRvz5aM_4VGLwDQigcg_7z3PYCY7dtIi_hQyYNI",
//     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA4NDIwNjkyLCJpYXQiOjE3MDg0MjAzOTIsImp0aSI6IjE1YTgyMzRhNjg1ZTQ4YmQ5NGI5MzliNGE3MTAzZWNjIiwidXNlcl9pZCI6Mn0.V9lN0ymbb1HSG4fXvQ318RujIgejyS2SE-bufqraCmU"
// }


// export async function register(data) {
//   const response = await api.post('/auth/register', data);
//   return response.data;
// }

// export async function getProfile() {
//   const response = await api.get('/auth/profile');
//   return response.data;
// }

export async function addMembers(emails: string[], projectId: string | undefined) {
    try {
        const emails_str: string = emails.toString();
        const response = await api.post(`/projects/${projectId}/members/`, { members: emails_str });
        console.log(emails_str);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function me() {
    try {
        const response = await api.get(`/auth/users/me`)
        return response.data
    } catch (error) {
        return Promise.reject(error)
    }
}

export async function getMembers(projectId: string | undefined) {
    try {
        const response = await api.get(`/projects/${projectId}/members`);
        return response.data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getProjects() {
    try {
        const response = await api.get('/projects');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getProject(projectId: string | undefined) {
    try {
        const response = await api.get(`/projects/${projectId}`);
        return response.data;
    }
    catch (error) {
        return Promise.reject(error);
    }
}

export async function getProjectTasks(projectId: string) {
    try {
        const response = await api.get('projects/1/tasks');
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function getTask(id: string) {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
}

export async function getTaskRequests(projectId: string) {
    try {
        const response = await api.get(`/projects/${projectId}/task_requests`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

// export async function getRequest(id) {
//     const response = await api.get(`/api/requests/${id}`);
//     return response.data;
// }

export async function createProject(data: Project) {
    try {
        const response = await api.post('/projects', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function createTask(data: Task) {
    try {
        const response = await api.post('/projects/1/tasks', data);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function archiveProject(projectId: string) {
    try {
        const response = await api.post(`/projects/${projectId}/archive_project/`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export async function leaveProject(projectId: string) {
    try {
        const response = await api.post(`/projects/${projectId}/leave_project/`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
