import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import OurStoryTrain from "../../images/jpg/our-story.jpg";
import BookIcon from "../../images/png/RailState-Iconography-Book-Grayscale.png";
import TargetIcon from "../../images/png/RailState-Iconography-Bullseye-Grayscale.png";
import CareerIcon from "../../images/png/RailState-Iconography-Career-Grayscale.png";
import MailIcon from "../../images/png/RailState-Iconography-Mail-Grayscale.png";
import PhoneIcon from "../../images/png/RailState-Iconography-Phone-Grayscale.png";
import { FaArrowDown } from "react-icons/fa/";
import "./animatedHero.css";

const Hero = props => {
  const { scrollToContent, backgrounds, theme } = props;

  return (
    <React.Fragment>
      <section className="hero">
        <div className="hero-text">
          <h1 id="comingSoon">COMING SOON...</h1>
          <h1 className="tag-line"><u><em>The go-to source for unbiased, third-party data and insight on freight railway network condition, performance and volume</em></u></h1>
          <br />
        </div>
        {/*<button onClick={scrollToContent} aria-label="scroll">
          <FaArrowDown />
        </button>*/}
        <section id="features-wrapper" className="wrapper">
          <h2><u>UNBIASED, QUALITATIVE AND INFORMATIVE DATA</u></h2>
          {/*<div className="one_fifth">
            <p>Product</p>
            <img src={BookIcon} width="175" />
          </div>
          <div className="one_fifth">
            <p>Product</p>
            <img src={TargetIcon} width="175" />
          </div>*/}
          <div className="one_third">
            <Link to="/hiring">
              <p>Careers</p>
              <img src={CareerIcon} width="275" />
            </Link>
          </div>
          <div className="one_third">
            <Link to="/contact">
              <p>Contact Us</p>
              <img src={MailIcon} width="275" />
            </Link>
          </div>
          {/*<div className="one_third">
            <a href="https://app.railstate.com/">
              <p>Login</p>
              <img src={PhoneIcon} width="250" />
            </a>
          </div>*/}
        </section>
      </section>
      <section id="our-story-wrapper" className="wrapper">
        <div id="our-story-left" className="one_half">
          <img src={OurStoryTrain} alt="Trains" width="550" />
        </div>
        <div id="our-story-right" className="one_half">
          <h1 className="headline"><u>Our Story</u></h1>
          <p>We created RailState in response to an increasing demand among rail freight customers, commodity traders, financial analysts and others for more current and granular visibility on railway volumes, performance and condition.</p>
          <p>We are creating this data ourselves, not relying on or repackaging data from others. We are a SaaS company that is applying state of the art data collection techniques, Artificial Intelligence technology and an interactive website to provide actionable insights on the railway freight network for rail customers, commodity traders, financial analysts, regulators and others.</p>
        </div>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .hero {
          align-items: center;
          background-image: url(${backgrounds.mobile});
          background-position: 100% 15%;
          background-repeat: no-repeat;
          background-size: 50%;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 100vh;
          height: auto;
          padding: ${theme.space.inset.l};
          padding-top: ${theme.header.height.homepage};

          .hero-text {
            position: relative;
          }

          a {
            &.cta_button {
              margin-top: 10px;
              margin-left: 10px;
              -webkit-font-smoothing: antialiased;
              cursor: pointer;
              -moz-user-select: none;
              -webkit-user-select: none;
              -o-user-select: none;
              user-select: none;
              display: inline-block;
              font-weight: normal;
              text-align: center;
              text-decoration: none;
              -moz-transition: all 0.4s ease;
              -webkit-transition: all 0.4s ease;
              -o-transition: all 0.4s ease;
              background: rgb(13, 13, 13);
              border-radius: 6px;
              border-width: 0px;
              font-family: sans-serif;
              height: auto;
              transition: all 0.4s ease;
              padding: 6px 24px;
              text-shadow: none;
              width: auto;
              font-size: 24px;
              line-height: 1.5em;
              &:hover {
                background-color: ${theme.color.brand.lightOrange};
              }
            }

            &.black {
              color: rgb(255, 255, 255);
            }
          }
          p {
            padding: 10px;
            max-width: 55%;
          }
        }

        #features-wrapper {
          text-align: center;
          margin-top: 15vw;
          margin-bottom: 2vw;
          h2 {
            font-size: ${theme.font.size.xxl};
            text-align: center;
            padding: 0 0 25px 0;
          }

          div {
            border-radius: 6px;
            display: inline-block;
            background-color: #b9c5d4;
            margin: 12px 20px;
            padding: ${theme.space.m};
            text-align: center;

            &:hover {
              cursor: pointer;
              background-color: ${theme.color.brand.primary.medium};

              & p {
                color: white;
              }
            }

            p {
              width: 100%;
              max-width: 100%;
              margin: 0;
              text-transform: uppercase;
              font-weight: bold;
            }
          }
        }

        #our-story-wrapper {
          position: relative;
          width: 100%;
          margin: 7vw 0 0 0;
          padding: 50px 40px;
          background-color: #191919;
          color: white;

          h1 {
            color: white;
          }

          & p {
            width: 100%;
            max-width: 100%;
          }

          #our-story-left,
          #our-story-right {
            display: inline-block;
            vertical-align: middle;
          }

          #our-story-left {
            img {
              opacity: 0.5;
              border-radius: 25px;
              margin: 0 auto;
              display: block;
            }
          }

          #our-story-right {
            p {
              max-width: 86%;
            }
          }
        }

        h1 {
          text-align: left;
          font-size: ${theme.hero.h1.size};
          font-weight: bold;
          color: ${theme.hero.h1.color};
          line-height: ${theme.hero.h1.lineHeight};
          text-remove-gap: both 0 "Montserrat";
          position: relative;
          padding: 10px;
          left: 0;
          width: 51%;

          &#comingSoon {
            font-size: 75px;
            margin-top: 10vw;
          }

          :global(strong) {
            position: relative;

            &::after,
            &::before {
              content: "›";
              color: ${theme.text.color.attention};
              margin: 0 ${theme.space.xs} 0 0;
              text-shadow: 0 0 ${theme.space.s} ${theme.color.neutral.gray.k};
            }
            &::after {
              content: "‹";
              margin: 0 0 0 ${theme.space.xs};
            }
          }
        }

        button {
          background: ${theme.background.color.brand};
          border: 0;
          border-radius: 50%;
          font-size: ${theme.font.size.m};
          padding: ${theme.space.s} ${theme.space.m};
          cursor: pointer;
          width: ${theme.space.xl};
          height: ${theme.space.xl};

          &:focus {
            outline-style: none;
            background: ${theme.color.brand.primary.active};
          }

          :global(svg) {
            position: relative;
            top: 5px;
            fill: ${theme.color.neutral.white};
            stroke-width: 40;
            stroke: ${theme.color.neutral.white};
            animation-duration: ${theme.time.duration.long};
            animation-name: buttonIconMove;
            animation-iteration-count: infinite;
          }
        }

        @keyframes buttonIconMove {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        @below tablet {
          .hero {
            background-position: 49vw 22vw;

            div.hero-text {
              margin-top: -25px;
            }
          }

          #our-story-left,
          #our-story-right {
            width: 100%;
          }

          #our-story-right {
            padding-top: 25px;

            & h1 {
              width: 100%;
            }
          }
        }

        @from-width tablet {
          .hero {
            background-image: url(${backgrounds.tablet});
            background-size: 50%;
          }

          h1 {
            max-width: 90%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.3)`};
          }

          #our-story-left,
          #our-story-right {
            padding: 3%;
            max-width: 45%;
            width: 45;
          }

          button {
            font-size: ${theme.font.size.l};
          }
        }

        @from-width desktop {
          .hero {
            background-image: url(${backgrounds.desktop});
          }

          #our-story-left,
          #our-story-right {
            max-width: 50%;
            width: 50%;
          }

          h1 {
            max-width: 80%;
            font-size: ${`calc(${theme.hero.h1.size} * 1.5)`};
            line-height: ${theme.font.lineHeight.l};
            margin: 5px 0;
          }

          button {
            font-size: ${theme.font.size.xl};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  scrollToContent: PropTypes.func.isRequired,
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
