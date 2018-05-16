import pick from 'lodash.pick';

export const transformZoneToSituation = (zones) => {
  // transforme une zone pour etre exploitable par le widget
  // inclus dans cette zone la situation correspondante
  const parsed = zones.map((obj) => {
    const zone = obj.toObject({ virtuals: true });
    const extras = pick(zone, [
      'name',
      'order',
      'geojson',
      'shortname',
      'description',
    ]);
    const base = pick(zone.alerte.situation, ['id', 'label']);
    return Object.assign({}, base, extras, { zoneid: zone.id });
  });
  return parsed;
};

export default transformZoneToSituation;
