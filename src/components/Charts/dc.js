import dc from 'dc';
import L from 'leaflet';
import 'leaflet.markercluster';
import _dc from 'dc-addons';
L.Icon.Default.imagePath = 'images';
export default _dc(dc, L);
