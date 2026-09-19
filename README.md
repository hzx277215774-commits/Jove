# 芒 | Mang Flux — 世界档案 V1.1

在原 Next.js Pages Router 项目上增量升级，保留墨绿、古铜、衬线字体、作者原画、档案弹窗和画廊。React、TypeScript、Tailwind 与静态导出架构不变。

## 运行与验证

```sh
pnpm install
pnpm dev
pnpm build
pnpm start
# 静态预览启动后：
pnpm qa
```

静态输出目录为 `out/`，本地预览为 http://127.0.0.1:3000 。QA 使用 Playwright 和本机 Chrome，可通过 `BROWSER_PATH` 指定浏览器位置；截图和报告写入不提交的 `output/bilingual-qa/`。

## 内容维护

先阅读 `CANON.md`。只有明确确认的记录和字段可以设为 CANON；其余使用 DRAFT、UNKNOWN 或 DEPRECATED。页面通过 `readCanon`、`publicRecords` 读取，禁止补写未知世界观。

- `content/world.ts`：正式基础设定、十二芒、地区档案和关联类型。
- `content/characters.ts`：人物记录和可选详细字段。
- `content/artworks.ts`：场景、生物视觉作品及创作过程。
- `content/stories.ts`：主题、故事字段和正式章节。
- `content/canon/core.ts`：状态、来源与公开内容选择器。
- `content/canon/withdrawn.json`：仅供内部审计的停用清单，不得导入页面。
- `data/config.ts`：品牌、SEO、启动图和音乐配置。
- `data/site.ts`：导航及首页十个章节。
- `assets/manifest.ts`：作者原画路径与适配方式。

保留 `characters/characters.ts`、`gallery/artworks.ts`、`world/regions.ts` 作为原组件的数据入口，逐步迁移而不更换架构。新增作品先加入图片映射，再添加带来源和状态的内容记录；没有分类时不创建分类按钮。原画上的既有文字属于原始艺术内容，不改写原作。

## 启动页与音乐

`WorldEntryGate` 只在根入口的新会话显示。点击进入后淡出 1000ms，保存 `sessionStorage.enteredMangWorld=true`；同一会话刷新和页面跳转不重新进入，具体档案可直接访问。减少动态效果时跳过动画。

`AmbientAudioProvider` 位于 `_app.tsx` 顶层，切换路由不重建 audio。仅在用户点击进入或音乐开关时播放；`localStorage` 保存音量与播放偏好，用户关闭后不会强制恢复。刷新后即使之前播放，也等待合法点击。默认音量 0.3，上限 0.4，渐入 1500ms。

现已接入作者提供的 Adam Young《Wheels Down》，路径为 **`public/audio/mang-theme.mp3`**。更换后重新构建发布；缺少文件、播放拒绝与解码失败均可降级。详情见 `docs/AUDIO.md`。

## 地图与档案

当前已确认的是一块大陆及三个主要区域。地图保留筛选、悬停、点击档案、缩放和索引；使用不表示方位与距离的关系图。正式地图原稿和坐标未知，暂不显示旧生成底图。编号不是地名。关联城市、势力、人物、生物、场景、故事的数据结构已准备，但不填造假数据。

原有七个档案 URL 保持不变。没有角色履历、生物生态、时代背景或章节时隐藏字段；首页故事发生地显示“档案尚未公开”。没有合作、Contact 或未实现的新入口。

审计见 `docs/AUDIT-V1.1.md`，变更和作者确认事项见 `CHANGELOG-V1.1.md`。

## 首页与中英文更新

启动背景使用红衣少年海岸原画 `coast.webp`；进入后保留 V1.0 主视觉与三概念入口布局，随后连接 V1.1 正式档案。启动页和导航右侧的中／EN 按钮支持全站切换，localStorage 记忆语言，切换不打断音乐。翻译词条位于 `data/i18n/en.ts`；先确认中文 CANON，再维护英文译文。

详见 `docs/UPDATE-HOME-BILINGUAL.md`。`pnpm qa` 检查六档宽度的双语页面；`node scripts/qa-audio.cjs` 验证实际配乐；`node scripts/qa-content.cjs` 验证内容边界与导出资源。
