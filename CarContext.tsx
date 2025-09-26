import React, { createContext, useContext, useState } from 'react';

interface Car {
  id: string;
  make: string;
  model: string;
  costPerDay: number;
  imageUrl: any;
}

interface Booking {
  car: Car;
  days: number;
  total: number;
}

interface CarContextType {
  cars: Car[];
  addCar: (car: Car) => void;
  booking: Booking | null;
  setBooking: (booking: Booking | null) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCarContext must be used within CarProvider');
  }
  return context;
};

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([
    {
      id: '1',
      make: 'BMW',
      model: 'i Vision Future Interaction Concept',
      costPerDay: 120,
      imageUrl: require('./images/2016-BMW-i-Vision-Future-Interaction-Concept-001-2000-scaled-1-770x1020.jpg'),
    },
    {
      id: '2',
      make: 'Audi',
      model: 'PB18 E-Tron Concept',
      costPerDay: 110,
      imageUrl: require('./images/2018-Audi-PB18-E-Tron-Concept-001-2000-scaled-1-770x1020.jpg'),
    },
    {
      id: '3',
      make: 'BMW',
      model: 'i4 Concept',
      costPerDay: 130,
      imageUrl: require('./images/2020_bmw_i4_concept_1_2560x1440-e1604300899672-1-770x1020.jpg'),
    },
    {
      id: '4',
      make: 'Porsche',
      model: 'Taycan Turbo S',
      costPerDay: 200,
      imageUrl: require('./images/2020_porsche_taycan_turbo_s_4k_4-HD-770x1020.jpg'),
    },
    {
      id: '5',
      make: 'Pininfarina',
      model: 'Battista',
      costPerDay: 350,
      imageUrl: require('./images/2020-Pininfarina-Battista-011-2160-scaled-1-770x1020.jpg'),
    },
    {
      id: '6',
      make: 'Audi',
      model: 'E-Tron GT Quattro',
      costPerDay: 140,
      imageUrl: require('./images/2022-Audi-E-Tron-GT-Quattro-010-2160-770x1020.jpg'),
    },
    {
      id: '7',
      make: 'Audi',
      model: 'RS E-Tron GT',
      costPerDay: 150,
      imageUrl: require('./images/2022-Audi-RS-E-Tron-GT-001-2160-770x1020.jpg'),
    },
    {
      id: '8',
      make: 'Porsche',
      model: 'Taycan 4S Cross Turismo',
      costPerDay: 180,
      imageUrl: require('./images/2022-Porsche-Taycan-4S-Cross-Turismo-001-2160-770x1020.jpg'),
    },
    {
      id: '9',
      make: 'Ford',
      model: 'Mustang Mach-E Rally',
      costPerDay: 100,
      imageUrl: require('./images/2024-Ford-Mustang-Mach-E-Rally-001-2160-770x1020.jpg'),
    },
    {
      id: '10',
      make: 'Ford',
      model: 'RS2.00 Concept',
      costPerDay: 120,
      imageUrl: require('./images/2024-Ford-RS2.00-Concept-001-2160-scaled-1-770x1020.jpg'),
    },
    {
      id: '11',
      make: 'Hyundai',
      model: 'Ioniq 5 N',
      costPerDay: 90,
      imageUrl: require('./images/2024-Hyundai-Ioniq-5-N-003-2160-770x1020.jpg'),
    },
    {
      id: '12',
      make: 'Kia',
      model: 'EV9',
      costPerDay: 95,
      imageUrl: require('./images/2024-Kia-EV9-011-2160-770x1020.jpg'),
    },
    {
      id: '13',
      make: 'Lamborghini',
      model: 'Revuelto Opera Unica',
      costPerDay: 400,
      imageUrl: require('./images/2024-Lamborghini-Revuelto-Opera-Unica-001-2160-scaled-1-770x1020.jpg'),
    },
    {
      id: '14',
      make: 'BMW',
      model: 'Skytop',
      costPerDay: 160,
      imageUrl: require('./images/2025-BMW-Skytop-001-2160-scaled-1-770x1020.jpg'),
    },
    {
      id: '15',
      make: 'Pininfarina',
      model: 'B95',
      costPerDay: 300,
      imageUrl: require('./images/2025-Pininfarina-B95-005-2160-770x1020.jpg'),
    },
    {
      id: '16',
      make: 'Porsche',
      model: '911 Carrera T',
      costPerDay: 220,
      imageUrl: require('./images/2025-Porsche-911-Carrera-T-001-2160-scaled-1-770x1020.jpg'),
    },
    {
      id: '17',
      make: 'Renault',
      model: '5 E-Tech',
      costPerDay: 60,
      imageUrl: require('./images/2025-Renault-5-E-Tech-001-2160-770x1020.jpg'),
    },
    {
      id: '18',
      make: 'Aston Martin',
      model: 'Valhalla',
      costPerDay: 250,
      imageUrl: require('./images/2026-Aston-Martin-Valhalla-006-2160-scaled-1-770x1020.jpg'),
    },
    {
      id: '19',
      make: 'Audi',
      model: 'E-Tron 50 Quattro Sportback S Line',
      costPerDay: 115,
      imageUrl: require('./images/audi_e_tron_50_quattro_sportback_s_line_2020_5k_2-5120x2880-1-scaled-1-770x1020.jpg'),
    },
    {
      id: '20',
      make: 'Tesla',
      model: 'Model S',
      costPerDay: 180,
      imageUrl: require('./images/S24_0064_fine-770x1020.jpg'),
    },
  ]);
  const [booking, setBooking] = useState<Booking | null>(null);

  const addCar = (car: Car) => {
    setCars([...cars, car]);
  };

  return (
    <CarContext.Provider value={{ cars, addCar, booking, setBooking }}>
      {children}
    </CarContext.Provider>
  );
};
