const isGH = process.env.GITHUB_PAGES === "true";
const repo = "camp_lp";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isGH ? `/${repo}` : "",
  assetPrefix: isGH ? `/${repo}/` : "",
  trailingSlash: true,
};
export default nextConfig;
