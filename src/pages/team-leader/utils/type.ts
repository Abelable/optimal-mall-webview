import type { UploaderFileListItem } from "vant";

export interface TeamLeaderInfo {
  name: string;
  mobile: string;
  email: string;
  idCardNumber: string;
  idCardFrontPhoto: string;
  idCardBackPhoto: string;
  holdIdCardPhoto: string;
  qualificationPhoto: string[];
}

export interface FormTeamLeaderInfo
  extends Omit<TeamLeaderInfo, "qualificationPhoto"> {
  qualificationPhoto: UploaderFileListItem[];
}

export interface TeamLeaderStatusInfo {
  id: number;
  type: number;
  status: number;
  failureReason: string;
}
