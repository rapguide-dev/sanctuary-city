let lastProcessTime = 0;

function checkJoins() {
    fetch('last_join.json?t=' + Date.now())
    .then(res => res.json())
    .then(data => {
        if(data.time > lastProcessTime) {
            if(lastProcessTime !== 0) {
                showNotify(data.name, data.ip);
            }
            lastProcessTime = data.time
        }
    });
}

function showNotify(user, ip) {
    const el = document.getElementById('join-notify');
    el.innerHTML = `<strong>${user}</strong> joined!<br><small>IP: ${ip}</small>`;
    el.classList.add('active');

    setTimeout(() => el.classList.remove('active'), 5000);
}

setInterval(checkJoins, 1000);