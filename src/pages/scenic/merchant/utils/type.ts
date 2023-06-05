export interface ProviderInfo {
  companyName: string;
  businessLicensePhoto: string;
  regionDesc: string;
  regionCodeList: string;
  addressDetail: string;
  name: string;
  mobile: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  bankCardOwnerName: string;
  bankCardNumber: string;
  bankName: string;
  shopAvatar: string;
  shopName: string;
  shopType: number;
  shopCover: string;
}

export interface ShopTypeOption {
  id: number;
  name: string;
}

export interface ProviderStatusInfo {
  id: number;
  type: number;
  status: number;
  failureReason: string;
}
