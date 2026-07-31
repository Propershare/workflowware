/** Shared classic platform shell helpers */
(function () {
  const page = document.body.dataset.page || '';
  document.querySelectorAll('.pc-nav a[data-nav]').forEach((a) => {
    if (a.dataset.nav === page) a.classList.add('active');
  });
})();
