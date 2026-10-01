# DesignPro hero – setup

```bash
npm create vite@latest designpro -- --template react-ts
cd designpro
npm i framer-motion lucide-react
npm i -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

Then copy these files over the generated ones: `index.html`, `tailwind.config.js`,
`src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/components/*`. Run `npm run dev`.
