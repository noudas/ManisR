export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};

const ApiTypes = {};

export default ApiTypes;
