# Zoey Yichen Qian — Portfolio

A bilingual, design-led portfolio for Zoey Yichen Qian. English is the default language; Chinese is available through the navigation switch.

The experience pairs a clear resume-like information flow with purposeful 3D interactions:

- A draggable ceramic-blue cat in the introduction
- A portable music player that browses selected projects
- A piano that reveals skill categories and plays notes
- A locally hosted WebGPU water study based on `jeantimex/webgpu-water`

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## One-click deployment

Double-click `发布到GitHub.command`. It validates the production build, commits the current site, and pushes `main`. GitHub Actions then deploys `dist` to [y1ch3nq.github.io](https://y1ch3nq.github.io/).

## Third-party credit

The water study is based on Evan Wallace's WebGL Water and the WebGPU port by jeantimex. See `THIRD_PARTY_NOTICES.md` and `public/water-lab/LICENSE`.
