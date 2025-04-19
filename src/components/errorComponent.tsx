import { Notification } from "./notification.tsx";

export function VehicleStatusError() {
    return (
        <div className="summaryBlockContainer dirrCol">
            <Notification showIcon={false} type={"danger"} header='No vehicle statuses available currently' showContent={false} />
        </div>
    );
}
