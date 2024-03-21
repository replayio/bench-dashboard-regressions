import {
  GetWorkspaceQuery,
  GetWorkspaceQueryVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClient } from "@/graphql/graphQLClient";
import { gql } from "@apollo/client";
import assert from "assert";

const QUERY = gql`
  query GetWorkspace($workspaceId: ID!) {
    node(id: $workspaceId) {
      ... on Workspace {
        id
        isTest
      }
    }
  }
`;

export async function getWorkspace(
  accessToken: string,
  workspaceId: string
): Promise<{ id: string; isTest: boolean }> {
  const graphQLClient = getGraphQLClient(accessToken);

  const response = await graphQLClient.query<
    GetWorkspaceQuery,
    GetWorkspaceQueryVariables
  >({
    query: QUERY,
    variables: { workspaceId },
  });
  assert(
    response.data?.node != null && "id" in response.data?.node,
    `Workspace not found for id "${workspaceId}"`
  );

  return {
    id: response.data?.node.id,
    isTest: response.data?.node.isTest,
  };
}