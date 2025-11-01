document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const headerNav = document.getElementById('headerNav');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        headerNav.classList.toggle('active');
    });
});

