export enum PlatformType {
  ens = "ENS",
  dotbit = "dotbit",
  lens = "lens",
  ethereum = "ethereum",
  twitter = "twitter",
  nextid = "nextid",
  keybase = "keybase",
  reddit = "reddit",
  github = "github",
  unstoppableDomains = "unstoppabledomains",
  farcaster = "farcaster",
  space_id = "space_id",
  telegram = "telegram",
  instagram = "instagram",
  rss3 = "rss3",
  cyberconnect = "cyberconnect",
  opensea = "opensea",
  sybil = "sybil",
  discord = "discord",
  url = "url",
  website = "website",
  linkedin = "linkedin",
  dns = "dns",
  lenster = "lenster",
  facebook = "facebook",
  weibo = "weibo",
  youtube = "youtube",
  tiktok = "tiktok",
  bilibili = "bilibili",
  medium = "medium",
  mirror = "mirror",
  jike = "jike",
  dribbble = "dribbble",
  nostr = "nostr",
}

export const regexEns = /.*\.(eth|xyz|app|luxe|kred|art|ceo|club)$/i,
  regexLens = /.*\.lens$/i,
  regexDotbit = /.*\.bit$/i,
  regexEth = /^0x[a-fA-F0-9]{40}$/i,
  regexTwitter = /^[A-Za-z0-9_]{1,15}$/i,
  regexFarcaster = /^[A-Za-z0-9_.]{1,16}$/i,
  regexUnstoppableDomains =
    /.*\.(crypto|888|nft|blockchain|bitcoin|wallet|dao|x|klever|hi|zil|kresus|polygon)$/i,
  regexSpaceid = /.*\.(bnb|arb)$/i,
  regexUniversalFarcaster = /^[A-Za-z0-9_.]{1,16}.(farcaster)$/i,
  regexAvatar = /^0x[a-f0-9]{66}$/i;

export const handleSearchPlatform = (term: string) => {
  switch (true) {
    case regexEns.test(term):
      return PlatformType.ens;
    case regexEth.test(term):
      return PlatformType.ens;
    case regexLens.test(term):
      return PlatformType.lens;
    case regexUniversalFarcaster.test(term):
      return PlatformType.farcaster;
    case regexSpaceid.test(term):
      return PlatformType.space_id;
    case regexDotbit.test(term):
      return PlatformType.dotbit;
    case regexUnstoppableDomains.test(term):
      return PlatformType.unstoppableDomains;
    case regexTwitter.test(term):
      return PlatformType.twitter;
    default:
      return PlatformType.nextid;
  }
};
