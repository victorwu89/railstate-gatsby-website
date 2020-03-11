import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const subItems = [];

//TODO reformat list for Login to use DRY
const Item = props => {
  const loginUrl = "/login/";
  const externalLogin = "https://app.railstate.com/";
  const { theme, item: { label, to, icon: Icon } = {}, onClick } = props;
  return (
    <React.Fragment>
      <li
        id={to.replace(/\//g, "")}
        className={"hiddenItem" in props ? "hiddenItem" : "item"}
        key={label}
      >
        {props.item.to === loginUrl && (
          <a href={externalLogin} onClick={onClick} data-slug={to}>
            {Icon && <Icon />} {label}
          </a>
        )}
        {props.item.to !== loginUrl && (
          <Link to={to} onClick={onClick} ta-slug={to}>
            {Icon && <Icon />} {label}
          </Link>
        )}
        <ul className="subNav">
          {/*Will use on next iteration
            algo to find specific subNav}}
          props.item.to === "/product/" && (
            <React.Fragment>
              <a className="subNav-children" href="#">
                <li>Autonomous Detection</li>
              </a>
              <a className="subNav-children" href="#">
                <li>Autonomous forecast</li>
              </a>
              <a className="subNav-children" href="#">
                <li>Integrations</li>
              </a>
              <a className="subNav-children" href="#">
                <li>Technology</li>
              </a>
            </React.Fragment>
          )*/}
        </ul>
      </li>

      {/* --- STYLES --- */}
      <style jsx>{`
        .item,
        .showItem {
          background: transparent;
          transition: all ${theme.time.duration.default};
          display: flex;
          align-items: center;
          font-size: ${theme.font.size.s};

          &:hover ul {
            background-color: ${theme.color.neutral.gray.dark};
          }

          :global(a) {
            padding: ${theme.space.inset.s};
            display: flex;
            align-items: center;
          }

          :global(svg) {
            margin: 0 ${theme.space.inset.xs} 0 0;
            opacity: 0.3;
          }
        }

        li#product,
        li#solutions,
        li#resources {
          & ul {
            background: transparent;
            opacity: 0.7;
            position: absolute;
            margin-top: 135px;
            border-radius: 8px;
            width: 200px;
            height: 225px;
            list-style-type: none;
            background-color: white;
            display: none;
            & li {
              padding: 5px;
            }
            a {
              font-size: 14px;
              &:hover {
                color: ${theme.linkhover.color.gray};
                background-color: black;
              }
            }
          }
        }

        :global(.itemList .hideItem) {
          display: none;
        }

        @from-width desktop {
          .item {
            &:hover ul {
              background-color: blue;
              display: block !important;
            }

            :global(a) {
              font-weight: bold;
              color: ${theme.text.color.primary.dark};
              padding: ${theme.space.inset.s};
              margin-left: 20px;
              margin-right: 20px;
              text-transform: uppercase;
              transition: all ${theme.time.duration.default};
              border-radius: ${theme.size.radius.small};
            }

            :global(a:hover) {
              color: ${theme.color.brand.primary.white};
              background-color: ${theme.color.brand.dark};
              padding: 18px;
            }

            :global(svg) {
              transition: all ${theme.time.duration.default};
            }

            &:hover :global(svg) {
              fill: ${theme.color.brand.primary};
              opacity: 1;

              :global(.hero) & :global(svg) {
                fill: green;
              }
            }
          }

          .showItem {
            display: none;
          }

          .hiddenItem {
            text-align: left;
            padding: ${theme.space.xs};

            & :global(a.inHiddenItem) {
              color: ${theme.text.color.primary};
              &:hover {
                color: ${theme.color.brand.primary};
              }
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Item.propTypes = {
  item: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.func,
  theme: PropTypes.object.isRequired,
  mobile: PropTypes.string
};

export default Item;
