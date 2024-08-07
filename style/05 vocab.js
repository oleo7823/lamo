document.addEventListener('DOMContentLoaded', () => {
    // 在DOM完全加载并解析后执行此代码块，确保元素已加载到页面上

    const itemsPerPage = 10; // 每页显示的项目数
    let currentPage = 1; // 当前页码
    let vocabData = []; // 存储词汇数据的数组

    // 函数：获取词汇数据
    function fetchVocabData() {
        fetch('./data/dic.txt')
            .then(response => response.text()) // 获取文件内容并将其转换为文本
            .then(data => {
                vocabData = parseVocabData(data); // 解析词汇数据
                renderVocabTable(currentPage); // 渲染当前页的词汇表
                updateButtons(); // 更新按钮状态
            })
            .catch(error => console.error('Error fetching vocabulary data:', error)); // 捕捉并显示错误信息
    }

    // 函数：解析词汇数据
    function parseVocabData(data) {
        const lines = data.trim().split('\n'); // 按行分割数据并去掉首尾空白
        const headers = lines[0].split('\t'); // 获取标题行，并按制表符分割
        return lines.slice(1).map(line => { // 处理每一行数据
            const values = line.split('\t'); // 按制表符分割每行的数据
            return headers.reduce((obj, header, index) => { // 将每行数据转换为对象
                obj[header] = values[index]; // 将标题作为键，数据作为值
                return obj; // 返回对象
            }, {});
        });
    }

    // 函数：渲染词汇表
    function renderVocabTable(page) {
        const container = document.getElementById('vocab-container'); // 获取容器元素
        container.innerHTML = ''; // 清除之前的内容

        const start = (page - 1) * itemsPerPage; // 计算起始索引
        const end = start + itemsPerPage; // 计算结束索引
        const pagedData = vocabData.slice(start, end); // 获取当前页的数据

        const table = document.createElement('table'); // 创建表格元素
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Wordforms</th>
                    <th>Gloss</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                ${pagedData.map(item => `
                    <tr>
                        <td>${item.Wordforms}</td>
                        <td>${item.Gloss}</td>
                        <td>${item.Category}</td>
                    </tr>
                `).join('')}
            </tbody>
        `; // 填充表格的头和行数据
        container.appendChild(table); // 将表格添加到容器中
    }

    // 函数：更新按钮状态
    function updateButtons() {
        document.getElementById('prev-btn').disabled = currentPage === 1; // 禁用“上一页”按钮，如果当前页是第一页
        document.getElementById('next-btn').disabled = currentPage * itemsPerPage >= vocabData.length; // 禁用“下一页”按钮，如果当前页是最后一页
    }

    // 事件监听器：上一页按钮
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) { // 如果当前页码大于1
            currentPage--; // 页码减1
            renderVocabTable(currentPage); // 渲染新的当前页的词汇表
            updateButtons(); // 更新按钮状态
        }
    });

    // 事件监听器：下一页按钮
    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage * itemsPerPage < vocabData.length) { // 如果当前页码小于总页数
            currentPage++; // 页码加1
            renderVocabTable(currentPage); // 渲染新的当前页的词汇表
            updateButtons(); // 更新按钮状态
        }
    });

    // 初次加载词汇数据
    fetchVocabData();
});
