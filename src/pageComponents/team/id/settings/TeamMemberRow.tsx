import { Icon } from "@/components/Icon";
import { IconButton } from "@/components/IconButton";
import { WorkspaceMember } from "@/graphql/types";
import { useRemoveUserFromWorkspace } from "@/graphql/useRemoveUserFromWorkspace";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { EditMemberRoleDialog } from "@/pageComponents/team/id/settings/EditMemberRoleDialog";
import { Roles } from "@/pageComponents/team/id/settings/constants";
import { getPrimaryRole } from "@/utils/user";
import { useState } from "react";

export function TeamMemberRow({
  currentUserId,
  currentUserIsAdmin,
  member,
}: {
  currentUserId: string;
  currentUserIsAdmin: boolean;
  member: WorkspaceMember;
}) {
  const [isPending, setIsPending] = useState(false);
  const [showEditMemberRoleDialog, setShowEditMemberRoleDialog] = useState(false);

  const { removeUserFromWorkspace } = useRemoveUserFromWorkspace();

  const { confirmationDialog: confirmRemoveDialog, showConfirmationDialog: showRemoveDialog } =
    useConfirmDialog(
      async (confirmRemove: boolean) => {
        if (confirmRemove) {
          setIsPending(true);

          try {
            await removeUserFromWorkspace(member.membershipId);
          } finally {
            setIsPending(false);
          }
        }
      },
      {
        cancelButtonLabel: "No",
        confirmButtonLabel: "Yes, remove",
        message: `Are you sure you want to remove ${member.name} from this team?`,
        title: member.name,
      }
    );

  return (
    <div className="flex flex-row items-center gap-2" data-test-name="TeamMembers-MemberRow">
      {currentUserIsAdmin && (
        <>
          <IconButton
            disabled={isPending}
            iconType="edit"
            onClick={() => setShowEditMemberRoleDialog(true)}
            title="Edit role"
          />
          {showEditMemberRoleDialog && (
            <EditMemberRoleDialog
              currentUserId={currentUserId}
              member={member}
              onDismiss={() => setShowEditMemberRoleDialog(false)}
            />
          )}
          <IconButton
            disabled={isPending || currentUserId === member.id}
            iconType="delete"
            onClick={showRemoveDialog}
            title="Remove member"
          />
          {confirmRemoveDialog}
        </>
      )}
      <div className="flex items-center justify-center rounded-full w-8 h-8 overflow-hidden shrink-0 bg-slate-500">
        {member.picture ? (
          <img
            alt={`${member.name} avatar`}
            className="w-full h-full"
            referrerPolicy="no-referrer"
            src={member.picture}
          />
        ) : null}
      </div>
      <div className="truncate">{member.name}</div>
      {member.roles.includes(Roles.Admin.graphQLValue) && (
        <div
          className="shrink-0 text-xs bg-rose-600 px-1 rounded-sm"
          data-test-name="TeamMembers-Role-Admin"
        >
          Admin
        </div>
      )}
      <div
        className="shrink-0 text-xs bg-slate-600 px-1 rounded-sm"
        data-test-name={`TeamMembers-Role-${getPrimaryRole(member.roles).label}`}
      >
        {getPrimaryRole(member.roles).label}
      </div>
    </div>
  );
}
