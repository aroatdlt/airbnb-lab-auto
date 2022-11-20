import { ObjectId } from "mongodb";

export interface Accommodation {
  _id: string,
  listing_url: string,
  name: string,
  summary: string,
  space: string,
  description: string,
  neighborhood_overview: string,
  notes: string,
  transit: string,
  access: string,
  interaction: string,
  house_rules: string,
  property_type: string,
  room_type: string,
  bed_type: string,
  minimum_nights: string,
  maximum_nights: string,
  cancellation_policy: string,
  calendar_last_scraped: object,
  first_review?: object,
  last_review?: object,
  last_scraped: object,
  accommodates: number
  bedrooms: number,
  bathrooms: number,
  beds: number,
  number_of_reviews: number,
  amenities: Array<string>,
  price: object,
  security_deposit?: object,
  cleaning_fee: object,
  extra_people: object,
  guests_included: object,
  address: Address,
  host: object,
  images: Image,
  reviews: Reviews,
  availability: object,
  review_scores: object,
  weekly_price?: object,
  monthly_price?: object,
}

export interface Reviews extends Array<Review>{}

export interface Review {
  _id: ObjectId,
  date: CustomDate,
  reviewer_name: string,
  comments: string,
  listing_id: string,
  reviewer_id: string,
}

interface Address {
  country: string,
  street: string,
  suburb: string,
  government_area: string,
  market: string,
  country_code: string,
  location: { 
    type: string,
    coordinates: number[],
    is_location_exact: boolean
  } 
}

interface Image {
  thumbnail_url: string,
  medium_url: string, 
  picture_url: string, 
  xl_picture_url: string
}

interface CustomDate {
 $date: {
  $numberLong: Date
 }
}