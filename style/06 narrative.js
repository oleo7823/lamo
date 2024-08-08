document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('#toc a[data-file]');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            const file = this.getAttribute('data-file');
            loadContent(file);
        });
    });

    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('text-container').innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading content:', error);
            });
    }
});