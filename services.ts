
import { mockTrackingData } from './data';
import type { Shipment } from './types';

/**
 * Simulates fetching shipment tracking data from an API.
 * @param awbs - A comma-separated string of Air Waybill numbers.
 * @returns A promise that resolves to an array of Shipment objects or null if no valid AWBs are found.
 */
export const fetchTrackingData = (awbs: string): Promise<Shipment[] | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const awbList = awbs.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
      if (awbList.length === 0) {
        resolve(null);
        return;
      }
      
      const results = mockTrackingData.filter(shipment => awbList.includes(shipment.awb.toUpperCase()));
      
      resolve(results.length > 0 ? results : []);
    }, 1000); // Simulate network delay
  });
};
