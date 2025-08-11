export interface HttpResponse {
    statusCode: number;
    message: string;
    [key: string]: unknown; 
  }