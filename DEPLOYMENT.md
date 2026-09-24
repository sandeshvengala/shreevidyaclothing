# Deployment

## Vercel

1. Import this repository into Vercel.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. Add these variables in Project Settings for Production, Preview, and Development:

```text
VITE_SUPABASE_URL=https://xzrcywybufifjxhjxcqt.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_LYe_2DZo47wABxIWYByHkg_pQSt7494
VITE_ADMIN_ID=your-admin-id
VITE_ADMIN_PASSWORD=your-admin-password
```

4. Redeploy and open `https://your-domain.vercel.app/admin`.

## Netlify

1. Add a new site from this repository in Netlify.
2. Use `npm run build` as the build command and `dist` as the publish directory.
3. Add the same `VITE_*` variables in Site configuration > Environment variables.
4. Redeploy and open `https://your-site.netlify.app/admin`.

The repository includes the Vercel rewrite and Netlify redirect required for React Router routes such as `/admin` to work on direct navigation and refresh. Never add the Supabase secret key to frontend `VITE_*` variables.
