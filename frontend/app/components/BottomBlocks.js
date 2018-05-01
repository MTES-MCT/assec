import React from 'react';

import Person from './person/Person';

const BottomBlocks = () => (
  <div id="bottom-blocks"
    className="flex-columns flex-between padded pt80 pb120">
    <div id="whoweare" className="block">
      <h3 className="mt40 mb40">
        <span>Qui sommes nous ?</span>
        <hr className="liner mt12" />
      </h3>
      <ul>
        <li className="person flex-columns mt20">
          <Person firstname="Michel"
            lastname="Perrel"
            jobtitle="Intrapreneur"
            quote="Aider le monde agricole à s'adapter aux épisodes de
          sécheresse"
            avatar="https://avatars1.githubusercontent.com/u/34424209?s=400&u=ed4fc31733a5e6e3ec3cd2396701812d0c33e801&v=4" />
        </li>
        <li className="person flex-columns mt20">
          <Person firstname="Matthieu"
            lastname="Lassalvy"
            jobtitle="Développeur"
            quote="Coder le service public de demain"
            avatar="https://media.licdn.com/dms/image/C4E03AQHVKhxSdkT_uw/profile-displayphoto-shrink_200_200/0?e=1530334800&v=beta&t=I1mt-m7aWKFLfy6S-Ls095wHumz6OHMPqBNIKFZiAn8"
            socials={[
              {
                type: 'twitter',
                url: 'https://twitter.com/sixertoy',
              },
              {
                type: 'linkedin',
                url: 'https://www.linkedin.com/in/mlassalvy',
              },
              {
                type: 'github',
                url: 'https://github.com/sixertoy',
              },
            ]} />
        </li>
        <li className="person flex-columns mt20">
          <Person firstname="Julien"
            lastname="Dreher"
            jobtitle="Coach"
            quote="Coach qui aide à comprendre la logique des réseaux"
            avatar="https://pbs.twimg.com/profile_images/791311471900762113/kMVrT4Q8_400x400.jpg"
            socials={[
              {
                type: 'twitter',
                url: 'https://twitter.com/juliendreher',
              },
              {
                type: 'linkedin',
                url: 'https://www.linkedin.com/in/julien-dreher-a81a5010',
              },
              {
                type: 'home',
                url: 'http://www.frontierlab.co',
              },
            ]} />
        </li>
      </ul>
    </div>
    <div className="block">
      <h3 className="mt40 mb40">
        <span>Nous contacter</span>
        <hr className="liner mt12" />
      </h3>
      <p>
        Donec pellentesque elementum tellus, et dignissim dolor viverra id.
        Suspendisse nibh ligula, dictum et lobortis non, elementum id nibh.
        Etiam fermentum commodo lacinia. Duis gravida est vitae sagittis
        tincidunt. Sed id sollicitudin tortor. Aliquam erat volutpat. Curabitur
        volutpat a nunc ut euismod. Nullam facilisis dignissim posuere. Duis
        vitae urna in sem suscipit semper. Morbi venenatis a lacus quis luctus.
        Ut neque erat, rhoncus ac eleifend at, semper in neque.
      </p>
    </div>
    <div className="block">
      <h3 className="mt40 mb40">
        <span>A definir...</span>
        <hr className="liner mt12" />
      </h3>
      <p>
        Donec pellentesque elementum tellus, et dignissim dolor viverra id.
        Suspendisse nibh ligula, dictum et lobortis non, elementum id nibh.
        Etiam fermentum commodo lacinia. Duis gravida est vitae sagittis
        tincidunt. Sed id sollicitudin tortor. Aliquam erat volutpat. Curabitur
        volutpat a nunc ut euismod. Nullam facilisis dignissim posuere. Duis
        vitae urna in sem suscipit semper. Morbi venenatis a lacus quis luctus.
        Ut neque erat, rhoncus ac eleifend at, semper in neque.
      </p>
    </div>
  </div>
);
BottomBlocks.propTypes = {};
export default BottomBlocks;
