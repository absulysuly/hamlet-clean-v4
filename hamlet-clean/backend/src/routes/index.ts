import { Router } from 'express';
import * as healthController from '../controllers/health';
import * as candidatesController from '../controllers/candidates';
import * as governoratesController from '../controllers/governorates';
import * as usersController from '../controllers/users';
import * as eventsController from '../controllers/events';

const router = Router();

// Health check
router.get('/health', healthController.getHealth);

// Candidates
router.get('/candidates', candidatesController.getAllCandidates);
router.get('/candidates/:id', candidatesController.getCandidateById);
router.get('/candidates/governorate/:governorate', candidatesController.getCandidatesByGovernorate);
router.get('/candidates/search', candidatesController.searchCandidates);

// Governorates
router.get('/governorates', governoratesController.getAllGovernorates);

// Users
router.get('/users', usersController.getAllUsers);

// Events
router.get('/events', eventsController.getAllEvents);

export default router;
