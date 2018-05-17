import area from '@turf/area';
import minBy from 'lodash.minby';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

export const findZoneParentForPoint = (point, zones) => {
  const coords = [].concat(point);
  coords.reverse();
  const founds = zones
    .map(zone => zone.toObject({ virtuals: true }))
    .map(zone =>
      Object.assign({}, zone, {
        geojson: JSON.parse(zone.geojson),
      }))
    .filter(zone => booleanPointInPolygon(coords, zone.geojson))
    .map(zone => Object.assign({}, zone, { area: area(zone.geojson) }));
  return minBy(founds, zone => zone.area);
};

export default findZoneParentForPoint;
