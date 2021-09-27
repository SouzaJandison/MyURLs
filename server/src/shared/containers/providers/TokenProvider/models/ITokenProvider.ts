export interface ITokenProvider {
  verifyToken(value: string): string;
  generateToken(value: string): string;
}
