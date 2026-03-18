/**
 * Corporate Training Courses Loader
 * Unifies split data parts and renders the searchable table with pagination and download features.
 */

let allCourses = [];
let displayLimit = 30;
const INITIAL_LIMIT = 30;

function initCourses() {
    // Combine all parts
    const allRaw = [
        typeof coursesPart1 !== 'undefined' ? coursesPart1 : '',
        typeof coursesPart2 !== 'undefined' ? coursesPart2 : '',
        typeof coursesPart3 !== 'undefined' ? coursesPart3 : ''
    ].filter(p => p !== '').join(';');

    allCourses = allRaw.split(';').map(row => row.split('|')).filter(c => c.length >= 3);
    
    // Initial Render
    renderTable(allCourses.slice(0, displayLimit));
    
    // Setup View More Button
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            if (displayLimit < allCourses.length) {
                displayLimit = allCourses.length; // Show all
                showMoreBtn.innerText = "Show Less";
                renderTable(allCourses);
            } else {
                displayLimit = INITIAL_LIMIT;
                showMoreBtn.innerText = "Show More Courses";
                renderTable(allCourses.slice(0, displayLimit));
                // Scroll back to table top
                document.getElementById('courseTable').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Connect Search (Override the inline script if necessary, or just use the global array)
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if (val === '') {
                renderTable(allCourses.slice(0, displayLimit));
                if (showMoreBtn) showMoreBtn.style.display = 'inline-block';
            } else {
                const filtered = allCourses.filter(c => 
                    c[1].toLowerCase().includes(val) || c[0].toLowerCase().includes(val)
                );
                renderTable(filtered);
                if (showMoreBtn) showMoreBtn.style.display = 'none';
            }
        });
    }

    console.log(`Initialized ${allCourses.length} courses.`);
}

function renderTable(list) {
    const tableBody = document.getElementById('courseTableBody');
    const noResults = document.getElementById('noResults');
    const table = document.getElementById('courseTable');
    
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    if (list.length === 0) {
        if (table) table.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (table) table.style.display = 'table';
    if (noResults) noResults.style.display = 'none';

    list.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course[0]}</td>
            <td><strong>${course[1]}</strong></td>
            <td><span class="duration-badge">${course[2]}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Ensure it runs after all scripts are loaded
window.addEventListener('load', initCourses);
