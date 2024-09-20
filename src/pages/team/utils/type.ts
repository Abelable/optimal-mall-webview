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

export interface CommissionCashInfo {
  share: number;
  team: number;
}

export interface CommissionTimeData {
  orderCount: number;
  salesVolume: number;
  pendingAmount: number;
  settledAmount: number;
}

interface Coods {
  cover: string;
  name: string;
  selectedSkuName: string;
  commission: number;
}

export interface Order {
  orderSn: string;
  status: number;
  createdAt: string;
  commission: number;
  goodsList?: Coods[];
  goods?: Coods;
}
