
import { createContext, useContext, useState, ReactNode } from 'react';
import {Vehicle} from "../models/models.tsx";

// export type Vehicle = {
//     id: number;
//     name: string;
// };

interface VehicleContextType {
    vehicles: Vehicle[];
    addVehicle: (vehicle: Vehicle) => void; // vehicle: Vehicle
    loadVehicles: (vehicle: Vehicle[]) => void;
}

const VehicleContext = createContext<VehicleContextType | null>(null);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[] | []>([]);
    // const [vehicles, setVehicles] = useState<Vehicle[]>([
    //     { id: 1, name: 'Toyota Corolla' },
    //     { id: 2, name: 'Ford Mustang' }
    // ]);

    const addVehicle: any = (vehicle: any) => {
        // setVehicles(prev => [...prev, { id: Date.now(), ...vehicle }]);
        setVehicles((prev: any[]) => [...prev, vehicle]);
    };
    // const addVehicle = (vehicle: Omit<Vehicle, 'id'>) => {
    //     setVehicles(prev => [...prev, { id: Date.now(), ...vehicle }]);
    // };

    const loadVehicles = (vehicles: Vehicle[]) => {
        setVehicles(vehicles);
    };

    return (
        <VehicleContext.Provider value={{ vehicles, addVehicle, loadVehicles }}>
            {children}
        </VehicleContext.Provider>
    );
};

// Custom hook
export const useVehicles = () => {
    const context = useContext(VehicleContext);
    if (!context) {
        throw new Error('useVehicles must be used within a VehicleProvider');
    }
    return context;
};


// import { createContext, useContext, useState } from 'react';
// import {Vehicle} from "../models/models.tsx";
//
// interface VehicleContextType {
//     vehicles: Vehicle[];
//     addVehicle: (vehicle: Vehicle) => void;
// }
//
// const VehicleContext = createContext<VehicleContextType | null>(null);
// // const VehicleContext = createContext<VehicleContextType | []>([]);
//
// export const VehicleProvider = ({ children }: { children: any }) => {
//     const [vehicles, setVehicles] = useState<Vehicle[] | []>([]);
//     // const [vehicles, setVehicles] = useState([
//     //     { id: 1, name: 'Toyota Corolla' },
//     //     { id: 2, name: 'Ford Mustang' }
//     // ]);
//
//     const addVehicle = (vehicle: any) => {
//         // setVehicles(prev => [...prev, { id: Date.now(), ...vehicle }]);
//         setVehicles((prev: any[]) => [...prev, vehicle]);
//     };
//
//     return (
//         <VehicleContext.Provider value={{ vehicles, addVehicle }}>
//             {children}
//         </VehicleContext.Provider>
//     );
// };
//
// export const useVehicles = () => useContext(VehicleContext);
