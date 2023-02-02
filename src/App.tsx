import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const [pictures, setPictures] = useState<any>();
  const [accessToken, setAccessToken] = useState<any>('');
  const [isLoggedin, setIsLoggedin] = useState(false);

  const onLoginClick = () => {
    window.FB.login();
  };
  const getUserData = () => {
    fetch(
      `https://graph.facebook.com/v15.0/17957962531387130?fields=id,owner,media_type,media_url,timestamp&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPictures(data.data);
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
        if (response.status !== 'connected') {
          setIsLoggedin(false);
          setAccessToken(response.authResponse.accessToken);
          getUserData();
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
    <div className="App bg-slate-400">
      <header>Mi app de Instagram</header>
      <div>
        {isLoggedin ? null : (
          <button onClick={onLoginClick}>Login with Facebook</button>
        )}
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
