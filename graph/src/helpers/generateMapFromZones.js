import bbox from '@turf/bbox';
import center from '@turf/center';
import dissolve from 'geojson-dissolve';
import cleanCoords from '@turf/clean-coords';
import transformScale from '@turf/transform-scale';

export const generateMapFromZones = (zones) => {
  const merged = dissolve(zones
    .map((obj) => {
      const parsed = JSON.parse(obj.geojson);
      // FIXME -> c'est quoi la différence entre polygon et multipolygon
      if (parsed.type === 'Polygon') return false;
      return parsed;
    })
    .filter(v => v));
  const zone = cleanCoords(merged, { mutate: true });
  const scaled = transformScale(zone, 1.5);
  const zonecenter = center(zone);
  const maxbounds = bbox(scaled);
  return {
    zone,
    maxbounds: [
      [maxbounds[0], maxbounds[1]].reverse(),
      [maxbounds[2], maxbounds[3]].reverse(),
    ].reverse(),
    center: zonecenter.geometry.coordinates.reverse(),
  };
};

export default generateMapFromZones;
