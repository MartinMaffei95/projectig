import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [pictures, setPictures] = useState<any>();
  const [accessToken, setAccessToken] = useState<any>('');
  const [IGToken, setIGToken] = useState<any>('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userID, setUserID] = useState<any>('');
  const [userData, setUserData] = useState<any>();

  const [url, setUrl] = useState<any>('');
  const getURL = () => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('IG: ', data);
        setUserData(data);
      })
      .catch((err) => console.error(err));
  };

  const getIGuserdata = (userID: string, token: string) => {
    // `https://graph.facebook.com/${userID}?fields=profile_picture_url%2Cusername%2Cname&access_token=${token}`;
    //www.facebook.com/dialog/oauth?client_id=$422187410098220&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https://projectig.vercel.app/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement
    ('asset_id=103540885991148&business_id=910034690412464');
    // https://graph.facebook.com/v16.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=
    fetch(`https://graph.facebook.com/v16.0/me/accounts?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('IG: ', data);
        // setPictures(data.data);
      })
      .catch((err) => console.error(err));
  };

  const onLoginClick = () => {
    window.FB.login(
      function (response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          FB.api('/me', function (response) {
            // console.log('Good to see you, ' + response + '.');
            console.log('res of FBAPI:', response);
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      {
        scope: 'email,user_hometown,user_likes,user_gender',
        return_scopes: true,
      }
    );
  };
  const getUserData = (userID: string, token: string) => {
    fetch(
      `https://graph.facebook.com/v15.0/${userID}?fields=id,first_name,last_name,email&access_token=${token}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('FB user: ', data);
        // setPictures(data.data);
      })
      .catch((err) => console.error(err));
  };
  const getAccountsData = (userID: string, token: string) => {
    fetch(`https://graph.facebook.com/v15.0/me/accounts?access_token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cuentas del user: ', data);
        // setPictures(data.data);
      })
      .catch((err) => console.error(err));
  };

  const getMyProfileIG = () => {
    // `https://graph.facebook.com/${userID}?fields=profile_picture_url%2Cusername%2Cname&access_token=${token}`;
    //www.facebook.com/dialog/oauth?client_id=$422187410098220&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https://projectig.vercel.app/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement
    // ('asset_id=103540885991148&business_id=910034690412464');
    // https://graph.facebook.com/v16.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=

    // `https://graph.instagram.com/v16.0/${userData?.id}?fields=id,username&access_token=${IGToken}`;
    //
    fetch(
      `https://graph.facebook.com/${userData?.id}?fields=profile_picture_url%2Cusername%2Cname&access_token=${IGToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('IG: ', data);
        setUserData(data);
      })
      .catch((err) => console.error(err));
  };

  const logOut = () => {
    window?.FB?.logout((res) => {
      console.log(res);
    });
    setIsLoggedin(false);
  };

  const getMsgs = () => {
    /* make the API call */
    window?.FB.api('/100090086917275/conversations', function (response: any) {
      if (response && !response.error) {
        /* handle the result */
        console.log(response);
      }
    });
  };
  const testdata = () => {
    fetch(`https://graph.facebook.com/v16.0/me/?access_token=${IGToken}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('cuenta: ', data);
        setUserData(data);
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

      // get our login status for render buttons and actions
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
          getIGuserdata(
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
    setIGToken(getTokenString(window.location.href));

    IGToken;
  }, []);

  const getTokenString = (href: string) => {
    let arrOfString = href.split('long_lived_token=');
    return arrOfString[1];
  };
  return (
    <div className="App bg-slate-200 p-4">
      <header>Mi app de Instagram</header>
      <div>
        {isLoggedin ? (
          <button className="bg-red-400" onClick={() => logOut()}>
            CERRAR SEESISON
          </button>
        ) : (
          <button className="bg-blue-500 p2 text-white" onClick={onLoginClick}>
            Login with Facebook
          </button>
        )}
      </div>
      <button onClick={getMsgs}>getMsgs</button>
      <div className="flex flex-col">
        <a
          // instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement
          className="bg-pink-500 p2 text-white"
          href={`https://www.facebook.com/v16.0/dialog/oauth?client_id=422187410098220&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=https://projectig.vercel.app/&response_type=token&scope=pages_show_list `}
        >
          ENTRAR CON IG
        </a>
        <a
          className="bg-blue-500 p2 text-white"
          href={`https://www.facebook.com/v16.0/dialog/oauth?client_id=422187410098220&redirect_uri=https://projectig.vercel.app/&state={"{st=state123abc,ds=123456789}"}`}
        >
          ENTRAR CON FB
        </a>
      </div>
      <button className="bg-green-500 p2 text-white" onClick={testdata}>
        DATAAA
      </button>

      <button className="bg-rose-500 p2 text-white" onClick={getMyProfileIG}>
        DATAAA
      </button>

      <input
        onChange={(e) => {
          setUrl(e.target.value);
        }}
        value={url}
      />
      <button className="bg-orange-500 p4 text-white" onClick={getURL}>
        URL PERSONALIZADA
      </button>

      <div className="flex flex-col mt-4 overflow-scroll bg-slate-600 text-white">
        <p>accessToken: {accessToken}</p>
        <p>IGToken: {IGToken}</p>
        <p>isLoggedin: {isLoggedin}</p>
        <p>userID: {userID}</p>
        <p>userData: {userData}</p>
        <p>url: {url}</p>
      </div>
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
