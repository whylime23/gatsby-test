import React from "react";
import Helmet from "react-helmet";
import axios from "axios";
import Layout from "../layout";
import PostListing from "../components/PostListing";
import SEO from "../components/SEO";
import config from "../../data/SiteConfig";

// Replaced GraphQL query with Axios GET request and saved response in state.
// References:
// https://blog.hellojs.org/fetching-api-data-with-react-js-460fe8bbf8f2
// https://www.npmjs.com/package/axios

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      apiData: null
    };
  }

  componentDidMount() {
    axios.get('https://9ss7bxey8k.execute-api.ap-southeast-2.amazonaws.com/default/dummy_service')
      .then((response) => {
        this.setState({apiData: response.data.Data});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.apiData) {
      const postEdges = this.state.apiData;
      return (
        <Layout location={this.props.location} title="Home">
          <div className="index-container">
            <Helmet>
              <title>{config.siteTitle}</title>
              <link rel="canonical" href={`${config.siteUrl}`} />
            </Helmet>
            <SEO postEdges={postEdges} />
            <PostListing postEdges={postEdges} />
          </div>
        </Layout>
      );
    }
    return null;
  }
}

export default Index;
