import { useContext, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { SubHeader } from "../subHeader.tsx";
import { ThemeContextV2 } from "../../context/themeContext.tsx";
import { cellRendererPaymentIndicator, monetaryValueFormatter } from "../../agGridCellComponents/cellRendererComponents.tsx";
import { getUserClientId } from "../../utils/utils.tsx";
import { BasicInvoice } from "../../models/models.tsx";
import { LoadingAnimation } from "../loadingAnimation.tsx";
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../styles/externalThemes/ag-grid/ag-grid-theme-builder.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);
provideGlobalGridOptions({ theme: "legacy" });

export function RecentInvoices() {
    const { isDarkTheme } = useContext(ThemeContextV2);
    const [loading, setLoading] = useState(false);
    const [invoices, setInvoices] = useState<BasicInvoice[] | []>([]);
    const currentUsersClientId = getUserClientId();

    useEffect(() => {
        if (invoices.length === 0) {
            setLoading(true)
            fetch(`/api/historicAndUpcomingInvoices?clientId=${currentUsersClientId.clientId}`)
                .then((res) => res.json())
                .then((data) => {
                    setInvoices(data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1500);

                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [invoices]);

    const gridColumns: ColDef[] = [
        {
            headerName: '#ID',
            field: 'id',
            width: 100,
            resizable: true,
            sortable: true,
            unSortIcon: true,
            suppressMovable: true,
            lockPosition: true,
            cellClass: 'truncate bodySmall'
        },
        {
            headerName: 'Invoice Period',
            field: 'period',
            width: 200,
            resizable: true,
            sortable: true,
            unSortIcon: true,
            cellClass: 'gridContentCentre truncate bodySmall'
        },
        {
            headerName: 'Amount (£)',
            field: 'amount',
            width: 135,
            cellRenderer: monetaryValueFormatter,
            cellRendererParams: {
                dataProperty: 'amount'
            },
            resizable: true,
            sortable: true,
            unSortIcon: true,
            cellClass: 'gridContentCentre truncate bodySmall'
        },
        {
            headerName: 'Vehicles in fleet',
            field: 'totalVehicles',
            width: 205,
            resizable: true,
            sortable: true,
            unSortIcon: true,
            cellClass: 'gridContentCentre truncate bodySmall'
        },
        {
            headerName: 'Total miles (for period)',
            field: 'totalMiles',
            width: 205,
            resizable: true,
            sortable: true,
            unSortIcon: true,
            cellClass: 'gridContentCentre truncate bodySmall'
        },
        {
            headerName: 'Payment Status',
            field: 'status',
            width: 150,
            resizable: true,
            suppressMovable: true,
            cellClass: 'actions-button-cell',
            pinned: 'right',
            cellRenderer: cellRendererPaymentIndicator
        }
    ];

    return (
        <div className="standardCard">
            <SubHeader
                value={'Recent Invoices'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`A view of recent invoices historically on a month basis`}
            />

            {(loading && !invoices.length) ? (
                <>
                    <LoadingAnimation isDarkMode={isDarkTheme} skeletonType={'thickTextComponent'} />
                    <LoadingAnimation isDarkMode={isDarkTheme} skeletonType={'thickTextComponent'} />
                    <LoadingAnimation isDarkMode={isDarkTheme} skeletonType={'thickTextComponent'} />
                    <LoadingAnimation isDarkMode={isDarkTheme} skeletonType={'thickTextComponent'} />
                    <LoadingAnimation isDarkMode={isDarkTheme} skeletonType={'thickTextComponent'} />
                </>
            ) : (
                <div className="invoicesContainer ag-theme-custom ag-theme-quartz bodySmall">
                    <AgGridReact
                        theme={themeQuartz}
                        rowData={invoices}
                        rowHeight={56}
                        headerHeight={40}
                        enableCellTextSelection={true}
                        columnDefs={gridColumns}
                        className="agGridContainer"
                    />
                </div>
            )}
        </div>
    )
}
