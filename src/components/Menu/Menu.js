import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/from");

import { MdClose } from "react-icons/md";

import ItemMobile from "./ItemMobile";
import Item from "./Item";
import Expand from "./Expand";
import "./menu-animation.css";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.itemList = React.createRef();

    const pages = props.pages.map(page => ({
      to: page.node.fields.slug,
      label: page.node.frontmatter.menuTitle
        ? page.node.frontmatter.menuTitle
        : page.node.frontmatter.title
    }));

    this.itemsForLater = [
      {
        to: "/login/",
        label: "Login",
        children: false
      },
      {
        to: "/product/",
        label: "Product"
      },
      {
        to: "/solutions/",
        label: "Solutions"
      },
      {
        to: "/resources/",
        label: "Resources"
      }
    ];

    this.items = [
      {
        to: "/hiring/",
        label: "Hiring",
        children: false
      },
      {
        to: "/contact/",
        label: "Contact",
        children: false
      }
    ];

    this.renderedItems = []; // will contain references to rendered DOM elements of menu

    this.state = {
      open: false,
      hiddenItems: [],
      hamburger: false
    };
  }

  static propTypes = {
    path: PropTypes.string.isRequired,
    fixed: PropTypes.bool.isRequired,
    screenWidth: PropTypes.number.isRequired,
    fontLoaded: PropTypes.bool.isRequired,
    pages: PropTypes.array.isRequired,
    theme: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.renderedItems = this.getRenderedItems();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.path !== prevProps.path ||
      this.props.fixed !== prevProps.fixed ||
      this.props.screenWidth !== prevProps.screenWidth ||
      this.props.fontLoaded !== prevProps.fontLoaded
    ) {
      if (this.props.path !== prevProps.path) {
        this.closeMenu();
      }
      //this.hideOverflowedMenuItems();
    }
  }

  getRenderedItems = () => {
    const itemList = this.itemList.current;
    return Array.from(itemList.children);
  };

  hideOverflowedMenuItems = () => {
    const PADDING_AND_SPACE_FOR_MORELINK = this.props.screenWidth >= 1024 ? 60 : 0;

    const itemsContainer = this.itemList.current;
    const maxWidth = itemsContainer.offsetWidth - PADDING_AND_SPACE_FOR_MORELINK;

    this.setState({ hiddenItems: [] }); // clears previous state

    const menu = this.renderedItems.reduce(
      (result, item) => {
        item.classList.add("item");
        item.classList.remove("hideItem");

        const currentCumulativeWidth = result.cumulativeWidth + item.offsetWidth;
        result.cumulativeWidth = currentCumulativeWidth;

        if (!item.classList.contains("more") && currentCumulativeWidth > maxWidth) {
          const link = item.querySelector("a");

          item.classList.add("hideItem");
          item.classList.remove("item");
          result.hiddenItems.push({
            to: link.getAttribute("data-slug"),
            label: link.text
          });
        }
        return result;
      },
      { visibleItems: [], cumulativeWidth: 0, hiddenItems: [] }
    );

    this.setState(prevState => ({ hiddenItems: menu.hiddenItems }));
  };

  toggleMenu = e => {
    e.preventDefault();
    this.setState({ hamburger: true });
  };

  closeMenu = e => {
    this.setState({ hamburger: false });
  };

  render() {
    const { screenWidth, theme } = this.props;
    const { open } = this.state;
    return (
      <React.Fragment>
        <nav className={`menu ${open ? "open" : ""}`} rel="js-menu">
          <ul
            className={`itemList ${this.state.hamburger ? "hamburger" : ""} `}
            ref={this.itemList}
          >
            <span onClick={this.closeMenu}>
              <MdClose size={26} />
            </span>
            {screenWidth >= 1022 &&
              this.items.map(function(item) {
                return <Item item={item} key={item.label} icon={item.icon} theme={theme} />;
              })}
            {screenWidth <= 1022 &&
              this.items.map(function(item) {
                return <ItemMobile item={item} key={item.label} icon={item.icon} theme={theme} />;
              })}
          </ul>
          {//insert code to update expand button. instead of length screen size
          screenWidth <= 1021 && <Expand onClick={this.toggleMenu} theme={theme} />}
        </nav>

        {/* --- STYLES --- */}
        <style jsx>{`
          .menu {
            align-items: center;
            background: ${theme.color.neutral.white};
            display: flex;
            flex-grow: 1;
            left: 0;
            //max-height: ${open ? "1000px" : "50px"};
            padding: 0 ${theme.space.inset.s};
            position: fixed;
            width: 100%;
            z-index: 1;
            transition: all ${theme.time.duration.default};
          }

          .itemList {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            list-style: none;
            margin: 0;
            padding: 0; /* 0 ${theme.space.s}; */
            position: relative;
            width: 100%;
          }

          @below desktop {
            .menu {
              &::after {
                position: absolute;
                content: "";
                left: ${theme.space.m};
                right: ${theme.space.m};
                top: 0;
                height: 1px;
                //background: ${theme.color.brand.primary};
              }

              & ul{
                display:none;
                &.hamburger{
                  display: block !important;
                  padding: ${theme.space.sm};
                  position: fixed;
                  background: white;
                  left: 0px;
                  top: 0;
                  z-index: 2;
                  width: 101%;
                  -webkit-animation: slide-down .3s ease-out;
                  -moz-animation: slide-down .3s ease-out;

                  span{
                    cursor: pointer;
                    display: block;
                    width: 20px;
                    position: absolute;
                    right: 15px;
                    top: 10px;
                  }
                }
              }

              &.open {
                padding: ${theme.space.inset.m};
              }

              :global(.homepage):not(.fixed) & {
                bottom: -100px;
              }
            }
          }

          @from-width desktop {
            .menu {
              border-top: none;
              background: transparent;
              display: flex;
              position: relative;
              justify-content: flex-start;
              padding-left: 50px;
              transition: none;
              & span{
                display: none;
              }
            }

            .itemList {
              justify-content: flex-start;
              padding: 0;
            }

            .hiddenItemList {
              list-style: none;
              margin: 0;
              position: absolute;
              background: ${theme.background.color.primary};
              border: 1px solid ${theme.line.color};
              top: 48px;
              right: ${theme.space.s};
              display: flex;
              flex-direction: column;
              justify-content: flex-start;
              padding: ${theme.space.m};
              border-radius: ${theme.size.radius.small};
              border-top-right-radius: 0;


              &:after {
                content: "";
                background: ${theme.background.color.primary};
                z-index: 10;
                top: -10px;
                right: -1px;
                width: 44px;
                height: 10px;
                position: absolute;
                border-left: 1px solid ${theme.line.color};
                border-right: 1px solid ${theme.line.color};
              }

              :global(.homepage):not(.fixed) & {
                border: 1px solid transparent;
                background: color(white alpha(-10%));
                top: 50px;

                &:after {
                  top: -11px;
                  border-left: 1px solid transparent;
                  border-right: 1px solid transparent;
                  background: color(white alpha(-10%));
                }
              }

              :global(.fixed) & {
                top: 44px;
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Menu;
