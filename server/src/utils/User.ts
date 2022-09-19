import axios from "axios";
import {
  urlToGetLinkedInAccessToken,
  urlToGetUserEmail,
  urlToGetUserProfile,
} from "./profileDetailsUrl";
import query from "query-string";

let started: boolean = false;
export async function getUserData(code: string) {
  if (!started) {
    started = true;
    // @ts-ignore
    let accessToken: string;
    let mail: string;
    let user: object;
    await axios
      .post(
        urlToGetLinkedInAccessToken,
        query.stringify({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: process.env.REDIRECT_URI,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      )
      .then((res) => {
        accessToken = res.data["access_token"];
        console.log("\n\n"+accessToken+"\n\n");
        return axios
          .get(urlToGetUserEmail, {
            headers: {
              //@ts-ignore
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res2) => {
            mail = res2.data.elements[0]["handle~"].emailAddress;
            return axios
              .get(urlToGetUserProfile, {
                headers: {
                  //@ts-ignore
                  Authorization: `Bearer ${accessToken}`,
                },
              })
              .then((res3) => {
                let firstName = res3.data.localizedFirstName;
                let lastName = res3.data.localizedLastName;
                let id = res3.data.id;
                let profile =
                  res3.data.profilePicture["displayImage~"].elements[0][
                    "identifiers"
                  ][0]["identifier"];
                user = {
                  id,
                  firstName,
                  lastName,
                  email: mail,
                  profileURL: profile,
                };
              });
          });
      })
      .catch((er) => {
        console.log(er);
      });
    started = false;
    return user;
  }
}
