type Image = {
  height: number;
  width: number;
  url: string;
};

export type Artist = {
  external_urls: object;
  followers: object | undefined;
  genres: string[] | undefined;
  images: Image[] | undefined;
  popularity: number | undefined;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

type Album = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: object;
  href: string;
  id: string;
  images: object[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: object;
  external_urls: object;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

export type StatObject = {
  href: string;
  items: Track[] | Artist[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
};
