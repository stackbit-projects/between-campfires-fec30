import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import {graphql} from 'gatsby';

import {Layout} from '../components/index';
import HeaderAlt from '../components/HeaderAlt';
import Header from '../components/Header';
import {htmlToReact} from '../utils';
import Footer from '../components/Footer';

// this minimal GraphQL query ensures that when 'gatsby develop' is running,
// any changes to content files are reflected in browser
export const query = graphql`
  query($url: String) {
    sitePage(path: {eq: $url}) {
      id
    }
  }
`;

export default class Post extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
              {(_.get(this.props, 'pageContext.frontmatter.hide_header', null) === true) ? (
                <HeaderAlt {...this.props} />
              ) : 
                <Header {...this.props} site={this.props.pageContext.site} page={this.props.pageContext} image={_.get(this.props, 'pageContext.frontmatter.content_img_path', null)} />
              }
              <div id="content" className="site-content">
                <main id="main" className="site-main inner">
                  <article className="post post-full">
                    <header className="post-header">
                      <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title', null)}</h1>
                      <div className="post-meta">
                        Published on <time className="published"
                          dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date', null)).strftime('%B %d, %Y')}</time>
                      </div>
                    </header>
                    {_.get(this.props, 'pageContext.frontmatter.subtitle', null) && (
                    <div className="post-subtitle">
                      {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle', null))}
                    </div>
                    )}
                    <div className="post-content">
                      {htmlToReact(_.get(this.props, 'pageContext.html', null))}
                    </div>
                  </article>
                </main>
                <Footer {...this.props} />
              </div>
            </Layout>
        );
    }
}
