import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeFirstLetter=(string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  


  const updateNews = async () => {
    props.setProgress(10);
    let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data= await fetch(url);
    props.setProgress(30);
    let parsedData= await data.json();
    props.setProgress(70);
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title= `${capitalizeFirstLetter(props.category)}- NewsPro`;
    updateNews();
    // eslint-disable-next-line
  }, [])
  

  // const componentDidMount  = async () =>{
  //   // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bb5964aa0aa049a0a99fc809f8dd5f5d&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({
  //   //   loading: true
  //   // });
  //   // let data= await fetch(url);
  //   // let parsedData= await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false
  //   // })
    
  // }

  //   handlePreviousClick= async ()=> {
  //     // let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bb5964aa0aa049a0a99fc809f8dd5f5d&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //     // this.setState({
  //     //   loading: true
  //     // });
  //     // let data= await fetch(url);
  //     // let parsedData= await data.json();
  //     // this.setState({
  //     //   page: this.state.page - 1,
  //     //   articles: parsedData.articles,
  //     //   loading: false
  //     // })
  //     this.setState({page: this.state.page - 1})
  //     this.updateNews();
  //   }

  // handleNextClick= async ()=> {
  // //   if(!(this.state.page+1> Math.ceil(this.state.totalResults/props.pageSize))){
  // //     let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bb5964aa0aa049a0a99fc809f8dd5f5d&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
  // //     this.setState({
  // //       loading: true
  // //     });
  // //     let data= await fetch(url);
  // //     let parsedData= await data.json();
  // //     this.setState({
  // //       page: this.state.page + 1,
  // //       articles: parsedData.articles,
  // //       loading: false
  // //     })
  // // }
  //   this.setState({page: this.state.page + 1})
  //   this.updateNews();
  // }

  const fetchMoreData = async() => {
    let url= `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bb5964aa0aa049a0a99fc809f8dd5f5d&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };


    return (
      <>
        <h1 className="text-center" style={{margin: "30px", marginTop: "90px"}}>NewsPro- Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
       
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        <div className='container my-3'>
        <div className="row">
        {articles?.map((element)=>{
              return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description?element.description.slice(0,88):""}  imageUrl={element.urlToImage} newsUrl={element.url} author={!element.author?"Unknown Author":element.author} date={element.publishedAt} source={element.source.name}/>
              </div>
        })} 
              
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

</>
    )

}

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,

}


export default News
