# V1.1 CHANGELOG — 2026-09-18

在现有 Next.js Pages Router 项目上增量修改。保留现有配色、字体、艺术资源、导航框架、原生档案弹窗、画廊与静态导出，不增加运行时依赖。

## 1. 文件变更

|范围|主要文件|
|---|---|
|品牌、导航与配置|`data/config.ts`、`data/site.ts`、`components/UI.tsx`、`components/SiteSEO.tsx`|
|启动与全局音乐|`components/WorldEntry.tsx`、`components/AmbientAudio.tsx`、`pages/_app.tsx`、`next.config.ts`|
|正式内容与状态|`CANON.md`、`content/canon/core.ts`、`content/canon/withdrawn.json`、`content/world.ts`、`content/characters.ts`、`content/artworks.ts`、`content/stories.ts`|
|首页与档案|`pages/index.tsx`、`pages/[section].tsx`、`pages/404.tsx`、`components/ArchiveFields.tsx`|
|保留组件与数据入口|`world/WorldMap.tsx`、`world/regions.ts`、`characters/CharacterArchive.tsx`、`characters/characters.ts`、`gallery/Gallery.tsx`、`gallery/artworks.ts`|
|样式与资源|`styles/v1.1.css`、`assets/manifest.ts`、`assets/PORTFOLIO.md`、`assets/IMAGE-PROMPTS.md`；早期生成图移至非公开 `assets/deprecated/`|
|文档及检查|`README.md`、`docs/AUDIT-V1.1.md`、`docs/AUDIO.md`、`docs/QA-V1.1.md`、`scripts/qa-v11.cjs`、`scripts/qa-content.cjs`、`scripts/qa-audio.cjs`|
|维护调整|`package.json` 升至 1.1.0，新增 qa 命令；`scripts/qa.cjs` 指向新检查；停用旧 refine 迁移脚本；原图导入改为显式传入源路径，生成图优化仅指向非公开目录|

18 张作者原画文件、原始作品集、框架依赖与锁文件均保留。

## 2. 从公开网站撤下的错误内容

三大陆及青陆、苍陆、赤陆；听潮城等未经确认地名、五禁区和虚构地图坐标；始芒纪等编造年表、断流之夜和相关历史；旧 AI 序章、芒种／河图剧情和记忆代价；未经批准的人物履历、能力、关系与生物生态分类。公开开发备注与混用品牌已清除。详情仅保留在内部停用清单与 Git 历史。

## 3. 新增能力

- 全屏原画启动页、1000ms 淡出、会话记忆；具体档案直达不被拦截。
- 根级常驻音频、点击播放、循环／暂停／音量／渐入与偏好记忆，缺文件时静音降级。
- CANON 记录和字段筛选、统一 SEO、按现有资料显示档案字段。
- 正式首页十章节；一大陆三区域的可点击关系图；移动菜单键盘约束；完整原画灯箱。

## 4. 仍缺少的正式资料

三个区域名称及精确地图；场景与世界地点对应；人物身份、芒性、体质、经历和关系；生物名称、分类和生态；时代、故事发生地、主角及章节。这些字段不扩写、不默认公开。尚无正式章节，因此没有章节入口。

## 5. 背景音乐

放置在 **`public/audio/mang-theme.mp3`**，然后重新构建、发布。当前未提供音乐，控制器静音禁用，不产生缺失文件请求。配置在 `data/config.ts`：默认 0.3、上限 0.4。实际音色、音量与循环接缝仍需作者提供曲目后试听确认。

## 6. 启动页原画

使用现有 **`public/art/portfolio/valley.webp`**（山谷暮色，1906 × 700）。桌面和移动端分别调整 cover 裁切位置，只加轻微遮罩和视差；没有生成、下载或重绘图片。

## 7. 作者人工确认

请后续确认以上缺失资料、地图原稿及各图对应的档案身份。谷源、柳茹眠、雾殷谷仅沿用原稿可辨名称与图片；没有承接旧版扩写背景。若提供更高分辨率的独立生物原图，可改善小幅裁切放大后的清晰度。无需这些资料也能正常使用当前版本。

检查范围与限制详见 `docs/QA-V1.1.md`。
