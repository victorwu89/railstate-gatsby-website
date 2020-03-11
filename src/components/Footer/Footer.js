import React from "react";
import PropTypes from "prop-types";

const Footer = props => {
  const { html, theme } = props;

  return (
    <React.Fragment>
      <footer className="footer" dangerouslySetInnerHTML={{ __html: html }} />

      {/* --- STYLES --- */}
      <style jsx>{`
        .footer {
          background: ${theme.color.brand.dark};
          padding: ${theme.space.inset.default};
          padding-bottom: 120px;

          :global(p) {
            color: ${theme.color.neutral.white};
            padding: 10px;
          }

          :global(ul) {
            list-style: none;
            text-align: center;
            padding: 0;

            :global(li) {
              color: ${theme.color.neutral.white};
              font-size: ${theme.font.size.xxs};
              padding: ${theme.space.xxs} ${theme.space.s};
              position: relative;
              display: inline-block;

              &::after {
                content: "•";
                position: absolute;
                right: ${`calc(${theme.space.xs} * -1)`};
              }
              &:last-child::after {
                content: "";
              }
            }
          }
        }

        @from-width desktop {
          .footer {
            padding: ${theme.space.inset.default};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Footer.propTypes = {
  html: PropTypes.string,
  theme: PropTypes.object.isRequired
};

export default Footer;
