import { AuthContext } from "@/components/AuthContext";
import {
  CreateNewWorkspaceMutation,
  CreateNewWorkspaceMutationVariables,
} from "@/graphql/generated/graphql";
import { getGraphQLClientClient } from "@/graphql/graphQLClient";
import { gql, useMutation } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateWorkspace(
  onCompleted: (id: string) => void,
  onFailed: () => void
) {
  const accessToken = useContext(AuthContext);
  assert(accessToken != null, "accessToken is required");

  const client = getGraphQLClientClient(accessToken);

  const [createWorkspaceMutation, { loading, error }] = useMutation<
    CreateNewWorkspaceMutation,
    CreateNewWorkspaceMutationVariables
  >(
    gql`
      mutation CreateNewWorkspace($name: String!, $planKey: String!) {
        createWorkspace(input: { name: $name, planKey: $planKey }) {
          success
          workspace {
            id
            invitationCode
            domain
            isDomainLimitedCode
          }
        }
      }
    `,
    {
      client,
      refetchQueries: ["GetNonPendingWorkspaces"],
    }
  );

  if (error) {
    console.error("Apollo error while creating a workspace", error);
  }

  const createWorkspace = async (name: string) => {
    // TODO Internal users can use a plan key of "team-internal-v1" to bypass the trial
    // See github.com/replayio/devtools/pull/10430
    const result = await createWorkspaceMutation({
      variables: { name, planKey: "team-v1" },
    });

    if (result.data?.createWorkspace?.workspace?.id) {
      onCompleted(result.data?.createWorkspace?.workspace?.id);
    } else {
      onFailed();
    }
  };

  return { createWorkspace, error, loading };
}