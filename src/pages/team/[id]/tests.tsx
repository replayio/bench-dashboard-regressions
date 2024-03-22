import { COOKIES } from "@/constants";
import { useSyncDefaultWorkspace } from "@/hooks/useSyncDefaultWorkspace";
import { getServerSidePropsHelpers as getServerSidePropsShared } from "@/pageComponents/team/id/getServerSidePropsHelpers";
import { TestSuiteTestsPage } from "@/pageComponents/team/id/tests/TestSuiteTestsPage";
import {
  ContextRoot,
  Filters,
} from "@/pageComponents/team/id/tests/TestsViewContext";
import { TeamLayout } from "@/pageComponents/team/layout/TeamLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function Page({
  filters,
  workspaceId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useSyncDefaultWorkspace();

  return (
    <ContextRoot filters={filters} workspaceId={workspaceId}>
      <TestSuiteTestsPage workspaceId={workspaceId!} />
    </ContextRoot>
  );
}

Page.Layout = TeamLayout;

export async function getServerSideProps(
  context: GetServerSidePropsContext<any>
) {
  const stringValue = context.req.cookies[COOKIES.testsFilters];
  const filters = stringValue
    ? (JSON.parse(stringValue) as Partial<Filters>)
    : null;

  const { invalidWorkspace, isTest, workspaceId } =
    await getServerSidePropsShared(context);

  if (invalidWorkspace) {
    return {
      redirect: {
        permanent: false,
        destination: "/team/me/recordings",
      },
      props: {
        filters,
        workspaceId,
      },
    };
  } else if (!isTest) {
    return {
      redirect: {
        permanent: false,
        destination: `/team/${workspaceId}/recordings`,
      },
      props: {
        filters,
        workspaceId,
      },
    };
  }

  return {
    props: {
      filters,
      workspaceId,
    },
  };
}
