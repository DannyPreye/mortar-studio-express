import { Request, Response, NextFunction } from 'express';
import { RouteManager } from './routes.js';

export class DynamicRouter {
  private routeManager: RouteManager;

  constructor() {
    this.routeManager = new RouteManager();
  }

  public middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const route = this.routeManager.findRoute(req.path);
      
      if (!route) {
        return next();
      }

      const params = this.routeManager.extractParams(route, req.path);
      req.params = { ...req.params, ...params };

      res.locals.currentPath = req.path;
      res.locals.params = params;

      try {
        res.render(route.template);
      } catch (error) {
        console.error(`Error rendering template ${route.template}:`, error);
        next();
      }
    };
  }

  public refreshRoutes() {
    this.routeManager.refreshRoutes();
  }

  public getRoutes() {
    return this.routeManager.getRoutes();
  }
}
