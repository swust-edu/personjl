document.addEventListener('DOMContentLoaded', () => {
    // 1. 核心元素 & 固定参数
    const API_PREFIX = "https://api.xingzhige.com/API/douyin/?url=";
    const parseBtn = document.getElementById('parseBtn');
    const douyinUrlInput = document.getElementById('douyinUrl');
    const resultArea = document.getElementById('resultArea');
    const previewGrid = document.getElementById('previewGrid');



    function extractDouyinUrl(text) {
        // 匹配规则：以https开头 + 包含douyin.com/dy/ 或 v.douyin.com/ + 直到/结束
        const reg = /https?:\/\/(?:v\.douyin\.com|www\.douyin\.com\/dy)\/[a-zA-Z0-9]+\/?/i;
        const match = text.match(reg);
        return match ? match[0].trim() : null;
    }
    // 2. 解析并渲染图片（仅保留核心逻辑）
    parseBtn.addEventListener('click', () => {
        const mixedText = douyinUrlInput.value.trim();
        if (!mixedText) {
            alert('请输入抖音链接');
            return;
        }

        // 按钮状态
        parseBtn.disabled = true;
        parseBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 解析中...';
        // 显示结果区 + 加载提示
        resultArea.style.display = 'block';
        previewGrid.innerHTML = '<p style="color:#999;text-align:center;padding:20px 0;">正在解析...</p>';

        // 拼接链接（核心）




        // 2. 提取纯抖音链接
        const pureDouyinUrl = extractDouyinUrl(mixedText);
        if (!pureDouyinUrl) {
            alert('未从文本中提取到有效的抖音链接！');
            return;
        }


        const fullApiUrl = API_PREFIX + encodeURIComponent(pureDouyinUrl);
        console.log(fullApiUrl)
        // 发起请求（不做代理，仅基础逻辑）
        fetch(fullApiUrl)
            .then(res => res.json())

            .then(data => {
                previewGrid.innerHTML = '';

                // 1. 从接口返回中提取 images 数组（适配当前数据结构）
                // 数据路径：data → item → images
                const imageList = data?.data.item?.images || [];

                if (imageList.length === 0) {
                    previewGrid.innerHTML = '<p style="color:#999;text-align:center;">未解析到图片</p>';
                    return;
                }

                // 2. 渲染图片到 previewGrid
                imageList.forEach((imgUrl, index) => {
                    const imgItem = document.createElement('div');
                    imgItem.className = 'preview-item';

                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = `抖音图片${index + 1}`;
                    img.loading = 'lazy';
                    // 加载失败兜底
                    img.onerror = () => {
                        img.src = 'https://picsum.photos/200/200?random=' + index;
                    };

                    imgItem.appendChild(img);
                    previewGrid.appendChild(imgItem);
                });


            })
            .catch(err => {
                previewGrid.innerHTML = `<p style="color:#ff4444;text-align:center;">解析失败：${err.message}</p>`;
                console.log('调试信息：', err); // 仅用于看报错
            })
            .finally(() => {
                parseBtn.disabled = false;
                parseBtn.innerHTML = '<i class="fas fa-magic"></i> 开始解析';
            });
    });

    // 初始化隐藏结果区
    resultArea.style.display = 'none';
});
