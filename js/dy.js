// 等待DOM完全加载后执行（兼容defer的兜底）
document.addEventListener('DOMContentLoaded', () => {
  // 1. 定义固定参数和核心元素（确保能获取到DOM）
  const API_PREFIX = "https://api.xingzhige.com/API/douyin/?url=";
  const parseBtn = document.getElementById('parseBtn');
  const douyinUrlInput = document.getElementById('douyinUrl');
  const resultArea = document.getElementById('resultArea');
  const previewGrid = document.getElementById('previewGrid');
  const downloadAllBtn = document.getElementById('downloadAllBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');

  // 存储解析后的图片列表（供下载/复制使用）
  let imageList = [];

  // 2. 核心：加载图片到previewGrid
  function loadImagesFromApi(apiUrl) {
    // 清空原有内容，显示加载状态
    previewGrid.innerHTML = '<p style="color:#999;text-align:center;padding:20px 0;">正在解析图片...</p>';
    // 显示结果区域
    resultArea.style.display = 'block';

    // 解决跨域：使用公共代理（仅测试用，生产需自己搭代理）
    const proxyApiUrl = `https://cors-anywhere.herokuapp.com/${apiUrl}`;

    fetch(proxyApiUrl, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest' // 兼容部分接口的跨域校验
      },
      timeout: 15000
    })
      .then(response => {
        if (!response.ok) throw new Error(`接口请求失败 [${response.status}]`);
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('接口返回非JSON格式');
        }
        return response.json();
      })
      .then(data => {
        // 清空加载提示
        previewGrid.innerHTML = '';
        // 适配接口返回格式（抖音解析接口常见字段）
        imageList = data.data?.img_list || data.img_list || data.images || [];

        if (imageList.length === 0) {
          previewGrid.innerHTML = '<p style="color:#999;text-align:center;padding:20px 0;">未解析到图片，请检查链接</p>';
          return;
        }

        // 渲染图片到网格
        imageList.forEach((imgUrl, index) => {
          const imgItem = document.createElement('div');
          imgItem.className = 'preview-item'; // 确保dy.css中有这个类的样式

          const img = document.createElement('img');
          img.src = imgUrl;
          img.alt = `抖音图片${index + 1}`;
          img.loading = 'lazy';
          // 图片加载失败兜底
          img.onerror = () => {
            img.src = 'https://picsum.photos/200/200?random=' + index;
          };

          imgItem.appendChild(img);
          previewGrid.appendChild(imgItem);
        });
      })
      .catch(error => {
        console.error('解析错误：', error);
        previewGrid.innerHTML = `<p style="color:#ff4444;text-align:center;padding:20px 0;">解析失败：${error.message}</p>`;
      })
      .finally(() => {
        // 恢复按钮状态
        parseBtn.disabled = false;
        parseBtn.innerHTML = '<i class="fas fa-magic"></i> 开始解析';
      });
  }

  // 3. 解析按钮点击事件
  parseBtn.addEventListener('click', () => {
    const userUrl = douyinUrlInput.value.trim();

    // 输入校验
    if (!userUrl) {
      alert('请输入抖音链接！');
      return;
    }
    if (!userUrl.includes('douyin') && !userUrl.includes('dy')) {
      alert('请输入有效的抖音分享链接（如：https://v.douyin.com/xxxx/）');
      return;
    }

    // 禁用按钮，防止重复点击
    parseBtn.disabled = true;
    parseBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 解析中...';

    // 拼接完整接口链接
    const fullApiUrl = API_PREFIX + encodeURIComponent(userUrl);
    // 执行解析
    loadImagesFromApi(fullApiUrl);
  });

  // 4. 下载全部图片
  downloadAllBtn.addEventListener('click', () => {
    if (imageList.length === 0) {
      alert('暂无图片可下载！');
      return;
    }

    imageList.forEach((imgUrl, index) => {
      const a = document.createElement('a');
      a.href = imgUrl;
      a.download = `抖音图片_${index + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
    alert(`已开始下载${imageList.length}张图片！`);
  });

  // 5. 复制图片链接
  copyLinkBtn.addEventListener('click', async () => {
    if (imageList.length === 0) {
      alert('暂无链接可复制！');
      return;
    }

    try {
      const linkText = imageList.join('\n');
      await navigator.clipboard.writeText(linkText);
      alert('图片链接已复制到剪贴板！');
    } catch (err) {
      // 降级方案：手动创建文本框复制
      const textArea = document.createElement('textarea');
      textArea.value = imageList.join('\n');
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('链接已复制（兼容模式）！');
    }
  });

  // 初始化：隐藏结果区域
  resultArea.style.display = 'none';
});