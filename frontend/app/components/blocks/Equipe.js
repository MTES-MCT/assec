import React from 'react';

import Person from './../ui/Person';

const Equipe = () => (
  <div id="notre-equipe" className="col-left block flex-1 mr40">
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
    </ul>
  </div>
);
export default Equipe;
