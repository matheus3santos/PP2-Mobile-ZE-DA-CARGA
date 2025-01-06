import type {RideItem} from '../../types/rideItem';

type Section = {
  title: String;
  data: RideItem[];
};

export const ridesData: Section[] = [
  {
    title: 'Recommended',
    data: [
      {
        id: '1',
        type: 'UberX',
        maxPassengers: 4,
        price: {
          perKm: 0.8,
          perMinute: 0.5,
          currency: '$',
        },
        eta: 5,
        description: 'Good cars, good prices',
      },
      {
        id: '2',
        type: 'Van',
        maxPassengers: 8,
        price: {
          perKm: 1.2,
          perMinute: 0.7,
          currency: '$',
        },
        eta: 8,
        description: 'Good cars, good prices',
      },
      {
        id: '3',
        type: 'Comfort',
        maxPassengers: 4,
        price: {
          perKm: 1,
          perMinute: 0.6,
          currency: '$',
        },
        eta: 6,
        description: 'Good cars, good prices',
      },
    ],
  },

];