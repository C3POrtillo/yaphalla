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

export const LOGO_QUERY = defineQuery(`*[_type == "brand" && brand == "Yaphalla"]{
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

export const ALL_HERO_QUERY = defineQuery(`*[_type == "unit" && type == "hero"]{
  _id,
  name,
  faction->{
    _id,
    "name": faction,
    image
  },
  class->{
    _id,
    "name": class,
    image
  },
  hex,
  portrait,
} | order(
  faction.faction asc, 
  class.class asc, 
  name asc
)`);

export const ALL_WILDCARD_QUERY = defineQuery(`*[_type == "unit" && type == "wildcard"]{
  _id,
  name,
  faction->{
    _id,
    "name": faction,
    image
  },
  class->{
    _id,
    "name": class,
    image
  },
  hex,
} | order(
  faction.faction asc, 
  class.class asc, 
  name asc
)`);

export const ALL_MISC_QUERY = defineQuery(`*[_type == "unit" && type == "misc"]{
  _id,
  name,
  class->{
    _id,
    "name": class,
    image
  },
  hex,
} | order(
  class.class asc, 
  name asc
)`);

export const ALL_PHANTIMAL_QUERY = defineQuery(`*[_type == "unit" && type == "phantimal"]{
  _id,
  name,
  faction->{
    _id,
    "name": faction,
    image
  },
  class->{
    _id,
    "name": class,
    image
  },
  hex,
} | order(
  faction.faction asc, 
  name asc
)`);

export const ALL_BOSS_QUERY = defineQuery(`*[_type == "unit" && type == "boss"]{
  _id,
  name,
  class->{
    _id,
    "name": class,
    image
  },
  hex,
} | order(
  name asc
)`);

export const ALL_CLASS_QUERY = defineQuery(`*[_type == "class"]{
  _id,
  "name": class,
  image,
}`);

export const ALL_FACTION_QUERY = defineQuery(`*[_type == "faction"]{
  _id,
  "name": faction,
  image,
}`);

export const ALL_TIER_QUERY = defineQuery(`*[_type == "tier"]{
  _id,
  "name": tier,
  image,
}`);

export const ALL_DAMAGE_QUERY = defineQuery(`*[_type == "damage"]{
  _id,
  "name": damage,
  image,
}`);
