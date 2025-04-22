import { createContext, useContext, useState, ReactNode } from 'react';
import { Vehicle } from "../models/models.tsx";

interface VehicleContextType {
    vehicles: Vehicle[];
    fleetMileage: number;
    updateFleetMileage: (value: number) => void;
    fleetMonthlyCost: number;
    updateFleetMonthlyCost: (value: number) => void;
    addVehicle: (vehicle: Vehicle) => void;
    loadVehicles: (vehicle: Vehicle[]) => void;
}

const VehicleContext = createContext<VehicleContextType | null>(null);

export const VehicleProvider = ({ children }: { children: ReactNode }) => {
    const [vehicles, setVehicles] = useState<Vehicle[] | []>([]);
    const [fleetMileage, setFleetMileage] = useState<number>(0);
    const [fleetMonthlyCost, setFleetMonthlyCost] = useState<number>(0);

    const addVehicle: any = (vehicle: any) => {
        setVehicles((prev: any[]) => [...prev, vehicle]);
    };

    const updateFleetMileage = (value: number) => {
        setFleetMileage(value);
    }

    const updateFleetMonthlyCost = (value: number) => {
        setFleetMonthlyCost(value);
    }

    const loadVehicles = (vehicles: Vehicle[]) => {
        setVehicles(vehicles);
    };

    return (
        <VehicleContext.Provider value={{ vehicles, fleetMileage, fleetMonthlyCost, updateFleetMileage, updateFleetMonthlyCost, addVehicle, loadVehicles }}>
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
