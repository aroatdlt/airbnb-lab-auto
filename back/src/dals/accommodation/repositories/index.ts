import { mockRepository } from "./accommodation.mock-repository";
import { dbRepository } from "./accommodation.db-repository";
import { envConstants } from "core/constants";

export const accommodationRepository = envConstants.isApiMock ? mockRepository : dbRepository;