import { SubHeader } from "../subHeader.tsx";
import { Button } from "../button.tsx";

export function QuickActions() {

    return (
        <div className="standardCard">
            <SubHeader
                value={'Quick Actions'}
                showInfo={false}
                tooltipPlacement={'top'}
                tooltipContent={``}
            />

            <div className="buttonGroup">
                <Button
                    hasIcon="noIcon"
                    // onClick={goToDashboard}
                    size="md"
                    state="default"
                    type="accent"
                    value="Create invoice"
                    isSubmit={false}
                />
                <Button
                    hasIcon="noIcon"
                    // onClick={goToDashboard}
                    size="md"
                    state="default"
                    type="secondary"
                    value="Add mileage"
                    isSubmit={false}
                />
            </div>
        </div>
    )
}
