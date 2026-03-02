// Email Validation
const emailInput = document.getElementById('email-input');
const emailIcon = document.getElementById('email-icon');
const emailMessage = document.getElementById('email-message');

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

let emailDebounce;
emailInput.addEventListener('keyup', () => {
    clearTimeout(emailDebounce);
    emailDebounce = setTimeout(() => {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailIcon.classList.remove('show', 'valid', 'invalid');
            emailMessage.textContent = '';
            emailMessage.className = 'validation-message';
            return;
        }

        const isValid = validateEmail(email);
        
        if (isValid) {
            emailIcon.textContent = '✓';
            emailIcon.classList.add('show', 'valid');
            emailMessage.textContent = 'Valid email format';
            emailMessage.className = 'validation-message valid';
        } else {
            emailIcon.textContent = '✕';
            emailIcon.classList.add('show', 'invalid');
            emailMessage.textContent = 'Please enter a valid email address (e.g., user@example.com)';
            emailMessage.className = 'validation-message invalid';
        }
    }, 300);
});

// Password Strength
const passwordInput = document.getElementById('password-input');
const passwordToggle = document.getElementById('password-toggle');
const strengthText = document.getElementById('strength-text');
const segments = [
    document.getElementById('seg-1'),
    document.getElementById('seg-2'),
    document.getElementById('seg-3'),
    document.getElementById('seg-4')
];

passwordToggle.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    passwordToggle.textContent = type === 'password' ? '👁' : '🙈';
});

function calculateStrength(password) {
    let score = 0;
    
    if (password.length > 0) score += 1;
    if (password.length >= 4) score += 1;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 2;
    
    return Math.min(score, 10);
}

function getStrengthInfo(score) {
    if (score <= 2) return { text: 'Very Weak', class: 'weak', segments: 1 };
    if (score <= 4) return { text: 'Weak', class: 'weak', segments: 1 };
    if (score <= 6) return { text: 'Medium', class: 'medium', segments: 2 };
    if (score <= 8) return { text: 'Strong', class: 'strong', segments: 3 };
    return { text: 'Very Strong', class: 'very-strong', segments: 4 };
}

let passwordDebounce;
passwordInput.addEventListener('keyup', () => {
    clearTimeout(passwordDebounce);
    passwordDebounce = setTimeout(() => {
        const password = passwordInput.value;
        
        if (password === '') {
            segments.forEach(seg => {
                seg.classList.remove('active', 'weak', 'medium', 'strong', 'very-strong');
            });
            strengthText.textContent = '';
            return;
        }

        const score = calculateStrength(password);
        const info = getStrengthInfo(score);
        
        segments.forEach((seg, index) => {
            seg.classList.remove('active', 'weak', 'medium', 'strong', 'very-strong');
            if (index < info.segments) {
                seg.classList.add('active', info.class);
            }
        });
        
        strengthText.textContent = info.text;
        strengthText.style.color = info.class === 'weak' ? '#ff4757' : 
                                   info.class === 'medium' ? '#ffaa00' : 
                                   info.class === 'strong' ? '#00ff88' : '#00d4ff';
    }, 300);
});

// Cookies & Session Storage
const output = document.getElementById('output');
const readCookiesBtn = document.getElementById('read-cookies');
const readSessionBtn = document.getElementById('read-session');
const setDemoDataBtn = document.getElementById('set-demo-data');
const clearOutputBtn = document.getElementById('clear-output');

function formatOutput(data) {
    if (!data || Object.keys(data).length === 0) {
        return 'No data found';
    }
    return JSON.stringify(data, null, 2);
}

function getCookies() {
    const cookies = {};
    if (document.cookie) {
        document.cookie.split(';').forEach(cookie => {
            const [name, value] = cookie.trim().split('=');
            if (name) {
                cookies[name] = decodeURIComponent(value);
            }
        });
    }
    return cookies;
}

readCookiesBtn.addEventListener('click', () => {
    const cookies = getCookies();
    output.textContent = formatOutput(cookies);
});

readSessionBtn.addEventListener('click', () => {
    const sessionData = {};
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        sessionData[key] = sessionStorage.getItem(key);
    }
    output.textContent = formatOutput(sessionData);
});

setDemoDataBtn.addEventListener('click', () => {
    // Set demo cookies
    document.cookie = 'username=JohnDoe; path=/';
    document.cookie = 'userEmail=john@example.com; path=/';
    document.cookie = 'theme=dark; path=/';
    
    // Set demo session storage
    sessionStorage.setItem('sessionToken', 'abc123xyz789');
    sessionStorage.setItem('userId', '12345');
    sessionStorage.setItem('lastActivity', new Date().toISOString());
    
    output.textContent = 'Demo data has been set!\n\nClick "Read Cookies" or "Read Session Storage" to view the data.';
});

clearOutputBtn.addEventListener('click', () => {
    output.textContent = '';
});
