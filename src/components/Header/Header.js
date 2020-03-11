import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Logo from "../../images/RailState-Logo-157px60px.png";
import VisibilitySensor from "react-visibility-sensor";

import { ScreenWidthContext, FontLoadedContext } from "../../layouts";
import config from "../../../content/meta/config";
import Menu from "../Menu";

class Header extends React.Component {
  state = {
    fixed: false
  };

  //TODO remove fixed className on scroll
  visibilitySensorChange = val => {
    if (val && window.innerWidth > 1023) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  };

  handleResize = () => {
    if (window.innerWidth <= 1028) {
      this.setState({ fixed: true });
    } else {
      this.setState({ fixed: false });
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }

  componentWillUnmount() {
    this.setState({ fixed: false });
  }

  getHeaderSize = () => {
    const fixed = this.state.fixed ? "fixed" : "";
    const page =
      this.props.path === "/"
        ? "homepage"
        : this.props.path.slice(this.props.path.indexOf("/") + 1, this.props.path.indexOf("/", 1));

    return `${fixed} ${page}`;
  };

  render() {
    const { pages, path, theme } = this.props;
    const { fixed } = this.state;
    return (
      <React.Fragment>
        <header className={`header ${this.getHeaderSize()}`}>
          <Link to="/" className="logoType">
            <div className="logo">
              <img src={Logo} alt={config.siteTitle} />
            </div>
            <div className="type">
              <h1>{config.headerTitle}</h1>
              <h2>{config.headerSubTitle}</h2>
            </div>
          </Link>
          <FontLoadedContext.Consumer>
            {loaded => (
              <ScreenWidthContext.Consumer>
                {width => (
                  <Menu
                    path={path}
                    fixed={fixed}
                    screenWidth={width}
                    fontLoaded={loaded}
                    pages={pages}
                    theme={theme}
                  />
                )}
              </ScreenWidthContext.Consumer>
            )}
          </FontLoadedContext.Consumer>
        </header>
        <VisibilitySensor resizeCheck={true} onChange={this.visibilitySensorChange}>
          <div className="sensor" />
        </VisibilitySensor>

        {/* --- STYLES --- */}
        <style jsx>{`
          .header {
            align-items: center;
            justify-content: center;
            display: flex;
            height: ${theme.header.height.default};
            position: relative;
            top: 0;
            width: 100%;
            align-items: center;

            :global(a.logoType) {
              align-items: center;
              display: flex;
              flex-direction: "column";
              color: ${theme.text.color.primary};

              .logo {
                flex-shrink: 0;
              }
            }

            &.homepage,
            &.hiring,
            &.contact {
              position: absolute;
              height: ${theme.header.height.homepage};
            }

            h1 {
              font-weight: bold;
            }
          }

          h1 {
            color: ${theme.color.brand.dark};
            font-size: ${theme.font.size.xl};
            font-weight: ${theme.font.weight.standard};
            margin: ${theme.space.stack.xs};
          }

          h2 {
            font-weight: ${theme.font.weight.standard};
            font-size: ${theme.font.size.xxs};
            letter-spacing: 0;
            margin: 0;
          }

          .logo {
            border-radius: 65% 75%;
            border: 1px solid #eee;
            display: inline-block;
            height: 44px;
            margin: 0;
            overflow: hidden;
            width: 127px;
            transition: all 0.5s;

            .homepage &,
            .contact &,
            .hiring & {
              height: 60px;
              width: 127px;
            }

            img {
              width: 100%;
            }
          }

          .sensor {
            display: block;
            position: absolute;
            bottom: 0;
            z-index: 1;
            left: 0;
            right: 0;
            height: 1px;
            top: ${path === "/" ? theme.header.height.homepage : theme.header.height.default};
          }

          @from-width tablet {
            .header {
              padding: ${theme.space.inset.l};

              &.homepage {
                height: ${theme.header.height.homepage};
              }
            }
          }

          @below desktop {
            .header.homepage,
            .header.hiring,
            .header.contact {
              .logo {
                border: none;
              }

              :global(a.logoType),
              h1 {
                color: ${theme.color.neutral.darkGray};
              }
              h2 {
                color: ${theme.color.neutral.gray.dark};
              }
            }
          }

          @from-width desktop {
            .header {
              background-color: ${theme.color.brand.primary.white};
              box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
              align-items: center;
              display: flex;
              position: absolute;
              top: 0;
              width: 100%;
              justify-content: space-between;
              transition: padding 0.5s;

              &.fixed {
                background-color: ${theme.color.brand.primary.white};
                box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
                height: ${theme.header.height.fixed};
                left: 0;
                padding: 0 ${theme.space.m};
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1;

                h1 {
                  margin: ${theme.space.stack.xxs};
                }

                h2 {
                  display: none;
                }
              }

              &.homepage:not(.fixed),
              &.hiring:not(.fixed),
              &.contact:not(.fixed) {
                :global(a.logoType),
                h1,
                h2 {
                  color: ${theme.color.brand.dark};
                }
              }
            }

            .header :global(a.logoType) {
              text-align: left;
              flex-direction: row;
              flex-shrink: 0;
              width: auto;
            }

            .logo {
              .fixed & {
                border: 0;
                width: 127px;
                margin-top: 20px;
                height: 75px;
              }

              .header.homepage:not(.fixed) &,
              .header.hiring:not(.fixed) &,
              .header.contact:not(.fixed) & {
                border: none;
              }
            }

            h2 {
              animation-duration: ${theme.time.duration.default};
              animation-name: h2Entry;
            }

            @keyframes h2Entry {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Header;
