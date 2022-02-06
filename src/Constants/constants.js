import { BsCollectionFill } from "react-icons/bs";
import { MdOutlinePersonalVideo } from "react-icons/md";
import {
  RiDashboardFill,
  RiHome5Fill,
  RiMovie2Line,
  RiSearch2Fill,
} from "react-icons/ri";

export const sideBarItems = [
  {
    name: "home",
    icon: <RiHome5Fill fontSize={20} />,
  },
  {
    name: "search",
    icon: <RiSearch2Fill fontSize={20} />,
  },
  {
    name: "movies",
    icon: <RiMovie2Line fontSize={20} />,
  },
  {
    name: "tv",
    icon: <MdOutlinePersonalVideo fontSize={18} />,
  },
  {
    name: "genres",
    icon: <RiDashboardFill fontSize={20} />,
  },

  {
    name: "collections",
    icon: <BsCollectionFill fontSize={18} />,
    sub: ["favorite", "watchlist"],
  },
];

export const tabs = [
  { name: "Movies", icon: <RiMovie2Line fontSize={16} /> },
  { name: "Tv", icon: <MdOutlinePersonalVideo fontSize={16} /> },
];

export const years = [
  "All",
  new Date().getFullYear(),
  new Date().getFullYear() - 1,
  new Date().getFullYear() - 2,
  new Date().getFullYear() - 3,
  new Date().getFullYear() - 4,
  new Date().getFullYear() - 5,
  new Date().getFullYear() - 6,
  new Date().getFullYear() - 7,
  new Date().getFullYear() - 8,
  new Date().getFullYear() - 9,
  new Date().getFullYear() - 10,
  new Date().getFullYear() - 11,
  new Date().getFullYear() - 12,
  new Date().getFullYear() - 13,
  new Date().getFullYear() - 14,
  new Date().getFullYear() - 15,
  "Older",
];

export const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
  {
    id: 10759,
    name: "Action & Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 10762,
    name: "Kids",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10763,
    name: "News",
  },
  {
    id: 10764,
    name: "Reality",
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy",
  },
  {
    id: 10766,
    name: "Soap",
  },
  {
    id: 10767,
    name: "Talk",
  },
  {
    id: 10768,
    name: "War & Politics",
  },
  {
    id: 37,
    name: "Western",
  },
];

export const movieSorts = [
  {
    name: "Popularity",
    value: "popularity.desc",
  },
  {
    name: "Release date",
    value: "release_date.desc",
  },
  {
    name: "Title",
    value: "original_title.asc",
  },
  {
    name: "Vote",
    value: "vote_average.desc",
  },
];

export const tvSorts = [
  {
    name: "Popularity",
    value: "popularity.desc",
  },
  {
    name: "Release date",
    value: "first_air_date.desc",
  },
  {
    name: "Vote",
    value: "vote_average.desc",
  },
];

export const languages = [
  {
    iso_639_1: "bi",
    name: "Bislama",
  },
  {
    iso_639_1: "cs",
    name: "Czech",
  },
  {
    iso_639_1: "ba",
    name: "Bashkir",
  },
  {
    iso_639_1: "ae",
    name: "Avestan",
  },
  {
    iso_639_1: "av",
    name: "Avaric",
  },
  {
    iso_639_1: "de",
    name: "German",
  },
  {
    iso_639_1: "mt",
    name: "Maltese",
  },
  {
    iso_639_1: "om",
    name: "Oromo",
  },
  {
    iso_639_1: "rm",
    name: "Raeto-Romance",
  },
  {
    iso_639_1: "so",
    name: "Somali",
  },
  {
    iso_639_1: "ts",
    name: "Tsonga",
  },
  {
    iso_639_1: "vi",
    name: "Vietnamese",
  },
  {
    iso_639_1: "gn",
    name: "Guarani",
  },
  {
    iso_639_1: "ig",
    name: "Igbo",
  },
  {
    iso_639_1: "it",
    name: "Italian",
  },
  {
    iso_639_1: "ki",
    name: "Kikuyu",
  },
  {
    iso_639_1: "ku",
    name: "Kurdish",
  },
  {
    iso_639_1: "la",
    name: "Latin",
  },
  {
    iso_639_1: "ln",
    name: "Lingala",
  },
  {
    iso_639_1: "lb",
    name: "Letzeburgesch",
  },
  {
    iso_639_1: "ny",
    name: "Chichewa; Nyanja",
  },
  {
    iso_639_1: "pl",
    name: "Polish",
  },
  {
    iso_639_1: "si",
    name: "Sinhalese",
  },
  {
    iso_639_1: "to",
    name: "Tonga",
  },
  {
    iso_639_1: "az",
    name: "Azerbaijani",
  },
  {
    iso_639_1: "ce",
    name: "Chechen",
  },
  {
    iso_639_1: "cu",
    name: "Slavic",
  },
  {
    iso_639_1: "da",
    name: "Danish",
  },
  {
    iso_639_1: "hz",
    name: "Herero",
  },
  {
    iso_639_1: "ie",
    name: "Interlingue",
  },
  {
    iso_639_1: "rw",
    name: "Kinyarwanda",
  },
  {
    iso_639_1: "mi",
    name: "Maori",
  },
  {
    iso_639_1: "no",
    name: "Norwegian",
  },
  {
    iso_639_1: "pi",
    name: "Pali",
  },
  {
    iso_639_1: "sk",
    name: "Slovak",
  },
  {
    iso_639_1: "se",
    name: "Northern Sami",
  },
  {
    iso_639_1: "sm",
    name: "Samoan",
  },
  {
    iso_639_1: "uk",
    name: "Ukrainian",
  },
  {
    iso_639_1: "en",
    name: "English",
  },
  {
    iso_639_1: "ay",
    name: "Aymara",
  },
  {
    iso_639_1: "ca",
    name: "Catalan",
  },
  {
    iso_639_1: "eo",
    name: "Esperanto",
  },
  {
    iso_639_1: "ha",
    name: "Hausa",
  },
  {
    iso_639_1: "ho",
    name: "Hiri Motu",
  },
  {
    iso_639_1: "hu",
    name: "Hungarian",
  },
  {
    iso_639_1: "io",
    name: "Ido",
  },
  {
    iso_639_1: "ii",
    name: "Yi",
  },
  {
    iso_639_1: "kn",
    name: "Kannada",
  },
  {
    iso_639_1: "kv",
    name: "Komi",
  },
  {
    iso_639_1: "li",
    name: "Limburgish",
  },
  {
    iso_639_1: "oj",
    name: "Ojibwa",
  },
  {
    iso_639_1: "ru",
    name: "Russian",
  },
  {
    iso_639_1: "sr",
    name: "Serbian",
  },
  {
    iso_639_1: "sv",
    name: "Swedish",
  },
  {
    iso_639_1: "ty",
    name: "Tahitian",
  },
  {
    iso_639_1: "zu",
    name: "Zulu",
  },
  {
    iso_639_1: "ka",
    name: "Georgian",
  },
  {
    iso_639_1: "ch",
    name: "Chamorro",
  },
  {
    iso_639_1: "be",
    name: "Belarusian",
  },
  {
    iso_639_1: "br",
    name: "Breton",
  },
  {
    iso_639_1: "kw",
    name: "Cornish",
  },
  {
    iso_639_1: "fi",
    name: "Finnish",
  },
  {
    iso_639_1: "sh",
    name: "Serbo-Croatian",
  },
  {
    iso_639_1: "nn",
    name: "Norwegian Nynorsk",
  },
  {
    iso_639_1: "tt",
    name: "Tatar",
  },
  {
    iso_639_1: "tg",
    name: "Tajik",
  },
  {
    iso_639_1: "vo",
    name: "Volapük",
  },
  {
    iso_639_1: "ps",
    name: "Pushto",
  },
  {
    iso_639_1: "mk",
    name: "Macedonian",
  },
  {
    iso_639_1: "fr",
    name: "French",
  },
  {
    iso_639_1: "bm",
    name: "Bambara",
  },
  {
    iso_639_1: "eu",
    name: "Basque",
  },
  {
    iso_639_1: "fj",
    name: "Fijian",
  },
  {
    iso_639_1: "id",
    name: "Indonesian",
  },
  {
    iso_639_1: "mg",
    name: "Malagasy",
  },
  {
    iso_639_1: "na",
    name: "Nauru",
  },
  {
    iso_639_1: "xx",
    name: "No Language",
  },
  {
    iso_639_1: "qu",
    name: "Quechua",
  },
  {
    iso_639_1: "sq",
    name: "Albanian",
  },
  {
    iso_639_1: "ti",
    name: "Tigrinya",
  },
  {
    iso_639_1: "tw",
    name: "Twi",
  },
  {
    iso_639_1: "wa",
    name: "Walloon",
  },
  {
    iso_639_1: "ab",
    name: "Abkhazian",
  },
  {
    iso_639_1: "bs",
    name: "Bosnian",
  },
  {
    iso_639_1: "af",
    name: "Afrikaans",
  },
  {
    iso_639_1: "an",
    name: "Aragonese",
  },
  {
    iso_639_1: "fy",
    name: "Frisian",
  },
  {
    iso_639_1: "gu",
    name: "Gujarati",
  },
  {
    iso_639_1: "ik",
    name: "Inupiaq",
  },
  {
    iso_639_1: "ja",
    name: "Japanese",
  },
  {
    iso_639_1: "ko",
    name: "Korean",
  },
  {
    iso_639_1: "lg",
    name: "Ganda",
  },
  {
    iso_639_1: "nl",
    name: "Dutch",
  },
  {
    iso_639_1: "os",
    name: "Ossetian; Ossetic",
  },
  {
    iso_639_1: "el",
    name: "Greek",
  },
  {
    iso_639_1: "bn",
    name: "Bengali",
  },
  {
    iso_639_1: "cr",
    name: "Cree",
  },
  {
    iso_639_1: "km",
    name: "Khmer",
  },
  {
    iso_639_1: "lo",
    name: "Lao",
  },
  {
    iso_639_1: "nd",
    name: "Ndebele",
  },
  {
    iso_639_1: "ne",
    name: "Nepali",
  },
  {
    iso_639_1: "sc",
    name: "Sardinian",
  },
  {
    iso_639_1: "sw",
    name: "Swahili",
  },
  {
    iso_639_1: "tl",
    name: "Tagalog",
  },
  {
    iso_639_1: "ur",
    name: "Urdu",
  },
  {
    iso_639_1: "ee",
    name: "Ewe",
  },
  {
    iso_639_1: "aa",
    name: "Afar",
  },
  {
    iso_639_1: "co",
    name: "Corsican",
  },
  {
    iso_639_1: "et",
    name: "Estonian",
  },
  {
    iso_639_1: "is",
    name: "Icelandic",
  },
  {
    iso_639_1: "ks",
    name: "Kashmiri",
  },
  {
    iso_639_1: "kr",
    name: "Kanuri",
  },
  {
    iso_639_1: "ky",
    name: "Kirghiz",
  },
  {
    iso_639_1: "kj",
    name: "Kuanyama",
  },
  {
    iso_639_1: "nr",
    name: "Ndebele",
  },
  {
    iso_639_1: "or",
    name: "Oriya",
  },
  {
    iso_639_1: "wo",
    name: "Wolof",
  },
  {
    iso_639_1: "za",
    name: "Zhuang",
  },
  {
    iso_639_1: "ar",
    name: "Arabic",
  },
  {
    iso_639_1: "cv",
    name: "Chuvash",
  },
  {
    iso_639_1: "fo",
    name: "Faroese",
  },
  {
    iso_639_1: "hr",
    name: "Croatian",
  },
  {
    iso_639_1: "ms",
    name: "Malay",
  },
  {
    iso_639_1: "nb",
    name: "Norwegian Bokmål",
  },
  {
    iso_639_1: "rn",
    name: "Rundi",
  },
  {
    iso_639_1: "sn",
    name: "Shona",
  },
  {
    iso_639_1: "st",
    name: "Sotho",
  },
  {
    iso_639_1: "tr",
    name: "Turkish",
  },
  {
    iso_639_1: "am",
    name: "Amharic",
  },
  {
    iso_639_1: "fa",
    name: "Persian",
  },
  {
    iso_639_1: "hy",
    name: "Armenian",
  },
  {
    iso_639_1: "pa",
    name: "Punjabi",
  },
  {
    iso_639_1: "as",
    name: "Assamese",
  },
  {
    iso_639_1: "ia",
    name: "Interlingua",
  },
  {
    iso_639_1: "lv",
    name: "Latvian",
  },
  {
    iso_639_1: "lu",
    name: "Luba-Katanga",
  },
  {
    iso_639_1: "mr",
    name: "Marathi",
  },
  {
    iso_639_1: "mn",
    name: "Mongolian",
  },
  {
    iso_639_1: "pt",
    name: "Portuguese",
  },
  {
    iso_639_1: "th",
    name: "Thai",
  },
  {
    iso_639_1: "tk",
    name: "Turkmen",
  },
  {
    iso_639_1: "ve",
    name: "Venda",
  },
  {
    iso_639_1: "dv",
    name: "Divehi",
  },
  {
    iso_639_1: "gv",
    name: "Manx",
  },
  {
    iso_639_1: "kl",
    name: "Kalaallisut",
  },
  {
    iso_639_1: "kk",
    name: "Kazakh",
  },
  {
    iso_639_1: "lt",
    name: "Lithuanian",
  },
  {
    iso_639_1: "my",
    name: "Burmese",
  },
  {
    iso_639_1: "sl",
    name: "Slovenian",
  },
  {
    iso_639_1: "sd",
    name: "Sindhi",
  },
  {
    iso_639_1: "cn",
    name: "Cantonese",
  },
  {
    iso_639_1: "hi",
    name: "Hindi",
  },
  {
    iso_639_1: "cy",
    name: "Welsh",
  },
  {
    iso_639_1: "ht",
    name: "Haitian; Haitian Creole",
  },
  {
    iso_639_1: "iu",
    name: "Inuktitut",
  },
  {
    iso_639_1: "jv",
    name: "Javanese",
  },
  {
    iso_639_1: "mh",
    name: "Marshall",
  },
  {
    iso_639_1: "sa",
    name: "Sanskrit",
  },
  {
    iso_639_1: "ss",
    name: "Swati",
  },
  {
    iso_639_1: "te",
    name: "Telugu",
  },
  {
    iso_639_1: "kg",
    name: "Kongo",
  },
  {
    iso_639_1: "ml",
    name: "Malayalam",
  },
  {
    iso_639_1: "uz",
    name: "Uzbek",
  },
  {
    iso_639_1: "sg",
    name: "Sango",
  },
  {
    iso_639_1: "xh",
    name: "Xhosa",
  },
  {
    iso_639_1: "es",
    name: "Spanish",
  },
  {
    iso_639_1: "su",
    name: "Sundanese",
  },
  {
    iso_639_1: "ug",
    name: "Uighur",
  },
  {
    iso_639_1: "yi",
    name: "Yiddish",
  },
  {
    iso_639_1: "yo",
    name: "Yoruba",
  },
  {
    iso_639_1: "zh",
    name: "Mandarin",
  },
  {
    iso_639_1: "he",
    name: "Hebrew",
  },
  {
    iso_639_1: "bo",
    name: "Tibetan",
  },
  {
    iso_639_1: "ak",
    name: "Akan",
  },
  {
    iso_639_1: "mo",
    name: "Moldavian",
  },
  {
    iso_639_1: "ng",
    name: "Ndonga",
  },
  {
    iso_639_1: "dz",
    name: "Dzongkha",
  },
  {
    iso_639_1: "ff",
    name: "Fulah",
  },
  {
    iso_639_1: "gd",
    name: "Gaelic",
  },
  {
    iso_639_1: "ga",
    name: "Irish",
  },
  {
    iso_639_1: "gl",
    name: "Galician",
  },
  {
    iso_639_1: "nv",
    name: "Navajo",
  },
  {
    iso_639_1: "oc",
    name: "Occitan",
  },
  {
    iso_639_1: "ro",
    name: "Romanian",
  },
  {
    iso_639_1: "ta",
    name: "Tamil",
  },
  {
    iso_639_1: "tn",
    name: "Tswana",
  },
  {
    iso_639_1: "bg",
    name: "Bulgarian",
  },
];
