import { Button } from "../button.tsx";
import { AddIcon } from "../icons.tsx";
import { getUserClientId } from "../../utils/utils.tsx";
import { Vehicle } from "../../models/models.tsx";
import { ModalWindow } from "../modalWindow.tsx";
import { useModal } from "../../context/modalContext.tsx";
import { useVehicles } from "../../context/vehicleContext.tsx";

export function YourFleetQuickActions() {
    const currentUsersClientId = getUserClientId();
    const { addVehicle } = useVehicles();
    const { hideModal } = useModal();

    const newCar: Vehicle = {
        vin: "555aaabbb",
        licensePlate: "ND19 GAO",
        make: "BMW",
        model: "M5 Comp",
        type:"petrol",
        state: {
            odometerInMeters: 0,
            speedInMph: 0,
            asAt: new Date()
        },
        clientId: currentUsersClientId.clientId
    }

    const addNewVehicle = () => {
        fetch(`/api/vehicles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCar)
        })
            .then((res) => res.json())
            .then((data: Vehicle) => {
                addVehicle(data);
                setTimeout(() => { hideModal() }, 1500);
            })
            .catch(() => {
                throw new Error('There has been an error adding your new vehicle');
            });
    }

    return (
        <ModalWindow
            modalTriggerLabel={'Add new vehicle'}
            modalTitle={'Add new vehicle to your fleet'}
            modalDesc={undefined}
            actionType={'button'}
            modalSize={undefined}
            fullScreen={undefined}
            modalRef={'addVehicleToFleet'}
            showModalTrigger={true}
            disableModalTrigger={false}
        >
            <div className="modalFooter modal-buttonGroup">
                <Button
                    hasIcon="noIcon"
                    size="md"
                    state="default"
                    type="secondary"
                    value="Cancel"
                    onClick={hideModal}
                    isSubmit={false}
                />

                <Button
                    hasIcon="trailing"
                    size="md"
                    state="default"
                    type="accent"
                    value="Add vehicle to fleet"
                    onClick={addNewVehicle}
                    icon={<AddIcon />}
                    isSubmit={false}
                />
            </div>
        </ModalWindow>
    )
}
