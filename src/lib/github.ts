export type GitHubRelease = {
  tagName: string;
  name: string;
  publishedAt: string;
  body: string;
  htmlUrl: string;
  dmgUrl: string | null;
};

type GitHubAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubReleaseResponse = {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  html_url: string;
  assets: GitHubAsset[];
};

const DEFAULT_REPO = "prxatt/DynaMac";

function getRepo(): string {
  return process.env.GITHUB_REPO ?? DEFAULT_REPO;
}

function mapRelease(release: GitHubReleaseResponse): GitHubRelease {
  const dmgAsset = release.assets.find((asset) =>
    asset.name.toLowerCase().endsWith(".dmg"),
  );

  return {
    tagName: release.tag_name,
    name: release.name || release.tag_name,
    publishedAt: release.published_at,
    body: release.body ?? "",
    htmlUrl: release.html_url,
    dmgUrl: dmgAsset?.browser_download_url ?? null,
  };
}

export async function fetchLatestRelease(): Promise<GitHubRelease | null> {
  const repo = getRepo();
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dynamac-web",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${repo}/releases/latest`,
    {
      headers,
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as GitHubReleaseResponse;
  return mapRelease(data);
}

export async function fetchReleases(limit = 10): Promise<GitHubRelease[]> {
  const repo = getRepo();
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dynamac-web",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(
    `https://api.github.com/repos/${repo}/releases?per_page=${limit}`,
    {
      headers,
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as GitHubReleaseResponse[];
  return data.map(mapRelease);
}
