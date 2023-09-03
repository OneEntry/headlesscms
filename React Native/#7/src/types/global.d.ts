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
  depth?: number;
  localizeInfos: {[LanguageEnum]: LocalizeInfo};
  isVisible?: boolean;
  isEditorDisabled?: boolean;
  products?: number;
  attributeSetId?: object;
  templateIdentifier?: string;
  attributeValues?: object[];
  position: number;
  type?: string;
};

declare type Menu = {
  id: number;
  identifier: string;
  localizeInfos: {[LanguageEnum]: LocalizeInfo};
  pages: Page[];
};

declare type Field = {
  [key: string]: any;
  type: string;
};

declare type Product = {
  attributeSetId: number;
  attributeValues: Field[];
  id: number;
  isSync: number;
  isVisible: boolean;
  localizeInfos: {[key: string]: LocalizeInfo};
  position: number;
  price: number;
  relatedIds: [];
  shortDescTemplateIdentifier: string | null;
  statusId: number | null;
  templateIdentifier: string | null;
};

declare type Filter = {
  attributeMarker: string;
  conditionMarker: ConditionMarkersEnum;
  conditionValue: number | string;
  pageId?: number;
};

declare type TBadge = {
  label: string;
  value: string | number;
};
