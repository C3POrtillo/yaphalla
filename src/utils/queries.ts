import { defineQuery } from 'next-sanity';

export const SLUG_QUERY = defineQuery(`*[_type == "page" && slug.current != "home"]{
  slug
}`);

export const PAGE_QUERY = defineQuery(`*[_type == "page" && slug.current == $slug]{
  _id,
  title,
  slug,
  description,
  content,
  isFile,
}`);

export const LOGO_QUERY = defineQuery(`*[_type == "brand" && brand == "Cam"]{
  _id,
  brand,
  fullLogo,
  icon
}`);

export const SOCIAL_QUERY = defineQuery(`*[_type == "socialMedia"]{
  _id,
  type,
  link,
  label,
  hide,
}`);

export const CTA_QUERY = defineQuery(`*[_type == "cta"]{
  _id,
  label,
  link,
  hierarchy,
  image,
  icon,
}`);

export const TAGS_QUERY = defineQuery(`*[_type == "skill"]{
  _id,
  skill,
  image,
}`);

export const HEADER_QUERY = defineQuery(`*[_type == "header"]{
  navigation[]{
    _key, 
    ...@->{
      _id,
      label,
      link,
      image,
      sublinks[]{
        _key,
        ...@->{
          _id,
          label,
          link,
          image,
        }
      }
    }
  }
}`);
