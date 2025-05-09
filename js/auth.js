// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
    const authToken = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    
    // Redirect to dashboard if already logged in
    if (authToken && window.location.pathname.includes('login.html')) {
        window.location.href = 'dashboard.html';
    }
    
    // Redirect to login if not authenticated
    if (!authToken && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Handle logout
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }
    
    // Display user info on dashboard
    if (userName) {
        document.getElementById('user-name').textContent = userName;
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    try {
        // In a real app, this would be an API call to your backend
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password, role })
        // });
        // const data = await response.json();
        
        // Mock response for demo purposes
        const data = {
            token: 'mock-auth-token',
            user: {
                id: '123',
                name: role === 'teacher' ? 'Mr. Smith' : 
                      role === 'student' ? 'John Doe' : 'Parent User',
                role: role
            }
        };
        
        // Store user data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userId', data.user.id);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } catch (error) {
        document.getElementById('login-error').textContent = 'Invalid credentials. Please try again.';
        console.error('Login error:', error);
    }
}

function handleLogout() {
    // Clear user data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    
    // Redirect to login
    window.location.href = 'login.html';
}