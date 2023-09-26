import Link from "next/link";
import logo from "../assets/images/logo.png";
import Image from "next/image";
import Menu, {SubMenu, MenuItem} from "rc-menu"

export default function Header({ menus }) {

  function createNestedArray(objects, parentId = null){
    const nestedArray = [];
    objects.map((object) => {
      if (object.parentId === parentId) {
        const nestedChildren = createNestedArray(objects, object.id);
        if(nestedChildren.length){
          object.children = nestedChildren;
        }
        nestedArray.push(object)
      }
    })
    return nestedArray;
  }
  const nestedArray = createNestedArray(menus.pages)

  function Items({pages}){
    return pages.map((page, i) => (
      <div key={i}>
        {page.children ? (
          <SubMenu title={page.localizeInfos.en_US.title}>
            <Items pages={page.children} />
          </SubMenu>
        ) : (
          <MenuItem>
            <Link href={page.pageUrl === "home" ? "/" : page.pageUrl}>
              {page.localizeInfos.en_US.title}
            </Link>
          </MenuItem>
        )}
      </div>
    ));
  }

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Image src={logo} alt="" />
        </div>
        <Menu mode="inline">
          <Items pages={nestedArray}/>
        </Menu>
      </div>
    </header>
  );
}
