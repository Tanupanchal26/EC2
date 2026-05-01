const BASE_URL = 'http://localhost:3000/api';

async function fetchInstances() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Fetching instances...';
    messageDiv.className = 'message';
    messageDiv.style.display = 'block';

    try {
        const response = await fetch(`${BASE_URL}/instances`);
        const result = await response.json();

        if (result.success) {
            renderInstances(result.instances);
            messageDiv.style.display = 'none';
        } else {
            messageDiv.textContent = result.message;
            messageDiv.className = 'message error';
        }
    } catch (error) {
        messageDiv.textContent = 'Error: Could not connect to server';
        messageDiv.className = 'message error';
    }
}

function renderInstances(instances) {
    const tbody = document.getElementById('instanceBody');
    tbody.innerHTML = '';

    instances.forEach(inst => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${inst.name}</td>
            <td>${inst.instanceId}</td>
            <td>${inst.instanceType}</td>
            <td>${inst.state}</td>
            <td>${inst.publicIp}</td>
            <td>${inst.privateIp}</td>
            <td>
                <button onclick="startInstance('${inst.instanceId}')">Start</button>
                <button onclick="stopInstance('${inst.instanceId}')">Stop</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById('instanceTable').style.display = 'table';
}

async function startInstance(instanceId) {
    await instanceAction('start', instanceId);
}

async function stopInstance(instanceId) {
    await instanceAction('stop', instanceId);
}

async function instanceAction(action, instanceId) {
    const messageDiv = document.getElementById('message');
    messageDiv.style.display = 'block';
    messageDiv.className = 'message';
    messageDiv.textContent = `Sending ${action} command...`;

    try {
        const response = await fetch(`${BASE_URL}/instances/${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instanceId })
        });
        const result = await response.json();
        messageDiv.textContent = result.message;
        messageDiv.className = result.success ? 'message success' : 'message error';
        if (result.success) fetchInstances();
    } catch (error) {
        messageDiv.textContent = 'Error: Could not connect to server';
        messageDiv.className = 'message error';
    }
}
