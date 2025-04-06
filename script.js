document.addEventListener('DOMContentLoaded', function() {
    // Set up search and filter functionality
    setupSearchAndFilter();
    
    // Add subtle hover effects
    setupHoverEffects();
});

// Set up search and filter functionality
function setupSearchAndFilter() {
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
}

// Add subtle hover effects to interactive elements
function setupHoverEffects() {
    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle shadow effect on hover
            this.style.boxShadow = '0 14px 28px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Return to original shadow
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });
    
    // Add subtle effect to links
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.2s';
        });
    });
}