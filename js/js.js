// 步骤1：维护你的图片直链列表（新增/删除只改这里）
     // 核心：维护所有自定义数据（新增/修改只改这里！）
    // 每个对象对应一个gallery-item卡片，可自定义所有内容
    const galleryData = [
      {
        // 图片直链（自定义）
        imgUrl: "https://zhaohuihui.oss-cn-hangzhou.aliyuncs.com/zhaohuihui/file/1.JPG",
        // 标题（自定义）
        title: "轴类零件三维建模",
        // 标签（自定义）
        tag: "SolidWorks",
        // 介绍/描述（自定义）
        desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
        // 分类属性（可选自定义，也可固定）
        category: "solidworks"
      },
      {
        // 图片直链（自定义）
        imgUrl: "3djpg/装配体1.gif",
        // 标题（自定义）
        title: "泵体装配",
        // 标签（自定义）
        tag: "SoloidWorks",
        // 介绍/描述（自定义）
        desc: "泵体装配动画展示",
        // 分类属性（可选自定义，也可固定）
        category: "solidworks"
      },
     {
        // 图片直链（自定义）
        imgUrl: "https://zhaohuihui.oss-cn-hangzhou.aliyuncs.com/zhaohuihui/file/2.JPG",
        // 标题（自定义）
        title: "轴类零件三维建模",
        // 标签（自定义）
        tag: "SolidWorks",
        // 介绍/描述（自定义）
        desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
        // 分类属性（可选自定义，也可固定）
        category: "solidworks"
      },
      {
        // 图片直链（自定义）
        imgUrl: "https://zhaohuihui.oss-cn-hangzhou.aliyuncs.com/zhaohuihui/file/3.JPG",
        // 标题（自定义）
        title: "轴类零件三维建模",
        // 标签（自定义）
        tag: "SolidWorks",
        // 介绍/描述（自定义）
        desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
        // 分类属性（可选自定义，也可固定）
        category: "solidworks"
      },
      {
        // 图片直链（自定义）
        imgUrl: "https://zhaohuihui.oss-cn-hangzhou.aliyuncs.com/zhaohuihui/file/4.JPG",
        // 标题（自定义）
        title: "轴类零件三维建模",
        // 标签（自定义）
        tag: "UG/NX",
        // 介绍/描述（自定义）
        desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
        // 分类属性（可选自定义，也可固定）
        category: "ug"
      },
      {
        // 图片直链（自定义）
        imgUrl: "https://zhaohuihui.oss-cn-hangzhou.aliyuncs.com/zhaohuihui/file/5.JPG",
        // 标题（自定义）
        title: "轴类零件三维建模",
        // 标签（自定义）
        tag: "AutoCAD",
        // 介绍/描述（自定义）
        desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
        // 分类属性（可选自定义，也可固定）
        category: "autocad"
      },
      /*
      {
        // 图片直链（自定义）
        imgUrl: "https://zhaohuihui.oss-cn-hangzhou.aliyuncs.com/zhaohuihui/file/1.JPG",
        // 标题（自定义）
        title: "轴类零件三维建模",
        // 标签（自定义）
        tag: "SolidWorks",
        // 介绍/描述（自定义）
        desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
        // 分类属性（可选自定义，也可固定）
        category: "solidworks"
      },
      
      
      */
    ];

    // 获取总容器
    const galleryWrap = document.querySelector('.gallery');

    // 循环生成每个gallery-item（结构/属性完全保留你的原版）
    galleryData.forEach(item => {
      const itemHtml = `
        <div class="gallery-item" data-category="${item.category}">
          <div class="item-img" data-img="${item.imgUrl}">
            <img src="${item.imgUrl}" alt="${item.title}">
          </div>
          <div class="item-info">
            <div class="item-title">${item.title}</div>
            <div class="item-tag">${item.tag}</div>
            <div class="item-desc">${item.desc}</div>
          </div>
        </div>
      `;
      galleryWrap.innerHTML += itemHtml;
    });




    // 筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有active类
            filterButtons.forEach(b => b.classList.remove('active'));
            // 添加当前active类
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // 筛选作品
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 图片预览功能
    const previewModal = document.getElementById('previewModal');
    const previewImg = document.getElementById('previewImg');
    const previewContent = document.getElementById('previewContent');
    const closeBtn = document.getElementById('closeBtn');
    const itemImgs = document.querySelectorAll('.item-img');

    // 点击图片打开预览
    itemImgs.forEach(img => {
        img.addEventListener('click', () => {
            const imgSrc = img.getAttribute('data-img');
            previewImg.src = imgSrc;
            previewModal.classList.add('active');
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 关闭预览
    closeBtn.addEventListener('click', () => {
        previewModal.classList.remove('active');
        // 恢复页面滚动
        document.body.style.overflow = 'auto';
        // 重置图片位置和缩放
        previewContent.style.transform = 'translate(0,0) scale(1)';
        isDragging = false;
        startX = 0;
        startY = 0;
        currentScale = 1;
    });

    // 点击弹窗空白处关闭
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            closeBtn.click();
        }
    });

   

