import React from 'react';
import _ from 'lodash';

import {htmlToReact, Link, withPrefix} from '../utils';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="colophon" className="site-footer inner">
              {(_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null) || _.get(this.props, 'pageContext.site.siteMetadata.footer.links', null)) && (
              <div className="site-footer-inside">
                {_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null) && (
                <span className="copyright">{htmlToReact(_.get(this.props, 'pageContext.site.siteMetadata.footer.content', null))}</span>
                )}
                {_.map(_.get(this.props, 'pageContext.site.siteMetadata.footer.links', null), (link, link_idx) => (
                  <Link key={link_idx} to={withPrefix(_.get(link, 'url', null))} {...(_.get(link, 'new_window', null) ? ({target: '_blank', rel: 'noopener'}) : null)}>{_.get(link, 'label', null)}</Link>
                ))}
              </div>
              )}
              <Link id="to-top" className="to-top" to="#page">To top <span className="icon-arrow-up" aria-hidden="true" /></Link>
            </footer>
        );
    }
}
