import Banner from "./Banner";
import MainView from "./MainView";
import React, { useEffect, useState } from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

const Home = ({onLoad, onUnload, tags, onClickTag}) => {
  const tab = "all";
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  useEffect(() => {
    const fetchItems = searchTerm ? agent.Items.byTitle(searchTerm) : agent.Items.all();
    
    onLoad(
      tab,
      fetchItems,
      Promise.all([agent.Tags.getAll(), fetchItems])
    );
    return onUnload;
  }, [onLoad, onUnload, tab, searchTerm]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    setSearchPerformed(searchTerm !== '');
  };

    return (
      <div className="home-page">
        <Banner onSearch={handleSearch}/>

        <div className="container page">
          <Tags tags={tags} onClickTag={onClickTag} />
          <MainView searchPerformed={searchPerformed}/>
        </div>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);