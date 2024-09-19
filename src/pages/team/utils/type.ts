export interface UserInfo {
  id: number;
  avatar: string;
  nickname: string;
  level: number;
  mobile: string;
  promoterId: number;
}

export interface CommissionSumInfo {
  cashAmount: number;
  pendingAmount: number;
  settledAmount: number;
}

export interface PromoterData {
  todayNewCount: number;
  todayOrderingCount: number;
  totalCount: number;
}
