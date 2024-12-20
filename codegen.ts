import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/graphql/generated/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
