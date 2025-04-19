import { SubHeader } from "../subHeader.tsx";

export function MileageTrends() {

    return (
        <div className="standardCard">
            <SubHeader
                value={'Monthly Mileage Trends'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`A view of total accumulated mileage across your fleet of vehicles on a month by month basis`}
            />

        </div>
    )
}
