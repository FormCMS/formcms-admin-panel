import {useLookupData, getLookupData} from "../services/entity";
import {LookupInput} from "../../components/inputs/LookupInput";
import {XAttr} from "../types/xEntity";
import {IComponentConfig} from "../../componentConfig";

type LookupContainerProps = {
    data: any,
    column: XAttr,
    id: any,
    control: any,
    register: any,
    className: string
    componentConfig: IComponentConfig
}

export function LookupContainer(
    {
        data: item, column, id, className, control, register,componentConfig
    }: LookupContainerProps
) {
    let val
    if (item[column.field]) {
        val = item[column.field][column.lookup!.labelAttributeName];
    }

    const {data} = useLookupData(column.lookup!.name, val);
    const search = async (q: string) => {
        const {data} = await getLookupData(column.lookup!.name, q);
        return data?.items;
    };

    const LookupInput = componentConfig.inputComponent.lookup;
    return <LookupInput
        idField={column.lookup!.primaryKey}
        labelField={column.lookup!.labelAttributeName}
        id={id}
        search={search}
        hasMore={data?.hasMore ?? false}
        items={data?.items ?? []}
        data={item}
        column={column}
        control={control}
        className={className}
        register={register}
    />
}