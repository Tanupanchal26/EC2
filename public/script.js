document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Submitting...';
    messageDiv.className = 'message';
    messageDiv.style.display = 'block';
    
    try {
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            messageDiv.textContent = result.message;
            messageDiv.className = 'message success';
            document.getElementById('registrationForm').reset();
        } else {
            messageDiv.textContent = result.message;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        messageDiv.textContent = 'Error: Could not connect to server';
        messageDiv.className = 'message error';
    }
});
