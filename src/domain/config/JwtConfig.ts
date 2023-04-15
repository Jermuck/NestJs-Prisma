export const JwtConfig = {
  accessToken: {
    secret: "ac-secret",
    expIn: 60 * 60 * 60 * 24
  },
  refreshToken: {
    secret: "rf-secret",
    expIn: 60 * 60 * 60 * 24 * 7
  }
};
