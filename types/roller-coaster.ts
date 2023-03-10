import RollerCoasterPicture from './roller-coaster-picture';
import RollerCoasterStats from './roller-coaster-stats';

export default interface RollerCoaster {
  id: number;
  name: string;
  park: {
    name: string;
    id: number;
  }
  city: string;
  state: string;
  region: string;
  status: {
    state: string;
    date: string;
  };
  country: string;
  link: string;
  make: string;
  model: string;
  type: string;
  design: string;
  stats?: RollerCoasterStats;
  mainPicture: RollerCoasterPicture | undefined;
  pictures: RollerCoasterPicture[];
  coords: {
    lat: string | undefined;
    lng: string | undefined;
  };
}
