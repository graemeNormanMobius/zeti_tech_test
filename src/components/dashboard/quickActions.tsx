import { SubHeader } from "../subHeader.tsx";
import { Button } from "../button.tsx";
import { QuickActionGenerateInvoice } from "./quickActionGenerateInvoice.tsx";

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
                <QuickActionGenerateInvoice />
                <Button
                    hasIcon="noIcon"
                    size="md"
                    state="disabled"
                    type="secondary"
                    value="Add mileage"
                    isSubmit={false}
                />
            </div>
        </div>
    )
}
