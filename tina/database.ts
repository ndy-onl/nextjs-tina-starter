import { createDatabase, createLocalDatabase } from "@tinacms/datalayer";
import { UpstashRedisLevel } from "upstash-redis-level";
import { GitHubProvider } from "tinacms-gitprovider-github";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

export default isLocal
  ? createLocalDatabase()
  : createDatabase({
      gitProvider: new GitHubProvider({
        branch: process.env.GITHUB_BRANCH,
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        token: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
      }),
      databaseAdapter: new UpstashRedisLevel({
        redis: {
          url: redisUrl,
        },
        debug: process.env.DEBUG === "true" || false,
      }),
      namespace: process.env.GITHUB_BRANCH,
    });