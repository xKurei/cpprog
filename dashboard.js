const cards = document.querySelectorAll('.card');
const logoutLink = document.getElementById('logoutLink');
const announcementContainer = document.getElementById('announcementContainer');

// ----------------------
// Buttons click + hover
// ----------------------
cards.forEach(card => {
    card.addEventListener('click', function(event) {
        event.preventDefault(); 
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 300);

        // Redirect based on card ID
        switch(this.id) {
            case 'announcementsCard':
                window.location.href = '/student-connect/announcements.html';
                break;
            case 'eventsCard':
                window.location.href = '/student-connect/events.html';
                break;
            case 'resourcesCard':
                window.location.href = '/student-connect/resources.html';
                break;
            case 'trustedSourcesCard':
                window.location.href = '/student-connect/trusted-sources.html';
                break;
        }
    });

    // Hover effects
    card.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.08) rotate(1deg)';
    });

    card.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// ----------------------
// Logout
// ----------------------
logoutLink.addEventListener('click', function(event) {
    event.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
});

// ----------------------
// Dynamic announcements
// ----------------------
function loadAnnouncements() {
    fetch('php/get_announcements.php')
        .then(response => response.json())
        .then(announcements => {
            announcementContainer.innerHTML = ''; // clear previous

            if (announcements.length === 0) {
                announcementContainer.innerHTML = '<p class="no-announcement">No announcements available.</p>';
                return;
            }

            announcements.forEach(ann => {
                const card = document.createElement('div');
                card.className = 'announcement-card';
                card.innerHTML = `
                    <h3 class="announcement-title">${ann.title}</h3>
                    <p class="announcement-message">${ann.message}</p>
                    <p class="announcement-date">${ann.date_posted}</p>
                `;
                announcementContainer.appendChild(card);
            });
        })
        .catch(error => {
            announcementContainer.innerHTML = '<p class="no-announcement">Error loading announcements.</p>';
            console.error('Error fetching announcements:', error);
        });
}

// Load announcements when DOM is ready
document.addEventListener('DOMContentLoaded', loadAnnouncements);
