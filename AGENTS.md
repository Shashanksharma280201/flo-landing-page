# flo/landing-page Engineering Guidelines

This repository contains the landing page for flo, built with Next.js 16.1.6, React 19, and Tailwind CSS 4.0.

## Tech Stack Overview
- **Framework**: Next.js 16.1.6 (App Router)
- **Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.0
- **Content**: MongoDB (Atlas) via Mongoose, HTML content
- **UI Components**: Radix UI Primitives, Lucide Icons
- **Design System**: shadcn/ui (configured in `src/components/ui`)
- **Language**: TypeScript 5+

## Development Workflow

### Key Commands
- `npm run dev`: Start the local development server.
- `npm run build`: Create a production-ready build.
- `npm run start`: Run the production build locally.
- `npm run lint`: Run ESLint to ensure code quality.
- `npx vitest run <path>`: Execute tests for a specific file.

### Directory Structure
- `src/app/`: App router routes, layouts, and page-specific components.
- `src/content/`: MDX blog posts and static content.
- `src/components/ui/`: Low-level shadcn/ui components (Buttons, Inputs, etc.).
- `src/components/blog/`: Blog-specific UI components.
- `src/components/shared/`: Reusable high-level components (Navbar, Footer).
- `src/lib/`: Utility functions and shared library configurations (e.g., `utils.ts`).
- `src/hooks/`: Custom React hooks for shared logic.
- `src/types/`: Global TypeScript definitions and shared interfaces.
- `public/`: Static assets like images, fonts, and icons.

## Code Style and Patterns

### Component Architecture
- **Server Components (Default)**: Use Server Components for data fetching and static content. They reduce the client-side bundle size and improve security by keeping sensitive logic on the server.
- **Client Components**: Only use `"use client"` when requiring interactivity (state, effects), browser APIs (localStorage, window), or third-party libraries that rely on client-side context.
- **Organization**: Keep route-specific components close to the route in the `app/` directory (e.g., `src/app/about/components/`). Move shared components to `src/components/shared/`.
- **Composition**: Prefer component composition over complex prop drilling to keep components loosely coupled and easier to test.

### React 19 Patterns
- **Action State**: Use `useActionState` for handling form submissions and managing server response states. It simplifies the management of pending states and error feedback.
- **Form Status**: Utilize `useFormStatus` to handle loading and pending states within form buttons without manually passing state through props.
- **The `use` API**: Employ the `use` hook to consume promises or contexts directly in the render logic where applicable, reducing the need for `useEffect` for data fetching.
- **Ref as Props**: Pass `ref` directly as a prop to components without the need for `forwardRef`, which is now deprecated in React 19.

### Next.js 16 Features
- **Streaming**: Wrap slow components in `<Suspense>` to allow progressive loading and improve perceived performance. This is particularly useful for components that fetch data from external APIs.
- **Metadata API**: Define static or dynamic metadata in `layout.tsx` or `page.tsx` for SEO and social sharing. This ensures proper indexing and rich social previews.
- **Optimized Images**: Always use `next/image` with proper `width`, `height`, and `alt` attributes to prevent layout shifts. Use the `priority` prop for LCP images (e.g., Hero images) to speed up initial rendering.

### TypeScript Standards
- **Interfaces**: Use `interface` for object shapes and component props to allow for easy extension.
- **Types**: Use `type` for unions, intersections, or aliases.
- **No Any**: Strictly avoid `any`. Use `unknown` or generic types if the data structure is dynamic.
- **Strict Typing**: Ensure all component props and function parameters are explicitly typed to catch errors at compile-time.

### Styling with Tailwind CSS 4.0
- **CSS-First**: Configure themes and variables in `src/app/globals.css` using the `@theme` block. This approach centralizes theme configuration and improves maintainability.
- **Utility Classes**: Combine classes using the `cn()` utility (clsx + tailwind-merge) for clean conditional styling and to avoid style conflicts.
- **Variants**: Leverage Tailwind 4.0's improved variable handling and theme-based styling for consistent UI across the application.
- **Arbitrary Values**: Minimize arbitrary values (e.g., `h-[42px]`). Prefer theme-consistent spacing and sizes defined in the theme configuration.

## Production and Quality Standards

### Accessibility (a11y)
- **Semantic HTML**: Use `<main>`, `<section>`, `<nav>`, and `<header>` appropriately to provide structure for screen readers.
- **Keyboard Navigation**: Ensure all interactive elements (buttons, links, menus) are focusable and navigable via keyboard.
- **ARIA**: Use Radix UI primitives to ensure proper ARIA attributes and roles are handled automatically, ensuring compliance with WAI-ARIA standards.
- **Contrast**: Maintain AA/AAA color contrast ratios for readability, especially for text and interactive elements.

### Performance Optimization
- **Image Optimization**: Use the `priority` prop for LCP images (e.g., Hero images) and ensure proper sizing to minimize data usage.
- **Bundle Size**: Keep client-side bundles small by offloading logic to Server Components and using dynamic imports for heavy components.
- **Layout Shift**: Reserve space for dynamic content to avoid Cumulative Layout Shift (CLS), improving the user's perceived stability of the page.
- **Caching**: Utilize Next.js 16's built-in caching and revalidation strategies (e.g., `revalidatePath`, `revalidateTag`) to ensure fresh content without sacrificing performance.

### SEO and Social
- **Metadata**: Provide unique titles and descriptions for every page to improve search engine rankings.
- **Open Graph**: Configure OG images and Twitter cards in the root `layout.tsx` to ensure high-quality social shares.
- **Sitemap**: Ensure `sitemap.ts` (if present) is up to date with new routes to help search engines crawl the site effectively.

## Error Handling
- **Route Level**: Use `error.tsx` in route segments to gracefully handle runtime exceptions and provide a user-friendly error state.
- **Server Actions**: Wrap Action logic in `try/catch` blocks. Return serializable error objects for client-side feedback instead of throwing raw errors.
- **Loading States**: Use `loading.tsx` for route-level loading indicators or `Suspense` for component-level skeletons to maintain a responsive UI.

## shadcn/ui Usage
To add new UI components, use the shadcn CLI:
```bash
npx shadcn@latest add <component-name>
```
Follow the project's established styling in `globals.css` when customizing these components. Ensure all shadcn components are placed in `src/components/ui` and are properly typed.

## Content Management (Blogs)

Blog posts are managed via the MongoDB database using the `blogposts` collection.

### Data Structure
The system expects documents matching the `BlogPost` interface, including:
- `title`, `slug`, `excerpt`, `content` (HTML string)
- `status` ('published' | 'draft' | 'archived')
- `publishedAt` (ISO date string)
- `author` object ({ name, role, avatar })
- `coverImage` (URL)

The content is rendered as sanitized HTML using Tailwind Typography for styling.

### Image Optimization
Always prefer local images in `public/blog/` over external URLs to ensure build-time stability and performance.

## Testing Strategy
- **Unit Testing**: Focus on business logic in `src/lib` and complex hooks in `src/hooks`. Use Vitest for fast, reliable unit tests.
- **Component Testing**: Use Vitest and React Testing Library for critical UI components to ensure they render correctly and handle interactions as expected.
- **Integration**: Test page flows using standard Next.js testing patterns to ensure that multiple components work together correctly.
- **Command**: Run `npx vitest run path/to/file` for targeted test execution.

<!-- NEXT-AGENTS-MD-START -->[Next.js Docs Index]|root: ./.next-docs|STOP. What you remember about Next.js is WRONG for this project. Always search docs and read before any task.|If docs missing, run this command first: npx @next/codemod agents-md --output AGENTS.md|01-app:{04-glossary.mdx}|01-app/01-getting-started:{01-installation.mdx,02-project-structure.mdx,03-layouts-and-pages.mdx,04-linking-and-navigating.mdx,05-server-and-client-components.mdx,06-cache-components.mdx,07-fetching-data.mdx,08-updating-data.mdx,09-caching-and-revalidating.mdx,10-error-handling.mdx,11-css.mdx,12-images.mdx,13-fonts.mdx,14-metadata-and-og-images.mdx,15-route-handlers.mdx,16-proxy.mdx,17-deploying.mdx,18-upgrading.mdx}|01-app/02-guides:{analytics.mdx,authentication.mdx,backend-for-frontend.mdx,caching.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,data-security.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,json-ld.mdx,lazy-loading.mdx,local-development.mdx,mcp.mdx,mdx.mdx,memory-usage.mdx,multi-tenant.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,prefetching.mdx,production-checklist.mdx,progressive-web-apps.mdx,public-static-pages.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,single-page-applications.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx,videos.mdx}|01-app/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|01-app/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|01-app/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-14.mdx,version-15.mdx,version-16.mdx}|01-app/03-api-reference:{07-edge.mdx,08-turbopack.mdx}|01-app/03-api-reference/01-directives:{use-cache-private.mdx,use-cache-remote.mdx,use-cache.mdx,use-client.mdx,use-server.mdx}|01-app/03-api-reference/02-components:{font.mdx,form.mdx,image.mdx,link.mdx,script.mdx}|01-app/03-api-reference/03-file-conventions/01-metadata:{app-icons.mdx,manifest.mdx,opengraph-image.mdx,robots.mdx,sitemap.mdx}|01-app/03-api-reference/03-file-conventions:{default.mdx,dynamic-routes.mdx,error.mdx,forbidden.mdx,instrumentation-client.mdx,instrumentation.mdx,intercepting-routes.mdx,layout.mdx,loading.mdx,mdx-components.mdx,not-found.mdx,page.mdx,parallel-routes.mdx,proxy.mdx,public-folder.mdx,route-groups.mdx,route-segment-config.mdx,route.mdx,src-folder.mdx,template.mdx,unauthorized.mdx}|01-app/03-api-reference/04-functions:{after.mdx,cacheLife.mdx,cacheTag.mdx,connection.mdx,cookies.mdx,draft-mode.mdx,fetch.mdx,forbidden.mdx,generate-image-metadata.mdx,generate-metadata.mdx,generate-sitemaps.mdx,generate-static-params.mdx,generate-viewport.mdx,headers.mdx,image-response.mdx,next-request.mdx,next-response.mdx,not-found.mdx,permanentRedirect.mdx,redirect.mdx,refresh.mdx,revalidatePath.mdx,revalidateTag.mdx,unauthorized.mdx,unstable_cache.mdx,unstable_noStore.mdx,unstable_rethrow.mdx,updateTag.mdx,use-link-status.mdx,use-params.mdx,use-pathname.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,use-selected-layout-segment.mdx,use-selected-layout-segments.mdx,userAgent.mdx}|01-app/03-api-reference/05-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,appDir.mdx,assetPrefix.mdx,authInterrupts.mdx,basePath.mdx,browserDebugInfoInTerminal.mdx,cacheComponents.mdx,cacheHandlers.mdx,cacheLife.mdx,compress.mdx,crossOrigin.mdx,cssChunking.mdx,devIndicators.mdx,distDir.mdx,env.mdx,expireTime.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,htmlLimitedBots.mdx,httpAgentOptions.mdx,images.mdx,incrementalCacheHandlerPath.mdx,inlineCss.mdx,isolatedDevBuild.mdx,logging.mdx,mdxRs.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactCompiler.mdx,reactMaxHeadersLength.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,sassOptions.mdx,serverActions.mdx,serverComponentsHmrCache.mdx,serverExternalPackages.mdx,staleTimes.mdx,staticGeneration.mdx,taint.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,turbopackFileSystemCache.mdx,typedRoutes.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|01-app/03-api-reference/05-config:{02-typescript.mdx,03-eslint.mdx}|01-app/03-api-reference/06-cli:{create-next-app.mdx,next.mdx}|02-pages/01-getting-started:{01-installation.mdx,02-project-structure.mdx,04-images.mdx,05-fonts.mdx,06-css.mdx,11-deploying.mdx}|02-pages/02-guides:{analytics.mdx,authentication.mdx,babel.mdx,ci-build-caching.mdx,content-security-policy.mdx,css-in-js.mdx,custom-server.mdx,debugging.mdx,draft-mode.mdx,environment-variables.mdx,forms.mdx,incremental-static-regeneration.mdx,instrumentation.mdx,internationalization.mdx,lazy-loading.mdx,mdx.mdx,multi-zones.mdx,open-telemetry.mdx,package-bundling.mdx,post-css.mdx,preview-mode.mdx,production-checklist.mdx,redirecting.mdx,sass.mdx,scripts.mdx,self-hosting.mdx,static-exports.mdx,tailwind-v3-css.mdx,third-party-libraries.mdx}|02-pages/02-guides/migrating:{app-router-migration.mdx,from-create-react-app.mdx,from-vite.mdx}|02-pages/02-guides/testing:{cypress.mdx,jest.mdx,playwright.mdx,vitest.mdx}|02-pages/02-guides/upgrading:{codemods.mdx,version-10.mdx,version-11.mdx,version-12.mdx,version-13.mdx,version-14.mdx,version-9.mdx}|02-pages/03-building-your-application/01-routing:{01-pages-and-layouts.mdx,02-dynamic-routes.mdx,03-linking-and-navigating.mdx,05-custom-app.mdx,06-custom-document.mdx,07-api-routes.mdx,08-custom-error.mdx}|02-pages/03-building-your-application/02-rendering:{01-server-side-rendering.mdx,02-static-site-generation.mdx,04-automatic-static-optimization.mdx,05-client-side-rendering.mdx}|02-pages/03-building-your-application/03-data-fetching:{01-get-static-props.mdx,02-get-static-paths.mdx,03-forms-and-mutations.mdx,03-get-server-side-props.mdx,05-client-side.mdx}|02-pages/03-building-your-application/06-configuring:{12-error-handling.mdx}|02-pages/04-api-reference:{06-edge.mdx,08-turbopack.mdx}|02-pages/04-api-reference/01-components:{font.mdx,form.mdx,head.mdx,image-legacy.mdx,image.mdx,link.mdx,script.mdx}|02-pages/04-api-reference/02-file-conventions:{instrumentation.mdx,proxy.mdx,public-folder.mdx,src-folder.mdx}|02-pages/04-api-reference/03-functions:{get-initial-props.mdx,get-server-side-props.mdx,get-static-paths.mdx,get-static-props.mdx,next-request.mdx,next-response.mdx,use-params.mdx,use-report-web-vitals.mdx,use-router.mdx,use-search-params.mdx,userAgent.mdx}|02-pages/04-api-reference/04-config/01-next-config-js:{adapterPath.mdx,allowedDevOrigins.mdx,assetPrefix.mdx,basePath.mdx,bundlePagesRouterDependencies.mdx,compress.mdx,crossOrigin.mdx,devIndicators.mdx,distDir.mdx,env.mdx,exportPathMap.mdx,generateBuildId.mdx,generateEtags.mdx,headers.mdx,httpAgentOptions.mdx,images.mdx,isolatedDevBuild.mdx,onDemandEntries.mdx,optimizePackageImports.mdx,output.mdx,pageExtensions.mdx,poweredByHeader.mdx,productionBrowserSourceMaps.mdx,proxyClientMaxBodySize.mdx,reactStrictMode.mdx,redirects.mdx,rewrites.mdx,serverExternalPackages.mdx,trailingSlash.mdx,transpilePackages.mdx,turbopack.mdx,typescript.mdx,urlImports.mdx,useLightningcss.mdx,viewTransition.mdx,webVitalsAttribution.mdx,webpack.mdx}|02-pages/04-api-reference/04-config:{01-typescript.mdx,02-eslint.mdx}|02-pages/04-api-reference/05-cli:{create-next-app.mdx,next.mdx}|03-architecture:{accessibility.mdx,fast-refresh.mdx,nextjs-compiler.mdx,supported-browsers.mdx}|04-community:{01-contribution-guide.mdx,02-rspack.mdx}<!-- NEXT-AGENTS-MD-START -->
