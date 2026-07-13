import { Request, Response } from 'express';
export declare const getSavedItems: (req: Request, res: Response) => Promise<void>;
export declare const saveItem: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const unsaveItem: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=savedController.d.ts.map