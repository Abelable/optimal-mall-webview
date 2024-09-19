import { http } from "@/utils/http";
import { UserInfo } from "./type";

export const getUserInfo = async (): Promise<UserInfo> =>
  await http("user/info");
