import { Button } from "../button.tsx";
import { AddIcon } from "../icons.tsx";
import { getUserClientId } from "../../utils/utils.tsx";
import { Vehicle } from "../../models/models.tsx";
import { ModalWindow } from "../modalWindow.tsx";
import { useModal } from "../../context/modalContext.tsx";
import { useVehicles } from "../../context/vehicleContext.tsx";
// import {useContext, useState} from "react";
// import {ThemeContextV2} from "../../context/themeContext.tsx";
// import {Vehicle} from "../../models/models.tsx";

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
            // milesThisCalendarMonth?: number;
            // costThisCalendarMonth?: number;
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
                console.warn('NEW vehicles added successfully.');
                console.log(data);

                addVehicle(data);

                setTimeout(() => { hideModal() }, 1500);
            })
            .catch(() => {
                console.error('There has been an error adding your new vehicle')
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

            {/*<form className="customForm" onSubmit={handleSubmit(onSubmit)}>*/}
            {/*    <div className="form-group">*/}
            {/*        <label className="form-label bodyXSmallEmp" htmlFor="emissionsFactor">*/}
            {/*            Select Invoice Month*/}
            {/*        </label>*/}
            {/*        <select*/}
            {/*            className="form-select"*/}
            {/*            id="emissionsFactor"*/}
            {/*            {...register('invoicePeriod')}*/}
            {/*        >*/}
            {/*            <option value="feb_21">February 2021</option>*/}
            {/*            <option value="jan_21" disabled={true}>January 2021</option>*/}
            {/*            <option value="dec_20" disabled={true}>December 2020</option>*/}
            {/*            <option value="nov_20" disabled={true}>November 2020</option>*/}
            {/*            <option value="oct_20" disabled={true}>October 2020</option>*/}
            {/*            <option value="sept_20" disabled={true}>September 2020</option>*/}
            {/*            <option value="aug_20" disabled={true}>August 2020</option>*/}
            {/*            <option value="jul_20" disabled={true}>July 2020</option>*/}
            {/*            <option value="jun_20" disabled={true}>June 2020</option>*/}
            {/*            <option value="may_20" disabled={true}>May 2020</option>*/}
            {/*            <option value="apr_20" disabled={true}>April 2020</option>*/}
            {/*            <option value="mar_20" disabled={true}>March 2020</option>*/}
            {/*            /!*{Object.values(IntensityEmissionsFactor).map((value, index) => {*!/*/}
            {/*            /!*    return (*!/*/}
            {/*            /!*        <option key={index} value={value}>*!/*/}
            {/*            /!*            {capitaliseStrValue(value)}*!/*/}
            {/*            /!*        </option>*!/*/}
            {/*            /!*    );*!/*/}
            {/*            /!*})}*!/*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    <div className="modalFooter modal-buttonGroup">*/}
            {/*        <Button*/}
            {/*            hasIcon="noIcon"*/}
            {/*            onClick={hideModal}*/}
            {/*            size="md"*/}
            {/*            state="default"*/}
            {/*            type="ghost"*/}
            {/*            isSubmit={false}*/}
            {/*            value="Cancel"*/}
            {/*        />*/}
            {/*        <Button*/}
            {/*            hasIcon="noIcon"*/}
            {/*            size="md"*/}
            {/*            state="default"*/}
            {/*            type="accent"*/}
            {/*            isSubmit={true}*/}
            {/*            value="Generate Invoice"*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</form>*/}
        </ModalWindow>
    )
}
