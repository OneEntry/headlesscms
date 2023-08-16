declare type LocalizeInfo = {
  content: string;
  menuTitle: string;
  title: string;
};

declare type Page = {
  id: number;
  parentId: number;
  config: object;
  pageUrl: string;
  depth: number;
  localizeInfos: {[key: LanguageEnum]: LocalizeInfo};
  isVisible: boolean;
  products: number;
  attributeSetId: object;
  templateIdentifier: string;
  attributeValues: object;
  position: number;
  type: string;
};
