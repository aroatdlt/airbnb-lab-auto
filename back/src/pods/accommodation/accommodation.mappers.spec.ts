import * as model from 'dals';
import * as apiModel from './accommodation.api-model';
import { mapAccommodationFromModelToApi, mapAccommodationListFromModelToApi, mapAccommodationFromApiToModel } from './accommodation.mappers';
import { mockAccommodationsList, resultAccommodationsList } from "../../common/mocks/mock-results"
import { ObjectId } from 'mongodb';

describe('pods/accommodation/accommodation.mappers spec', () => {
  describe('mapAccommodationFromModelToApi', () => {
    it('should return empty array when it feeds accommodationList equals undefined', () => {
      // Arrange
      const accommodationList: model.Accommodation[] = undefined;

      // Act
      const result: apiModel.Accommodation[] = mapAccommodationListFromModelToApi(accommodationList);

      // Assert
      expect(result).toEqual([]);
    });

    it('should return an array with objects when it feeds accommodationList', () => {
      // Arrange
      const accommodationList: model.Accommodation[] = mockAccommodationsList
      
      // Act
      const result: apiModel.Accommodation[] = mapAccommodationListFromModelToApi(accommodationList);

      // Assert
      expect(result).toEqual(resultAccommodationsList)
    })
  });

  describe('mapAccommodationFromModelToApi', () => {
    it("should return an object accommodation with specific keys", () => {
      // Arrange
      const [ accommodation ] = mockAccommodationsList
      const accommodationInfo: model.Accommodation = accommodation
      const [ resultAccommodation ] = resultAccommodationsList

      // Act
      const result: apiModel.Accommodation = mapAccommodationFromModelToApi(accommodationInfo);
     
      // Assert
      expect(result).toEqual(resultAccommodation)
    })
  })

  describe('mapAccommodationFromApiToModel', () => {
    it("should return an object accommodation with new review", () => {
      // Arrange
      const spy = jest.spyOn(global, 'Date');
      
      const review: apiModel.Review = {
        _id: new ObjectId("60c20a334bec6a37b08acec9"), 
        date: new Date(),
        reviewer_name: "Antonio", comments: "La casa era presiosa"
      }

      // Act
      const result: model.Review = mapAccommodationFromApiToModel(review);
      const date = spy.mock.instances[0];
      
      // Assert
      expect(result).toEqual({
        _id: new ObjectId("60c20a334bec6a37b08acec9"), 
        date: {
          $date: {
            $numberLong: date
          }
        },
        reviewer_name: "Antonio",
        comments: "La casa era presiosa",
        listing_id: '',
        reviewer_id: ''
      })
    })
  })
});