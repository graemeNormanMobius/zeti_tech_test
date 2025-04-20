import { ModalWindow } from "../modalWindow.tsx";
import { Button } from "../button.tsx";
import { useModal } from "../../context/modalContext.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { pdf } from "@react-pdf/renderer";
import { MyDocument } from "../billingHistory/invoicePDF.tsx";

export function QuickActionGenerateInvoice() {
    const { hideModal } = useModal();
    enum InvoiceEnum {
        Feb_21 = "February 2021",
        Jan_21 = "January 2021",
        Dec_20 = "December 2020",
        Nov_20 = "November 2020",
        Oct_20 = "October 2020",
        Sept_20 = "September 2020",
        Aug_20 = "August 2020",
        Jul_20 = "July 2020",
        Jun_20 = "June 2020",
        May_20 = "May 2020",
        Apr_20 = "Apr 2020",
        Mar_20 = "March 2020",
    }

    const preloadedValues = {};
    const { register, handleSubmit } = useForm<{ invoicePeriod: InvoiceEnum }>({
        defaultValues: preloadedValues
    });

    const onSubmit: SubmitHandler<{ invoicePeriod: InvoiceEnum }> = data => {
        console.log("submit", data);
        generatePDF();

    };

    const generatePDF = () => {
        pdf(<MyDocument />)
            .toBlob()
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'example.pdf';
                link.click();
            })
            .catch((err) => {
                console.error('Error generating PDF:', err);
            });
    }

    // const generatePDF = async () => {
    //     const blob = await pdf(<MyDocument />).toBlob();
    //     const url = URL.createObjectURL(blob);
    //
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.download = 'example.pdf';
    //     link.click();
    // };

    return (
        <ModalWindow
            modalTriggerLabel={'Create Invoice'}
            modalTitle={'Generate New Invoice'}
            modalDesc={undefined}
            actionType={'button'}
            modalSize={undefined}
            fullScreen={undefined}
            modalRef={'quickActionsCreateInvoice'}
            showModalTrigger={true}
            disableModalTrigger={false}
        >


            <form className="customForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label bodyXSmallEmp" htmlFor="emissionsFactor">
                        Select Invoice Month
                    </label>
                    <select
                        className="form-select"
                        id="emissionsFactor"
                        {...register('invoicePeriod')}
                    >
                        <option value="feb_21">February 2021</option>
                        <option value="jan_21" disabled={true}>January 2021</option>
                        <option value="dec_20" disabled={true}>December 2020</option>
                        <option value="nov_20" disabled={true}>November 2020</option>
                        <option value="oct_20" disabled={true}>October 2020</option>
                        <option value="sept_20" disabled={true}>September 2020</option>
                        <option value="aug_20" disabled={true}>August 2020</option>
                        <option value="jul_20" disabled={true}>July 2020</option>
                        <option value="jun_20" disabled={true}>June 2020</option>
                        <option value="may_20" disabled={true}>May 2020</option>
                        <option value="apr_20" disabled={true}>April 2020</option>
                        <option value="mar_20" disabled={true}>March 2020</option>
                        {/*{Object.values(IntensityEmissionsFactor).map((value, index) => {*/}
                        {/*    return (*/}
                        {/*        <option key={index} value={value}>*/}
                        {/*            {capitaliseStrValue(value)}*/}
                        {/*        </option>*/}
                        {/*    );*/}
                        {/*})}*/}
                    </select>
                </div>
                <div className="modalFooter modal-buttonGroup">
                    <Button
                        hasIcon="noIcon"
                        onClick={hideModal}
                        size="md"
                        state="default"
                        type="ghost"
                        isSubmit={false}
                        value="Cancel"
                    />

                    <Button
                        hasIcon="noIcon"
                        size="md"
                        state="default"
                        type="accent"
                        isSubmit={true}
                        value="Generate Invoice"
                    />
                </div>
            </form>
        </ModalWindow>
    )
}
