import * as IMAGES from './images';

const getImages = id => {
    let station, cover;
    let ref = id.split('_')[0];
    cover = IMAGES[ref][id].cover;
    if (ref === 'song') {
        return {
            cover
        }
    } else if (ref === 'live' || ref === 'result' || ref === 'recom' || ref === 'topTimefree' || ref === 'topLive' || ref === 'otherArea') {
        station = IMAGES[ref][id].station;
    } else {
        station = IMAGES[ref].station;
    }
    return {
        station,
        cover
    }
}

export default getImages;