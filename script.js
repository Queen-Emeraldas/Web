// Simple search and filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-projects');
    const filterSelect = document.getElementById('filter-projects');
    const projectCards = document.querySelectorAll('.project-card');
    
    function filterProjects() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesFilter = filterValue === 'all' || category === filterValue;
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', filterProjects);
    filterSelect.addEventListener('change', filterProjects);
});