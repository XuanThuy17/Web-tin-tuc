import Header from '../Header';
import Footer from '../Footer';
import HotNews from './HotNews';
import LastestNews from './LastestNews';
import Football from './Football';
import Badminton from './Badminton';
import Tennis from './Tennis';
import Basketball from './Basketball';
import AllNewHome from './AllNewHome';
import LatestNews from './LatestNews';
import './Home.scss'
import {Link, NavLink} from 'react-router-dom';
import doc2 from '../../../assets/img/down.png'
import ngang from '../../../assets/img/ads.png'
import ads3 from '../../../assets/img/ads2.png'
import doc1 from '../../../assets/img/ads3.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';

const Home = () => {

    return(
        <>
            <Header/>
            <div className='home'>
                <div class="container">
                    <div className='row'>
                        <HotNews/>
                        <div className='col-0 col-sm-3'>
                            <div className='ads'>
                                <Link to='#'>
                                    <img src={doc1}/>
                                </Link>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='ads ngang'>
                                <Link to='#'>
                                    <img src={ngang}/>
                                </Link>
                            </div>
                        </div>
                        <LastestNews/>
                        <div className='col-0 col-sm-3'>
                            <div className='ads'>
                                <Link to='#'>
                                    <img src={doc2}/>
                                </Link>
                            </div>
                        </div>
                        <Football/>
                        <Badminton/>
                        <Tennis/>
                        <Basketball/>
                        <AllNewHome/>
                        <div className='col-12 col-sm-4'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <div className='d-flex justify-content-between align-items-center mb-2 mt-2'>
                                            <Link to='/'><h4>Premier League</h4></Link>
                                        </div>
                                    </div>
                                    <div className='col-12'>
                                        <div className='EPL'>
                                        <div id="scoreaxis-widget-318b4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                            <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&amp;removeBorders=1&amp;inst=318b4" style={{ width: "100%", minHeight: "250px", border: "none", transition: "all 300ms ease" }}></iframe>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className='col-12 col-sm-4'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='d-flex justify-content-between align-items-center mb-2 mt-2'>
                                        <Link to='/'><h4>La Liga</h4></Link>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='EPL'>
                                    <div id=" scoreaxis-widget-c32ff" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/564?autoHeight=1&amp;removeBorders=1&amp;inst=318b4" style={{ width: "100%", minHeight: "250px", border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-4'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='d-flex justify-content-between align-items-center mb-2 mt-2'>
                                        <Link to='/'><h4>Champions League</h4></Link>
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div className='EPL'>
                                    <div id=" scoreaxis-widget-c32ff" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/standings-widget/2?autoHeight=1&amp;removeBorders=1&amp;inst=318b4" style={{ width: "100%", minHeight: "250px", border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-sm-9'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div className='d-flex justify-content-between align-items-center mb-2 mt-2'>
                                        <Link to='/'><h4>Next macth</h4></Link>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4 mb-2'>
                                    <div id="scoreaxis-widget-d97e4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/live-match/19094494?autoHeight=1&amp;inst=d97e4" style={{ width: "100%", maxHeight: "100px", border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4 mb-2'>
                                    <div id="scoreaxis-widget-d97e4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/live-match/19094493?autoHeight=1&amp;inst=d97e4" style={{ width: "100%", maxHeight: "100px",border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4 mb-2'>
                                    <div id="scoreaxis-widget-d97e4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/live-match/18944468?autoHeight=1&amp;inst=d97e4" style={{ width: "100%", maxHeight: "100px",border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4 mb-2'>
                                    <div id="scoreaxis-widget-d97e4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/live-match/18842560?autoHeight=1&amp;inst=d97e4" style={{ width: "100%", maxHeight: "100px",border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4 mb-2'>
                                    <div id="scoreaxis-widget-d97e4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/live-match/19101803?autoHeight=1&amp;inst=d97e4" style={{ width: "100%", maxHeight: "100px",border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                </div>
                                <div className='col-12 col-sm-4 mb-2'>
                                    <div id="scoreaxis-widget-d97e4" style={{ borderWidth: "1px", borderColor: "rgba(0, 0, 0, 0.15)", borderStyle: "solid", borderRadius: "8px", padding: "10px", background: "rgb(255, 255, 255)", width: "100%" }}>
                                        <iframe id="Iframe" src="https://www.scoreaxis.com/widget/live-match/18870621?autoHeight=1&amp;inst=d97e4" style={{ width: "100%", maxHeight: "100px",border: "none", transition: "all 300ms ease" }}></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <LatestNews/>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Home