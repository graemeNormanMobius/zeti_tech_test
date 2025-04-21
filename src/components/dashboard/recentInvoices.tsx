// import { useState } from "react";
// import { SubHeader } from "../subHeader.tsx";
// import { ClientSideRowModelModule } from 'ag-grid-community';
// import { ModuleRegistry } from 'ag-grid-community';
// import type { ColDef } from 'ag-grid-community';
// import { AgGridReact } from 'ag-grid-react';
// import { provideGlobalGridOptions } from 'ag-grid-community';

import  { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-community';
import { ClientSideRowModelModule, themeQuartz } from 'ag-grid-community';
import type { ColDef } from 'ag-grid-community';
import { SubHeader } from "../subHeader.tsx";

// import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../../styles/externalThemes/ag-grid/ag-grid-theme-builder.css';

// Register required modules
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });


// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

export function RecentInvoices() {

    const [rowData] = useState([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
    ]);

    const [columnDefs] = useState<ColDef[]>([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' },
    ]);

    console.log('rowData:', rowData);
    console.log('columnDefs:', columnDefs);

    return (
        <div className="standardCard">
            <SubHeader
                value={'Recent Invoices'}
                showInfo={true}
                tooltipPlacement={'top'}
                tooltipContent={`A view of recent invoices historically on a month basis`}
            />

            {/*<div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>*/}
            <div className="ag-theme-custom ag-theme-quartz bodySmall"> {/* style={{ height: 400, width: 400 }} */}
                <AgGridReact
                    theme={themeQuartz}
                    rowData={rowData}
                    rowHeight={56}
                    headerHeight={40}
                    enableCellTextSelection={true}
                    columnDefs={columnDefs}
                    className="agGridContainer"
                />
            </div>
        </div>
    )
}




// import React, { useState } from 'react';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';
//
// const MyAgGrid = () => {
//     const [rowData] = useState([
//         { make: 'Toyota', model: 'Celica', price: 35000 },
//         { make: 'Ford', model: 'Mondeo', price: 32000 },
//         { make: 'Porsche', model: 'Boxster', price: 72000 },
//     ]);
//
//     const [columnDefs] = useState([
//         { field: 'make' },
//         { field: 'model' },
//         { field: 'price' },
//     ]);
//
//     return (
//         <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
//             <AgGridReact rowData={rowData} columnDefs={columnDefs} />
//         </div>
//     );
// };
