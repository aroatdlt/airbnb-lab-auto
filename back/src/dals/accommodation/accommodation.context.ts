import { db } from 'core/servers';
import { Accommodation } from './accommodation.model';

export const getAccommodationContext = () => db?.collection<Accommodation>("listingsAndReviews");