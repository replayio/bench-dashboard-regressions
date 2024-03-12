/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n      query GetWorkspaceApiKeys($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            apiKeys {\n              id\n              createdAt\n              label\n              scopes\n              recordingCount\n              maxRecordings\n            }\n          }\n        }\n      }\n    ": types.GetWorkspaceApiKeysDocument,
    "\n      mutation AddCollaborator($email: String!, $recordingId: ID!) {\n        addRecordingCollaborator(\n          input: { email: $email, recordingId: $recordingId }\n        ) {\n          success\n        }\n      }\n    ": types.AddCollaboratorDocument,
    "\n      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {\n        createUserAPIKey(input: { label: $label, scopes: $scopes }) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    ": types.CreateUserApiKeyDocument,
    "\n      mutation CreateNewWorkspace($name: String!, $planKey: String!) {\n        createWorkspace(input: { name: $name, planKey: $planKey }) {\n          success\n          workspace {\n            id\n            invitationCode\n            domain\n            isDomainLimitedCode\n          }\n        }\n      }\n    ": types.CreateNewWorkspaceDocument,
    "\n      mutation CreateWorkspaceAPIKey(\n        $workspaceId: ID!\n        $label: String!\n        $scopes: [String!]!\n      ) {\n        createWorkspaceAPIKey(\n          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes }\n        ) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    ": types.CreateWorkspaceApiKeyDocument,
    "\n      mutation DeleteRecording($recordingId: ID!) {\n        deleteRecording(input: { id: $recordingId }) {\n          success\n        }\n      }\n    ": types.DeleteRecordingDocument,
    "\n      mutation DeleteCollaborator($collaborationId: ID!) {\n        removeRecordingCollaborator(input: { id: $collaborationId }) {\n          success\n        }\n      }\n    ": types.DeleteCollaboratorDocument,
    "\n      mutation DeleteUserAPIKey($id: ID!) {\n        deleteUserAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    ": types.DeleteUserApiKeyDocument,
    "\n      mutation DeleteWorkspace(\n        $workspaceId: ID!\n        $shouldDeleteRecordings: Boolean!\n      ) {\n        deleteWorkspace(\n          input: {\n            workspaceId: $workspaceId\n            shouldDeleteRecordings: $shouldDeleteRecordings\n          }\n        ) {\n          success\n        }\n      }\n    ": types.DeleteWorkspaceDocument,
    "\n      mutation DeleteWorkspaceAPIKey($id: ID!) {\n        deleteWorkspaceAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    ": types.DeleteWorkspaceApiKeyDocument,
    "\n      query GetUser {\n        viewer {\n          email\n          internal\n          nags\n          user {\n            name\n            picture\n            id\n          }\n        }\n      }\n    ": types.GetUserDocument,
    "\n      query GetDefaultWorkspace {\n        viewer {\n          defaultWorkspace {\n            id\n          }\n        }\n      }\n    ": types.GetDefaultWorkspaceDocument,
    "\n      query GetNonPendingWorkspaces {\n        viewer {\n          workspaces {\n            edges {\n              node {\n                id\n                invitationCode\n                isTest\n                name\n              }\n            }\n          }\n        }\n      }\n    ": types.GetNonPendingWorkspacesDocument,
    "\n      query GetMyRecordings($filter: String) {\n        viewer {\n          recordings(filter: $filter) {\n            edges {\n              node {\n                buildId\n                duration\n                comments {\n                  id\n                }\n                createdAt\n                owner {\n                  id\n                  name\n                  picture\n                }\n                private\n                title\n                url\n                uuid\n              }\n            }\n          }\n        }\n      }\n    ": types.GetMyRecordingsDocument,
    "\n  query GetOwnerAndCollaborators($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      collaborators {\n        edges {\n          node {\n            ... on RecordingPendingEmailCollaborator {\n              id\n              email\n              createdAt\n            }\n            ... on RecordingPendingUserCollaborator {\n              id\n              user {\n                name\n                picture\n              }\n            }\n            ... on RecordingUserCollaborator {\n              id\n              user {\n                name\n                picture\n              }\n            }\n          }\n        }\n      }\n      collaboratorRequests {\n        edges {\n          node {\n            ... on RecordingCollaboratorRequest {\n              id\n              user {\n                name\n                picture\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetOwnerAndCollaboratorsDocument,
    "\n  query getRecordingPhoto($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      thumbnail\n    }\n  }\n": types.GetRecordingPhotoDocument,
    "\n      query GetTestsRunsForWorkspace(\n        $workspaceId: ID!\n        $startTime: String\n        $endTime: String\n      ) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  id\n                  date\n                  mode\n                  results {\n                    counts {\n                      failed\n                      flaky\n                      passed\n                    }\n                  }\n                  source {\n                    commitId\n                    commitTitle\n                    groupLabel\n                    isPrimaryBranch\n                    branchName\n                    prNumber\n                    prTitle\n                    repository\n                    triggerUrl\n                    user\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ": types.GetTestsRunsForWorkspaceDocument,
    "\n      query GetTests($workspaceId: ID!, $id: String!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(id: $id) {\n              edges {\n                node {\n                  tests(includeNonRecorded: true) {\n                    id\n                    testId\n                    title\n                    scope\n                    sourcePath\n                    result\n                    errors\n                    durationMs\n                    executions {\n                      result\n                      recordings {\n                        buildId\n                        uuid\n                        duration\n                        isProcessed\n                        createdAt\n                        comments {\n                          user {\n                            id\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ": types.GetTestsDocument,
    "\n      query GetUserSettings {\n        viewer {\n          apiKeys {\n            id\n            createdAt\n            label\n            scopes\n            recordingCount\n            maxRecordings\n          }\n        }\n      }\n    ": types.GetUserSettingsDocument,
    "\n      query GetWorkspaceMembers($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspacePendingEmailMember {\n                    __typename\n                    id\n                    roles\n                    email\n                    createdAt\n                  }\n                  ... on WorkspacePendingUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ": types.GetWorkspaceMembersDocument,
    "\n      query GetWorkspaceRecordings($id: ID!, $filter: String) {\n        node(id: $id) {\n          ... on Workspace {\n            id\n            recordings(filter: $filter) {\n              edges {\n                node {\n                  buildId\n                  comments {\n                    id\n                  }\n                  createdAt\n                  duration\n                  metadata\n                  owner {\n                    id\n                    name\n                    picture\n                  }\n                  private\n                  title\n                  url\n                  uuid\n                }\n              }\n            }\n          }\n        }\n      }\n    ": types.GetWorkspaceRecordingsDocument,
    "\n      mutation InviteWorkspaceMember(\n        $email: String!\n        $workspaceId: ID!\n        $roles: [String!]\n      ) {\n        addWorkspaceMember(\n          input: { email: $email, workspaceId: $workspaceId, roles: $roles }\n        ) {\n          success\n        }\n      }\n    ": types.InviteWorkspaceMemberDocument,
    "\n      mutation UpdateDefaultWorkspace($workspaceId: ID) {\n        updateUserDefaultWorkspace(input: { workspaceId: $workspaceId }) {\n          success\n          workspace {\n            id\n          }\n        }\n      }\n    ": types.UpdateDefaultWorkspaceDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetWorkspaceApiKeys($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            apiKeys {\n              id\n              createdAt\n              label\n              scopes\n              recordingCount\n              maxRecordings\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetWorkspaceApiKeys($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            apiKeys {\n              id\n              createdAt\n              label\n              scopes\n              recordingCount\n              maxRecordings\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation AddCollaborator($email: String!, $recordingId: ID!) {\n        addRecordingCollaborator(\n          input: { email: $email, recordingId: $recordingId }\n        ) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation AddCollaborator($email: String!, $recordingId: ID!) {\n        addRecordingCollaborator(\n          input: { email: $email, recordingId: $recordingId }\n        ) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {\n        createUserAPIKey(input: { label: $label, scopes: $scopes }) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateUserAPIKey($label: String!, $scopes: [String!]!) {\n        createUserAPIKey(input: { label: $label, scopes: $scopes }) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateNewWorkspace($name: String!, $planKey: String!) {\n        createWorkspace(input: { name: $name, planKey: $planKey }) {\n          success\n          workspace {\n            id\n            invitationCode\n            domain\n            isDomainLimitedCode\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateNewWorkspace($name: String!, $planKey: String!) {\n        createWorkspace(input: { name: $name, planKey: $planKey }) {\n          success\n          workspace {\n            id\n            invitationCode\n            domain\n            isDomainLimitedCode\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation CreateWorkspaceAPIKey(\n        $workspaceId: ID!\n        $label: String!\n        $scopes: [String!]!\n      ) {\n        createWorkspaceAPIKey(\n          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes }\n        ) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "): (typeof documents)["\n      mutation CreateWorkspaceAPIKey(\n        $workspaceId: ID!\n        $label: String!\n        $scopes: [String!]!\n      ) {\n        createWorkspaceAPIKey(\n          input: { workspaceId: $workspaceId, label: $label, scopes: $scopes }\n        ) {\n          key {\n            id\n            label\n          }\n          keyValue\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteRecording($recordingId: ID!) {\n        deleteRecording(input: { id: $recordingId }) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteRecording($recordingId: ID!) {\n        deleteRecording(input: { id: $recordingId }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteCollaborator($collaborationId: ID!) {\n        removeRecordingCollaborator(input: { id: $collaborationId }) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteCollaborator($collaborationId: ID!) {\n        removeRecordingCollaborator(input: { id: $collaborationId }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteUserAPIKey($id: ID!) {\n        deleteUserAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteUserAPIKey($id: ID!) {\n        deleteUserAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteWorkspace(\n        $workspaceId: ID!\n        $shouldDeleteRecordings: Boolean!\n      ) {\n        deleteWorkspace(\n          input: {\n            workspaceId: $workspaceId\n            shouldDeleteRecordings: $shouldDeleteRecordings\n          }\n        ) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteWorkspace(\n        $workspaceId: ID!\n        $shouldDeleteRecordings: Boolean!\n      ) {\n        deleteWorkspace(\n          input: {\n            workspaceId: $workspaceId\n            shouldDeleteRecordings: $shouldDeleteRecordings\n          }\n        ) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation DeleteWorkspaceAPIKey($id: ID!) {\n        deleteWorkspaceAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation DeleteWorkspaceAPIKey($id: ID!) {\n        deleteWorkspaceAPIKey(input: { id: $id }) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetUser {\n        viewer {\n          email\n          internal\n          nags\n          user {\n            name\n            picture\n            id\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetUser {\n        viewer {\n          email\n          internal\n          nags\n          user {\n            name\n            picture\n            id\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetDefaultWorkspace {\n        viewer {\n          defaultWorkspace {\n            id\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetDefaultWorkspace {\n        viewer {\n          defaultWorkspace {\n            id\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetNonPendingWorkspaces {\n        viewer {\n          workspaces {\n            edges {\n              node {\n                id\n                invitationCode\n                isTest\n                name\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetNonPendingWorkspaces {\n        viewer {\n          workspaces {\n            edges {\n              node {\n                id\n                invitationCode\n                isTest\n                name\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetMyRecordings($filter: String) {\n        viewer {\n          recordings(filter: $filter) {\n            edges {\n              node {\n                buildId\n                duration\n                comments {\n                  id\n                }\n                createdAt\n                owner {\n                  id\n                  name\n                  picture\n                }\n                private\n                title\n                url\n                uuid\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetMyRecordings($filter: String) {\n        viewer {\n          recordings(filter: $filter) {\n            edges {\n              node {\n                buildId\n                duration\n                comments {\n                  id\n                }\n                createdAt\n                owner {\n                  id\n                  name\n                  picture\n                }\n                private\n                title\n                url\n                uuid\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOwnerAndCollaborators($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      collaborators {\n        edges {\n          node {\n            ... on RecordingPendingEmailCollaborator {\n              id\n              email\n              createdAt\n            }\n            ... on RecordingPendingUserCollaborator {\n              id\n              user {\n                name\n                picture\n              }\n            }\n            ... on RecordingUserCollaborator {\n              id\n              user {\n                name\n                picture\n              }\n            }\n          }\n        }\n      }\n      collaboratorRequests {\n        edges {\n          node {\n            ... on RecordingCollaboratorRequest {\n              id\n              user {\n                name\n                picture\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOwnerAndCollaborators($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      collaborators {\n        edges {\n          node {\n            ... on RecordingPendingEmailCollaborator {\n              id\n              email\n              createdAt\n            }\n            ... on RecordingPendingUserCollaborator {\n              id\n              user {\n                name\n                picture\n              }\n            }\n            ... on RecordingUserCollaborator {\n              id\n              user {\n                name\n                picture\n              }\n            }\n          }\n        }\n      }\n      collaboratorRequests {\n        edges {\n          node {\n            ... on RecordingCollaboratorRequest {\n              id\n              user {\n                name\n                picture\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRecordingPhoto($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      thumbnail\n    }\n  }\n"): (typeof documents)["\n  query getRecordingPhoto($recordingId: UUID!) {\n    recording(uuid: $recordingId) {\n      thumbnail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetTestsRunsForWorkspace(\n        $workspaceId: ID!\n        $startTime: String\n        $endTime: String\n      ) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  id\n                  date\n                  mode\n                  results {\n                    counts {\n                      failed\n                      flaky\n                      passed\n                    }\n                  }\n                  source {\n                    commitId\n                    commitTitle\n                    groupLabel\n                    isPrimaryBranch\n                    branchName\n                    prNumber\n                    prTitle\n                    repository\n                    triggerUrl\n                    user\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetTestsRunsForWorkspace(\n        $workspaceId: ID!\n        $startTime: String\n        $endTime: String\n      ) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(filter: { startTime: $startTime, endTime: $endTime }) {\n              edges {\n                node {\n                  id\n                  date\n                  mode\n                  results {\n                    counts {\n                      failed\n                      flaky\n                      passed\n                    }\n                  }\n                  source {\n                    commitId\n                    commitTitle\n                    groupLabel\n                    isPrimaryBranch\n                    branchName\n                    prNumber\n                    prTitle\n                    repository\n                    triggerUrl\n                    user\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetTests($workspaceId: ID!, $id: String!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(id: $id) {\n              edges {\n                node {\n                  tests(includeNonRecorded: true) {\n                    id\n                    testId\n                    title\n                    scope\n                    sourcePath\n                    result\n                    errors\n                    durationMs\n                    executions {\n                      result\n                      recordings {\n                        buildId\n                        uuid\n                        duration\n                        isProcessed\n                        createdAt\n                        comments {\n                          user {\n                            id\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetTests($workspaceId: ID!, $id: String!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            testRuns(id: $id) {\n              edges {\n                node {\n                  tests(includeNonRecorded: true) {\n                    id\n                    testId\n                    title\n                    scope\n                    sourcePath\n                    result\n                    errors\n                    durationMs\n                    executions {\n                      result\n                      recordings {\n                        buildId\n                        uuid\n                        duration\n                        isProcessed\n                        createdAt\n                        comments {\n                          user {\n                            id\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetUserSettings {\n        viewer {\n          apiKeys {\n            id\n            createdAt\n            label\n            scopes\n            recordingCount\n            maxRecordings\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetUserSettings {\n        viewer {\n          apiKeys {\n            id\n            createdAt\n            label\n            scopes\n            recordingCount\n            maxRecordings\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetWorkspaceMembers($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspacePendingEmailMember {\n                    __typename\n                    id\n                    roles\n                    email\n                    createdAt\n                  }\n                  ... on WorkspacePendingUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetWorkspaceMembers($workspaceId: ID!) {\n        node(id: $workspaceId) {\n          ... on Workspace {\n            id\n            members {\n              edges {\n                node {\n                  ... on WorkspacePendingEmailMember {\n                    __typename\n                    id\n                    roles\n                    email\n                    createdAt\n                  }\n                  ... on WorkspacePendingUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                  ... on WorkspaceUserMember {\n                    __typename\n                    id\n                    roles\n                    user {\n                      id\n                      name\n                      picture\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      query GetWorkspaceRecordings($id: ID!, $filter: String) {\n        node(id: $id) {\n          ... on Workspace {\n            id\n            recordings(filter: $filter) {\n              edges {\n                node {\n                  buildId\n                  comments {\n                    id\n                  }\n                  createdAt\n                  duration\n                  metadata\n                  owner {\n                    id\n                    name\n                    picture\n                  }\n                  private\n                  title\n                  url\n                  uuid\n                }\n              }\n            }\n          }\n        }\n      }\n    "): (typeof documents)["\n      query GetWorkspaceRecordings($id: ID!, $filter: String) {\n        node(id: $id) {\n          ... on Workspace {\n            id\n            recordings(filter: $filter) {\n              edges {\n                node {\n                  buildId\n                  comments {\n                    id\n                  }\n                  createdAt\n                  duration\n                  metadata\n                  owner {\n                    id\n                    name\n                    picture\n                  }\n                  private\n                  title\n                  url\n                  uuid\n                }\n              }\n            }\n          }\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation InviteWorkspaceMember(\n        $email: String!\n        $workspaceId: ID!\n        $roles: [String!]\n      ) {\n        addWorkspaceMember(\n          input: { email: $email, workspaceId: $workspaceId, roles: $roles }\n        ) {\n          success\n        }\n      }\n    "): (typeof documents)["\n      mutation InviteWorkspaceMember(\n        $email: String!\n        $workspaceId: ID!\n        $roles: [String!]\n      ) {\n        addWorkspaceMember(\n          input: { email: $email, workspaceId: $workspaceId, roles: $roles }\n        ) {\n          success\n        }\n      }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      mutation UpdateDefaultWorkspace($workspaceId: ID) {\n        updateUserDefaultWorkspace(input: { workspaceId: $workspaceId }) {\n          success\n          workspace {\n            id\n          }\n        }\n      }\n    "): (typeof documents)["\n      mutation UpdateDefaultWorkspace($workspaceId: ID) {\n        updateUserDefaultWorkspace(input: { workspaceId: $workspaceId }) {\n          success\n          workspace {\n            id\n          }\n        }\n      }\n    "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;