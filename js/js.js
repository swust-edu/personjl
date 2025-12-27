const imageUrlMap = {
 sw_part1:"https://free.picui.cn/free/2025/12/27/694f9c409393b.jpg",
 sw_part2:"https://free.picui.cn/free/2025/12/27/694f9c407d75f.jpg",
 sw_part3:"https://free.picui.cn/free/2025/12/27/694f9c40c53ad.jpg",
 sw_part4:"https://free.picui.cn/free/2025/12/27/694f9c40933a5.jpg",
 sw_part5:"https://free.picui.cn/free/2025/12/27/694f9c40bd55f.jpg",
 sw_part6:"https://free.picui.cn/free/2025/12/27/694f9c44d155c.jpg",
 sw_part7:"https://free.picui.cn/free/2025/12/27/694f9c448c67b.jpg",
};

// ========== 步骤2：作品数据（仅关联URL标识，不直接写URL） ==========
const galleryData = [
  
  {
    imgKey: "sw_part1",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  },
  {
    imgKey: "sw_part2",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  },
  {
    imgKey: "sw_part3",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  },
  {
    imgKey: "sw_part4",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  },
  {
    imgKey: "sw_part5",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  },
  {
    imgKey: "sw_part6",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  },
  {
    imgKey: "sw_part7",
    title: "零件三维建模",
    tag: "SolidWorks",
    desc: "复杂轴类零件建模，含倒角/键槽/螺纹，符合工程制图标准。",
    category: "solidworks"
  }
 
];

const galleryWrap = document.querySelector('.gallery');
  // 循环生成每个gallery-item
galleryData.forEach(item => {
  // 通过imgKey从URL表中获取对应的链接（兜底：如果标识不存在，显示默认图）
  const imgUrl = imageUrlMap[item.imgKey]
  
  const itemHtml = `
    <div class="gallery-item" data-category="${item.category}">
      <div class="item-img" data-img="${imgUrl}">
        <img src="${imgUrl}" alt="${item.title}">
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

