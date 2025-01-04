import { http } from "@/utils/http";
import { RegionOption, Goods } from "./type";

export const getGoodsList = async (): Promise<Goods[]> =>
  await http("new_year/goods_list");

export const getCultureGoodsList = async (): Promise<Goods[]> =>
  await http("new_year/culture_goods_list");

export const getRegionOptions = async (): Promise<RegionOption[]> =>
  await http("new_year/region_options");

export const getLocalGoodsList = async (regionId: number): Promise<Goods[]> =>
  await http("new_year/local_goods_list", { data: { regionId } });

export const addCart = async (
  goodsId: number,
  selectedSkuIndex = 0,
  number = 1
) =>
  await http("cart/add", {
    method: "POST",
    data: { goodsId, selectedSkuIndex, number },
  });
