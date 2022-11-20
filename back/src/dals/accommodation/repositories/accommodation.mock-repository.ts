import { AccommodationRepository } from "./accommodations.repository";
import { Accommodation, Review } from "../accommodation.model";
import { db } from "../../mock-data";
import { ObjectId } from "mongodb";


const paginateAccommodationList = (
  accommodationList: Accommodation[],
  page: number,
  pageSize: number
): Accommodation[] => {
  let paginatedAccommodationList = [...accommodationList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedAccommodationList.length);
    paginatedAccommodationList = paginatedAccommodationList.slice(startIndex, endIndex);
  }
  
  return paginatedAccommodationList;
};

export const mockRepository: AccommodationRepository = {
  getAccommodationsListByCountry: async (country, page?: number, pageSize?: number) => {
   const dbFilteredAccommodations = db.accommodations.filter(accommodation => {
      if(accommodation.address.country === country){
        return accommodation
      }
    })
    return dbFilteredAccommodations.length === 0 ? paginateAccommodationList(db.accommodations, page, pageSize) : paginateAccommodationList(dbFilteredAccommodations, page, pageSize)
  },
  getAccommodationById: async (id: string) => {
    return db.accommodations.find((accommodation) => accommodation._id.toString() === id)
  },
  insertReview: async (id: string, review: Review) => {
    const _id = new ObjectId(id);
    const reviewWithId = {
      ...review,
      _id
    }
    const insertReview = db.accommodations.map((accommodation) => {
      accommodation._id.toString() === id ? accommodation.reviews.push(reviewWithId) : accommodation
      return accommodation
    })

    return insertReview.find(accommodation => accommodation._id.toString() === id)
  },
};