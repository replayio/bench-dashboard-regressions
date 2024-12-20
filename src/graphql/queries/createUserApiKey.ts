import { SessionContext } from "@/components/SessionContext";
import {
  CreateUserApiKeyMutation,
  CreateUserApiKeyMutationVariables,
} from "@/graphql/generated/graphql";
import { ApiKeyScope } from "@/graphql/types";
import { useGraphQLMutation } from "@/hooks/useGraphQLMutation";
import { gql } from "@apollo/client";
import assert from "assert";
import { useContext } from "react";

export function useCreateUserAPIKey() {
  const { accessToken } = useContext(SessionContext);
  assert(accessToken != null, "accessToken is required");

  const {
    mutate: createApiKeyMutation,
    error,
    isLoading,
  } = useGraphQLMutation<CreateUserApiKeyMutation, CreateUserApiKeyMutationVariables>(
    gql`
      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {
        createUserAPIKey(input: { label: $label, scopes: $scopes }) {
          key {
            id
            label
          }
          keyValue
        }
      }
    `,
    {
      refetchQueries: ["GetUserSettings"],
    }
  );

  if (error) {
    console.error("Apollo error while creating a user API key", error);
  }

  const createApiKey = async (label: string, scopes: ApiKeyScope[]) => {
    const response = await createApiKeyMutation({
      variables: { label, scopes },
    });

    assert(response?.data?.createUserAPIKey != null, "Workspace API key creation failed");

    return response.data.createUserAPIKey.keyValue;
  };

  return { createApiKey, error, isLoading };
}
