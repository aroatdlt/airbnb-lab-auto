import { Router } from "express";
import { accommodationRepository } from "dals";
import { mapAccommodationFromModelToApi, mapAccommodationListFromModelToApi, mapAccommodationFromApiToModel } from "./accommodation.mappers";

export const accommodationsApi = Router();

accommodationsApi 
  .get("/", async (req, res, next) => { 
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const selectedCountry = req.query.country as string;
      let accommodationsListByCountry = await accommodationRepository.getAccommodationsListByCountry(selectedCountry, page, pageSize);
      res.send(mapAccommodationListFromModelToApi(accommodationsListByCountry));
    } catch (error) {
      next(error);
    }
  })
  .get("/:id", async (req, res, next) => { //Alojamiento por casa
    try {
      const { id } = req.params;
      const accommodation = await accommodationRepository.getAccommodationById(id);
      res.send(mapAccommodationFromModelToApi(accommodation));
    } catch (error){
      next(error)
    }
  })
  .put("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      if (await accommodationRepository.getAccommodationById(id)) {
        const review = mapAccommodationFromApiToModel(req.body);
        const newReview = await accommodationRepository.insertReview(id, review);
        res.status(201).send(mapAccommodationFromModelToApi(newReview));
      } else {
        res.sendStatus(404);
      }
    } catch(error) {
      next(error)
    }
  });


  