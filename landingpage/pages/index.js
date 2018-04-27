import React from 'react';
import Head from 'next/head';
import withRedux from 'next-redux-wrapper';

// application
import './../scss/styles.scss';
import configure from './../app/store';

const App = () => (
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="/_next/static/style.css" />
    </Head>
    <div id="page-header">
      <h1>It Works!</h1>
    </div>
    <div id="page-body">
      <div id="lames">
        <div id="lame-newsletter">
          <p>
            Service aux irrigants Vous êtes agriculteur ? Vous craignez pour
            votre activité en cas de sécheresse ? Nous voulons vous aider à
            anticiper et gérer la sécheresse pour minimiser l&apos;impact
            économique sur votre activité. Nous avons besoin de vous pour
            concevoir un service qui réponde à vos attentes. Laissez-nous vos
            coordonnées !
          </p>
          <form onSubmit={() => {}}>
            <input type="text" name="mon_agriculteur" />
            <button type="submit">
              <span>Rester informé</span>
            </button>
          </form>
        </div>
        <div id="lame-que-faisons-nous">
          <p>
            Que faisons nous ? Nous développons des solutions pour améliorer la
            réponse au problème de pénurie d&apos;eau lors d&apos;épisodes de
            sécheresse. Nous travaillons actuellement sur la vallée de
            l&apos;Asse dans les Alpes-de-haute-Provence. Vous êtes agriculteur
            sur ce territoire ? Nous avons besoin de vous pour développer un
            service utile.
          </p>
        </div>
      </div>
    </div>
    <div id="page-footer">
      <h1>It Works!</h1>
    </div>
  </div>
);

export default withRedux(configure)(App);
