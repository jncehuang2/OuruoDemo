/**
 * EUPRO 欧诺包装 - 图片资源清单
 * 
 * 由于设计稿原图未提供，以下使用占位图方案：
 * - 方案1: 使用 picsum.photos 随机图片（已预配置URL）
 * - 方案2: 使用本地SVG占位图（已创建下方）
 * - 方案3: 使用AI生成图（可后续替换）
 * 
 * 所有图片可按 1:1 无损替换，保持相同命名即可
 */

// 图片列表说明：
const images = {
    // Hero背景图 - 商务场景，笔记本电脑显示"80%"绿色数据
    'hero-bg.jpg': {
        dimensions: '1920x800',
        description: '深色调商务场景，人物使用笔记本电脑，屏幕显示绿色80%数据图表，专业氛围',
        placeholder: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80',
        style: '深色渐变遮罩，科技感'
    },
    
    // 服务内容图1 - 黑色包装盒产品图
    'service-1.jpg': {
        dimensions: '800x600',
        description: '高端黑色包装盒，内部白色衬垫，展示包装品质',
        placeholder: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
        style: '极简风格，柔和阴影'
    },
    
    // 差异化竞争力区产品图 - 白色包装盒
    'competitiveness.jpg': {
        dimensions: '800x600',
        description: '白色极简包装盒，干净背景，展示包装细节',
        placeholder: 'https://images.unsplash.com/photo-1632213702844-1e0606d1e55a?w=800&q=80',
        style: '极简白色风格'
    },
    
    // CTA区立体包装效果图
    'cta-packages.png': {
        dimensions: '800x600',
        description: '多个白色包装盒立体堆叠效果图，带阴影',
        placeholder: 'https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?w=800&q=80',
        style: '3D渲染风格，白色盒子'
    },
    
    // CTA背景线稿图
    'package-line-art.png': {
        dimensions: '400x400',
        description: '包装盒轮廓线稿，半透明装饰背景',
        placeholder: 'none', // 使用CSS绘制的线稿
        style: '线条艺术，低透明度'
    }
};

// SVG 占位图方案 - 可直接内联使用
const svgPlaceholders = {
    heroBg: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 800'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23222'/%3E%3Cstop offset='100%25' style='stop-color:%23444'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g1)' width='1920' height='800'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%23fff' text-anchor='middle' font-family='sans-serif'%3EHERO Background Image%3C/text%3E%3C/svg%3E`,
    
    service1: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23f5f5f5' width='800' height='600'/%3E%3Crect x='250' y='150' width='300' height='300' rx='12' fill='%23333'/%3E%3Crect x='270' y='170' width='260' height='260' rx='8' fill='%23fff'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23999' text-anchor='middle'%3E产品包装图%3C/text%3E%3C/svg%3E`,
    
    competitiveness: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%23fafafa' width='800' height='600'/%3E%3Crect x='250' y='150' width='300' height='300' rx='16' fill='%23fff' stroke='%23e0e0e0' stroke-width='2'/%3E%3Ctext x='50%25' y='50%25' font-size='24' fill='%23999' text-anchor='middle'%3E包装盒展示%3C/text%3E%3C/svg%3E`,
    
    ctaPackages: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='none' width='800' height='600'/%3E%3Crect x='250' y='200' width='200' height='200' rx='12' fill='%23fff' filter='drop-shadow(0 20px 40px rgba(0,0,0,0.3))'/%3E%3Crect x='300' y='150' width='200' height='200' rx='12' fill='%23f8f8f8' filter='drop-shadow(0 20px 40px rgba(0,0,0,0.3))'/%3E%3C/svg%3E`
};
