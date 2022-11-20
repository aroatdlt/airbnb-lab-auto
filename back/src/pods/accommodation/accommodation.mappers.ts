import * as model from "dals";
import * as apiModel from "./accommodation.api-model";
import { ObjectId } from "mongodb"

const lastFiveReviews = (reviews: model.Review[]) => {
  const sortedReviews = reviews.sort((a: model.Review, b: model.Review) => new Date((b.date).toString()).getTime() - new Date((a.date).toString()).getTime());
  return sortedReviews.slice(Math.max(sortedReviews.length - 5, 1))
} 

export const mapAccommodationFromModelToApi = (accommodation: model.Accommodation): apiModel.Accommodation => ({
  _id: accommodation._id,
  name: accommodation.name,
  description: accommodation.description,
  bedrooms: accommodation.bedrooms,
  bathrooms: Number(accommodation.bathrooms),
  beds: accommodation.beds,
  address: {
    country: accommodation.address.country,
    street: accommodation.address.street
  },
  image: accommodation.images.picture_url,
  reviews: lastFiveReviews(accommodation.reviews).map((review: model.Review): apiModel.Review => {
    return {
      _id: review._id, 
      date: review.date?.$date?.$numberLong,
      reviewer_name: review.reviewer_name,
      comments: review.comments
    }
  })
});

export const mapAccommodationFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: new ObjectId(review._id), 
  date: {
    $date: {
      $numberLong: new Date()
    }
  },
  reviewer_name: review.reviewer_name,
  comments: review.comments,
  listing_id: '',
  reviewer_id: ''
});

export const mapAccommodationListFromModelToApi = (
  accommodationList: model.Accommodation[]
): apiModel.Accommodation[] => Array.isArray(accommodationList) 
? accommodationList.map(mapAccommodationFromModelToApi)
: [];