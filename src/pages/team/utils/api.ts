import { http } from "@/utils/http";
import type {
  UserInfo,
  CommissionSumInfo,
  PromoterData,
  CommissionCashInfo,
  CommissionTimeData,
  Order,
} from "./type";

export const getUserInfo = async (): Promise<UserInfo> =>
  await http("user/info");

export const getCommissionSumInfo = async (): Promise<CommissionSumInfo> =>
  await http("gift_commission/sum");

export const getCommissionCashInfo = async (): Promise<CommissionCashInfo> =>
  await http("gift_commission/cash");

export const getGiftCommissionTimeData = async (
  timeType: number
): Promise<CommissionTimeData> =>
  await http("gift_commission/time_data", { data: { timeType } });

export const getTeamCommissionTimeData = async (
  timeType: number
): Promise<CommissionTimeData> =>
  await http("commission/team_time_data", { data: { timeType } });

export const getGiftOrderList = async (
  timeType: number,
  page: number,
  limit = 10
): Promise<Order[]> => {
  const { list = [] } = await http("order/gift_commission_list", {
    data: { timeType, page, limit },
  });
  return list;
};

export const getTeamOrderList = async (
  timeType: number,
  page: number,
  limit = 10
): Promise<Order[]> => {
  const { list = [] } = await http("order/team_commission_list", {
    data: { timeType, page, limit },
  });
  return list;
};

export const getPromoterData = async (): Promise<PromoterData> =>
  await http("user/promoter_data");
