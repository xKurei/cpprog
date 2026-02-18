const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');
const togglePassword = document.getElementById('togglePassword');

// Input validation: border color + focus effect
[emailInput, passwordInput].forEach(input => {
    input.addEventListener('keyup', function() {
        this.style.borderColor = this.value.trim() !== '' ? 'green' : 'red';
    });

    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 5px rgba(0, 123, 255, 0.5)';
    });

    input.addEventListener('blur', function() {
        this.style.boxShadow = '';
        if (this.name === 'email' && this.value && !this.value.includes('@')) {
            alert('Please enter a valid email.');
        }
    });
});

// Form submit check
submitBtn.addEventListener('click', function(event) {
    if (!emailInput.value.trim() || !passwordInput.value.trim() || !emailInput.value.includes('@')) {
        event.preventDefault();
        alert('Please fill in all fields with a valid email.');
    }
});

// Toggle password visibility
togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Change icon for visual feedback
    togglePassword.textContent = type === 'password' ? '👁' : '🙈';
});
