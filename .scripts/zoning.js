const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');

const inputfolder = path.join(__dirname, 'layers');
const outputfile = path.join(__dirname, '..', 'src', 'datas', 'zones.json');
const targets = ['eso_93.json', 'esu_93.json']
  .map(file => require(path.join(inputfolder, file)))
  .reduce(
    (acc, { features }) =>
      acc.concat(
        ...features.map(feat => ({
          help: '',
          id: uuidv1(),
          geojson: feat.geometry,
          value: feat.properties.Libel_ZA_ESU || feat.properties.Libel_ZA_ESO,
        }))
      ),
    []
  );

const json = JSON.stringify(targets, null);
fs.writeFile(outputfile, json, { encoding: 'utf-8' }, () => {});
