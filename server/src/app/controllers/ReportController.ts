import { Request, Response } from 'express';

import { ReportService } from '../services/ReportService';

class ReportController {
  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const reportService = new ReportService();

    const result = await reportService.execute(id);

    return response.json(result);
  }
}

export { ReportController };
