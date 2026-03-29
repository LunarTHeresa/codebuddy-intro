// CodeBuddy Code Interactive Functions

toggleChapter = function(element) {
    element.classList.toggle('expanded');
};

showDetail = function(cardElement, detailId) {
    event.stopPropagation(); // Prevent chapter toggle
    const detailPanel = document.getElementById(detailId);
    
    // Close all other detail panels in the same chapter
    const allPanels = cardElement.parentElement.querySelectorAll('.detail-panel');
    allPanels.forEach(panel => {
        if (panel !== detailPanel) {
            panel.classList.remove('show');
        }
    });
    
    // Toggle current panel
    detailPanel.classList.toggle('show');
};

showToolDemo = function(toolType) {
    event.stopPropagation();
    const demoArea = document.getElementById('tool-demo-area');
    
    let content = '';
    if (toolType === 'read') {
        content = `
            <div class="tool-demo-content">
                <h4>📖 Read工具完整演示</h4>
                <p><strong>功能：</strong>读取文件内容，支持智能分页</p>
                <pre><code>// 读取整个文件
Read(file_path="/src/app.js")

// 只读前50行
Read(file_path="/src/app.js", limit=50)

// 从第10行开始读20行
Read(file_path="/src/app.js", offset=10, limit=20)</code></pre>
                <p><strong>使用场景：</strong></p>
                <ul>
                    <li>代码审查和理解现有代码</li>
                    <li>读取配置文件</li>
                    <li>分析日志文件</li>
                </ul>
            </div>
        `;
    } else if (toolType === 'bash') {
        content = `
            <div class="tool-demo-content">
                <h4>💻 Bash工具完整演示</h4>
                <p><strong>功能：</strong>安全的Shell命令执行</p>
                <pre><code>// 基本命令
Bash(command="npm install express", description="安装Express框架")

// Git操作
Bash(command="git status", description="查看Git状态")

// 后台运行
Bash(command="npm run build", description="构建项目", run_in_background=true)

// 带超时设置
Bash(command="sleep 5 && echo done", description="延时任务", timeout=10000)</code></pre>
                <p><strong>安全特性：</strong></p>
                <ul>
                    <li>路径安全检查</li>
                    <li>危险命令警告</li>
                    <li>资源使用限制</li>
                </ul>
            </div>
        `;
    }
    
    demoArea.innerHTML = content;
};

showWorkflowDetail = function(stepId) {
    event.stopPropagation();
    const detail = document.getElementById(stepId);
    detail.classList.toggle('show');
};

// Initialize the website
window.onload = function() {
    // Auto-expand first chapter
    const firstChapter = document.querySelector('.chapter');
    if (firstChapter) {
        firstChapter.classList.add('expanded');
    }
    
    console.log('CodeBuddy Code 交互式手册已加载');
};