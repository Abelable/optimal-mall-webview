import { http } from "@/utils/http";
import { TeamLeaderInfo, TeamLeaderStatusInfo } from "./type";

export const uploadTeamLeaderInfo = async (info: TeamLeaderInfo) =>
  await http("team_leader/settle_in", { method: "POST", data: info });

export const getTeamLeaderStatusInfo =
  async (): Promise<TeamLeaderStatusInfo> => await http("team_leader/status");

export const reapplyTeamLeader = async () =>
  await http("team_leader/reapply", { method: "POST" });
