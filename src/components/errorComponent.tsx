import { Notification } from "./notification.tsx";

export function StatusError({ message } : { message?: string}) {
    return (
        <div className="summaryBlockContainer dirrCol">
            <Notification showIcon={false} type={"danger"} header={message ?? 'Error'} showContent={false} />
        </div>
    );
}
