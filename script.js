// script.js 文件 - 最终整合版 (解决所有逻辑和结构问题)

// **********************************************
// 1. FUNCTION DEFINITION (函数定义): 可重复使用的列表渲染 Logic
// **********************************************

// 定义一个 Function，命名为 renderList (渲染列表)
// 接收 dataArray (数据) 和 targetId (目标容器 ID) 作为 Parameter (参数)
function renderList(dataArray, targetId) {
    
    // Find (查找): 找到 HTML 中的目标 Element (元素)
    const listContainer = document.querySelector(`#${targetId}`); 

    // Safety Check (安全检查): 如果找不到 Element，则停止运行
    if (!listContainer) {
        console.error(`Error: Cannot find list container with ID: ${targetId}`);
        return;
    }

    // Prepare (准备): 清空容器内容，准备填充
    listContainer.innerHTML = '';
    
    // Loop (循环): 遍历 Array 中的每一个 Business Object
    dataArray.forEach(business => {
        
        // Build (构建): 使用 Template Literal 创建 HTML 字符串
        const htmlItem = `
            <li>
                ${business.name}，
                地址：<a href="${business.mapsLink}">${business.address}</a>，
                电话：<a href="tel:+60${business.phone}">${business.phone}</a>
            </li>
        `; 
        
        // Insert (插入): 将生成的 HTML 追加到容器中
        listContainer.innerHTML += htmlItem;
    });
}


// **********************************************
// 2. CORE LOGIC (核心逻辑): 使用 Fetch API 读取 data.json 文件
// **********************************************

// window.onload: 确保网页和 DOM 完全加载后再运行 JS
window.onload = function() {
    
    // Fetch API: 这是 JS 发送网络请求的工具，读取本地 data.json
    fetch('data.json')
        .then(response => {
            // 检查请求是否成功 (Status 200)
            if (!response.ok) {
                // 如果是，则抛出错误，进入后面的 .catch()
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // 将接收到的响应文本解析为 JSON Object
            return response.json();
        }) 
        .then(data => {
            // 成功拿到数据 (data)
            console.log("成功读取本地数据文件。开始渲染所有列表...");
            
            // ============================================
            // EXECUTION (执行): 调用 Function，渲染所有分类
            // ============================================
            
            // 行业分类 (Industry Categories)
            renderList(data.foodBusinesses, 'food-list'); 
            renderList(data.hardwareBusinesses, 'hardware-list');
            
            // 紧急必须单位 (Emergency Services)
            renderList(data.emergencyBusinesses, 'emergency-list'); // 医院
            renderList(data.policeBusinesses, 'police-list');       // 警察局
            renderList(data.fireBusinesses, 'fire-list');           // 消防局
            
            // 政府机构 (Government)
            renderList(data.governmentBusinesses, 'government-list');
            
        })
        .catch(error => {
            console.error('无法读取本地 JSON 文件:', error);
            // 给用户一个明确的指示
            alert("错误：请通过 Live Server 或部署到服务器环境运行，否则无法读取本地数据。");
        });
};