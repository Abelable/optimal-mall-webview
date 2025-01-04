import { http } from "@/utils/http";
import type { OssConfig } from "./type";

export const getOssConfig = async (): Promise<OssConfig> =>
  await http("oss_config");

export const getNewYearBagCount = async () =>
  await http("cart/new_year_goods_number");
