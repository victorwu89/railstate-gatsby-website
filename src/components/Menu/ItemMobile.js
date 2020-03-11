import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

const loginUrl = "/login/";
const externalLogin = "https://app.railstate.com/";

//TODO reformat list for Login to use DRY
class MobileItem extends React.Component {
  click = e => {
    if (this.props.item.children) {
      e.preventDefault();
      if (e.target.classList.value === "showChildren") {
        e.target.classList.remove("showChildren");
      } else {
        e.target.classList.add("showChildren");
      }
    }
  };

  render() {
    const { theme, item: { label, to, icon: Icon } = {} } = this.props;
    return (
      <React.Fragment>
        <li id={to.replace(/\//g, "")} key={label}>
          {this.props.item.to === loginUrl && (
            <a href={externalLogin} onClick={this.click} data-slug={to}>
              {Icon && <Icon />} {label}
            </a>
          )}
          {this.props.item.to !== loginUrl && (
            <Link to={to} onClick={this.click} ta-slug={to}>
              {Icon && <Icon />} {label}
            </Link>
          )}
          <ul className="subNav">
            {//algo to find specific subNav
            this.props.item.to === "/product/" && <li>product sub</li>}
            {this.props.item.to === "/solutions/" && <li>solutions sub</li>}
          </ul>
        </li>

        {/* --- STYLES --- */}
        <style jsx>{`
          @below desktop {
            li#product,
            li#solutions,
            li#resources,
            li#hiring,
            li#login,
            li#contact {
              margin-top: 10px;
              padding: 10px 5px;

              ul.subNav {
                background-color: transparent;
                z-index: 2;
                width: 100%;
                height: auto;
                padding: 5px 0;
                display: none;
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

MobileItem.propTypes = {
  item: PropTypes.object,
  hidden: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.func,
  theme: PropTypes.object.isRequired,
  mobile: PropTypes.string
};

export default MobileItem;
