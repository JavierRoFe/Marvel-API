
export interface RespuestaCharacter {
    code: string;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: DataCharacter;
    etag: string;
}

export interface DataCharacter {
    offset: string;
    limit: string;
    total: string;
    count: string;
    results: ResultCharacter[];
}

export interface ResultCharacter {
    id: string;
    name: string;
    description: string;
    modified: string;
    resourceURI: string;
    urls: Url[];
    thumbnail: Thumbnail;
    comics: Comics;
    stories: Stories;
    events: Comics;
    series: Comics;
}

export interface Stories {
    available: string;
    returned: string;
    collectionURI: string;
    items: Item2[];
}

export interface Item2 {
    resourceURI: string;
    name: string;
    type: string;
}

export interface Comics {
    available: string;
    returned: string;
    collectionURI: string;
    items: Item[];
}

export interface Item {
    resourceURI: string;
    name: string;
}

export interface Thumbnail {
    path: string;
    extension: string;
}

export interface Url {
    type: string;
    url: string;
}

export interface RespuestaComic {
    code: string;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: DataComic;
    etag: string;
}

export interface DataComic {
  offset: string;
  limit: string;
  total: string;
  count: string;
  results: ResultComic[];
}

export interface ResultComic {
  id: string;
  digitalId: string;
  title: string;
  issueNumber: string;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: string;
  textObjects: TextObject[];
  resourceURI: string;
  urls: Url[];
  series: Series;
  variants: Series[];
  collections: Series[];
  collectedIssues: Series[];
  dates: Date[];
  prices: Price[];
  thumbnail: Thumbnail;
  images: Thumbnail[];
  creators: Creators;
  characters: Creators;
  stories: Stories;
  events: Events;
}

export interface Events {
  available: string;
  returned: string;
  collectionURI: string;
  items: Series[];
}

export interface Creators {
  available: string;
  returned: string;
  collectionURI: string;
  items: Item[];
}

export interface Price {
  type: string;
  price: string;
}

export interface Date {
  type: string;
  date: string;
}

export interface Series {
  resourceURI: string;
  name: string;
}

export interface TextObject {
  type: string;
  language: string;
  text: string;
}