import React from 'react';
import _ from 'lodash';

import {Link, withPrefix} from '../utils';

export default class Branding extends React.Component {
    render() {
        return (
            <div className="site-branding">
              {_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img', null) && (
              <p className="site-logo">
                <Link to={withPrefix('/')}><img src={withPrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img', null))} alt={_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img_alt', null)} /></Link>
              </p>
              )}
              {(_.get(this.props, 'pageContext.frontmatter.template', null) === 'home') ? (
              <h1 className="site-title"><Link to={withPrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)}</Link></h1>
              ) : 
              <p className="site-title"><Link to={withPrefix('/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title', null)}</Link></p>
              }
              {_.get(this.props, 'pageContext.site.siteMetadata.header.tagline', null) && (
              <p className="site-description">{_.get(this.props, 'pageContext.site.siteMetadata.header.tagline', null)}</p>
              )}
            </div>
        );
    }
}
