/* ─────────────────────────────────────────
   SAVEUR — Menu Page JavaScript
   Handles: category filter tabs
   ───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  const filterBtns  = document.querySelectorAll('.filter-btn');
  const categories  = document.querySelectorAll('.menu-category');

  const idMap = {
    'starters':  'cat-starters',
    'mains':     'cat-mains',
    'breads':    'cat-breads',
    'desserts':  'cat-desserts',
    'beverages': 'cat-beverages',
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide categories
      categories.forEach(cat => {
        if (filter === 'all') {
          cat.classList.remove('hidden');
        } else {
          const targetId = idMap[filter];
          if (cat.id === targetId) {
            cat.classList.remove('hidden');
          } else {
            cat.classList.add('hidden');
          }
        }
      });

      // Scroll to first visible category
      const firstVisible = document.querySelector('.menu-category:not(.hidden)');
      if (firstVisible) {
        const offset = 140; // nav + filter bar
        const top = firstVisible.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Check if URL has a hash to auto-filter
  const hash = window.location.hash.slice(1);
  if (hash && idMap[hash]) {
    const matchBtn = document.querySelector(`[data-filter="${hash}"]`);
    if (matchBtn) matchBtn.click();
  }

});
