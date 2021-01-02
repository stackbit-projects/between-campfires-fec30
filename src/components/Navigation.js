import React from 'react';
import _ from 'lodash';

import {classNames, Link, withPrefix} from '../utils';
import Icon from './Icon';

export default class Navigation extends React.Component {
    render() {
        return (
            (_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) || _.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null)) && (<React.Fragment>
            <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
              <div className="site-nav-wrap">
                <div className="site-nav-inside">
                  {_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav', null) && (
                  <ul className="menu">
                    {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links', null), (action, action_idx) => {
                        let pageUrl = _.trim(_.get(this.props, 'pageContext.url', null), '/');
                        let actionUrl = _.trim(_.get(action, 'url', null), '/');
                        return (
                          <li key={action_idx} className={classNames('menu-item', {'current-menu-item': pageUrl === actionUrl})}>
                            <Link to={withPrefix(_.get(action, 'url', null))}
                              {...(_.get(action, 'new_window', null) ? ({target: '_blank'}) : null)}
                              {...((_.get(action, 'new_window', null) || _.get(action, 'no_follow', null)) ? ({rel: (_.get(action, 'new_window', null) ? ('noopener ') : '') + (_.get(action, 'no_follow', null) ? ('nofollow') : '')}) : null)}>{_.get(action, 'label', null)}</Link>
                          </li>
                        )
                    })}
                  </ul>
                  )}
                  {_.get(this.props, 'pageContext.site.siteMetadata.header.has_social', null) && (
                  <div className="social-links">
                    {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.social_links', null), (action, action_idx) => (
                    action && (
                    <Link key={action_idx} to={withPrefix(_.get(action, 'url', null))}
                      {...(_.get(action, 'new_window', null) ? ({target: '_blank'}) : null)}
                      {...((_.get(action, 'new_window', null) || _.get(action, 'no_follow', null)) ? ({rel: (_.get(action, 'new_window', null) ? ('noopener ') : '') + (_.get(action, 'no_follow', null) ? ('nofollow') : '')}) : null)}
                      className={classNames({'button-circle': _.get(action, 'style', null) === 'icon'})}>
                      {((_.get(action, 'style', null) === 'icon') && _.get(action, 'icon_class', null)) ? (<React.Fragment>
                        <Icon {...this.props} icon={_.get(action, 'icon_class', null)} />
                        <span className="screen-reader-text">{_.get(action, 'label', null)}</span>
                      </React.Fragment>) : 
                      _.get(action, 'label', null)
                      }
                    </Link>
                    )
                    ))}
                  </div>
                  )}
                </div>
              </div>
            </nav>
            <button id="menu-toggle" className="menu-toggle"><span className="screen-reader-text">Menu</span><span className="icon-menu" aria-hidden="true" /></button>
            </React.Fragment>)
        );
    }
}
