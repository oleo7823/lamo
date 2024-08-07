document.addEventListener('DOMContentLoaded', () => {
    const vocabContainer = document.getElementById('vocab-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentPage = 1;
    const itemsPerPage = 10;
    let vocabData = [];

    const loadVocabData = async (file) => {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`Failed to load file: ${file}`);
            }
            const data = await response.text();
            parseVocabData(data);
            displayPage(1);
        } catch (error) {
            console.error('Error loading vocabulary data:', error);
        }
    };

    const parseVocabData = (data) => {
        const lines = data.trim().split('\n');
        const headers = lines[0].split(',');
        vocabData = lines.slice(1).map(line => {
            const values = line.split(',');
            let obj = {};
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
            });
            return obj;
        });
    };

    const displayPage = (page) => {
        vocabContainer.innerHTML = '';
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const items = vocabData.slice(start, end);

        if (items.length === 0) {
            vocabContainer.innerHTML = '<p>No vocabulary data available.</p>';
            return;
        }

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        // Define the headers in the required order
        const headers = ['ID', '词条', '注释', 'Dobbar', 'Audio', 'English'];

        const tr = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            tr.appendChild(th);
        });
        thead.appendChild(tr);
        table.appendChild(thead);

        items.forEach(item => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                if (header === 'Audio') {
                    const audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = `./data/vocab/audio/TB_${item['ID']}.wav`;
                    td.appendChild(audio);
                } else {
                    td.textContent = item[header] || '';
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        vocabContainer.appendChild(table);

        updatePagination();
    };

    const updatePagination = () => {
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage >= Math.ceil(vocabData.length / itemsPerPage);
    };

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            displayPage(--currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(vocabData.length / itemsPerPage)) {
            displayPage(++currentPage);
        }
    });

    document.querySelectorAll('#toc a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const file = link.getAttribute('data-file');
            loadVocabData(file);
        });
    });

    // Automatically click the first Table of Contents link on page load
    const firstTocLink = document.querySelector('#toc a');
    if (firstTocLink) {
        const file = firstTocLink.getAttribute('data-file');
        if (file) {
            loadVocabData(file);
        }
    }
});
