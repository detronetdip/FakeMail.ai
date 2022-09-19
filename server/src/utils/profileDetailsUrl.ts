export const urlToGetLinkedInAccessToken =
  "https://www.linkedin.com/oauth/v2/accessToken";
export const urlToGetUserProfile =
  "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))";
export const urlToGetUserEmail =
  "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))";
