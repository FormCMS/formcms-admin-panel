import useSWR from "swr";
import {fullCmsApiUrl } from "../configs";
import {decodeError, fetcher, swrConfig} from "../../api-util.ts/util";
import { XEntity } from "../types/xEntity";

export function useSchema (schemaName:string){
    let { data,error,isLoading} = useSWR<XEntity>(fullCmsApiUrl(`/schemas/entity/${schemaName}`), fetcher, swrConfig)
    if (error){
        error = decodeError(error)
    }
    return {data, isLoading, error}
}