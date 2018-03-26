const fs = require('fs');
const path = require('path');

const inputfolder = path.join(__dirname, 'layers');
const outputfile = path.join(__dirname, '..', 'src', 'datas', 'zones.json');
const targets = ['eso_93.json', 'esu_93.json']
  .map(file => require(path.join(inputfolder, file)))
  .reduce(
    (acc, { features }) =>
      acc.concat(
        ...features.map(feat => ({
          help: '',
          id: feat.properties.Id,
          value: feat.properties.Libel_ZA_ESU || feat.properties.Libel_ZA_ESO,
          geojson: feat.geometry,
        }))
      ),
    []
  );

const json = JSON.stringify(targets, null);
fs.writeFile(outputfile, json, { encoding: 'utf-8' }, () => {});
