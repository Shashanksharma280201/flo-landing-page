const userAgent = process.env.npm_config_user_agent || "";

if (!userAgent.includes("pnpm")) {
  console.error(
    "Use pnpm instead of npm. Example: pnpm install, pnpm dev, pnpm build",
  );
  process.exit(1);
}
