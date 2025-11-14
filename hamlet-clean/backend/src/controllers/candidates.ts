import { Request, Response } from 'express';
import * as candidatesService from '../services/candidates';

export const getAllCandidates = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    
    const result = await candidatesService.getAllCandidates(page, limit);
    
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Get all candidates error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch candidates',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCandidateById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        error: 'Invalid candidate ID'
      });
      return;
    }
    
    const candidate = await candidatesService.getCandidateById(id);
    
    if (!candidate) {
      res.status(404).json({
        success: false,
        error: 'Candidate not found'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      candidate
    });
  } catch (error) {
    console.error('Get candidate by ID error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch candidate',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getCandidatesByGovernorate = async (req: Request, res: Response): Promise<void> => {
  try {
    const { governorate } = req.params;
    
    const candidates = await candidatesService.getCandidatesByGovernorate(governorate);
    
    res.status(200).json({
      success: true,
      governorate,
      count: candidates.length,
      candidates
    });
  } catch (error) {
    console.error('Get candidates by governorate error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch candidates by governorate',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const searchCandidates = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string || '';
    const governorate = req.query.governorate as string;
    const alliance = req.query.alliance as string;
    
    const candidates = await candidatesService.searchCandidates(query, governorate, alliance);
    
    res.status(200).json({
      success: true,
      query,
      count: candidates.length,
      candidates
    });
  } catch (error) {
    console.error('Search candidates error:', error);
    res.status(500).json({
      success: false,
      error: 'Search failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
