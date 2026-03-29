import { getTeamMembers } from "@/app/actions/team";
import { TeamManager } from "@/components/team/team-manager";

export default async function TeamPage() {
    const result = await getTeamMembers();
    const members = result.success && result.data ? result.data : [];

    return (
        <TeamManager initialMembers={members} />
    );
}
