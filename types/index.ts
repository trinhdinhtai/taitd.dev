export type SocialProfile = {
  name: string;
  link: string;
};

export type AuthorType = {
  name: string;
  socialProfiles: SocialProfile[];
};

export interface NavItem {
  title: string;
  href?: string;
  description?: string;
  content?: ContentNavItem[];
}

export interface ContentNavItem extends NavItem {
  href: string;
}

export type SiteMetaData = {
  title: {
    template: string;
    default: string;
  };
  description: string;
  newsletterUrl?: string;
};
