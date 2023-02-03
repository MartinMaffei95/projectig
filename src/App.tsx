import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [pictures, setPictures] = useState<any>();
  const [accessToken, setAccessToken] = useState<any>('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userID, setUserID] = useState<any>('');

  const igLogin = () => {
    `https://www.facebook.com/dialog/oauth?client_id={client-id}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https://projectig.vercel.app/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`;
  };

  const onLoginClick = () => {
    window.FB.login();
  };
  const getUserData = (userID: string, token: string) => {
    fetch(
      `https://graph.facebook.com/v15.0/${userID}?fields=id,first_name,last_name&access_token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setPictures(data.data);
      })
      .catch((err) => console.error(err));
  };
  const getAccountsData = (userID: string, token: string) => {
    fetch(`https://graph.facebook.com//v15.0/me/accounts?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // setPictures(data.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '422187410098220',
        cookie: true,
        xfbml: true,
        version: 'v15.0',
      });

      FB.AppEvents.logPageView();
      FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          setIsLoggedin(true);
          setAccessToken(response.authResponse.accessToken);
          setUserID(response.authResponse.userID);
          getUserData(
            response.authResponse.userID,
            response.authResponse.accessToken
          );
          getAccountsData(
            response.authResponse.userID,
            response.authResponse.accessToken
          );
        }
        console.log(response);
      });
    };

    (function (d, s: any, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  return (
    <div className="App bg-slate-200 p-4">
      <header>Mi app de Instagram</header>
      <div>
        {isLoggedin ? null : (
          <button onClick={onLoginClick}>Login with Facebook</button>
        )}
      </div>
      <a
        className="bg-pink-500 p2 text-white"
        href={`https://www.facebook.com/v16.0/dialog/oauth?client_id=422187410098220&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https://my-clever-redirect-url.com/success/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement`}
      >
        ENTRAR CON IG
      </a>
      <div className="flex flex-wrap w-screen h-screen gap-4 overflow-y-scroll">
        {pictures && pictures.length > 0
          ? pictures.map((p: any) => (
              <div className="w-64 shadow-xl flex flex-col bg-slate-100 rounded overflow-hidden pb-4">
                <div className="overflow-hidden w-full h-80 flex">
                  <img
                    src={p.media_url}
                    alt={p.caption}
                    className=" object-cover"
                  />
                </div>
                <p>{p.caption}</p>
              </div>
            ))
          : 'NO HAY DATOS PARA MOSTRAR'}
      </div>
    </div>
  );
}

export default App;
