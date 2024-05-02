import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm'

const App = () => {
    const [articles, setArticles] = useState([])
    const [term, setTerm] = useState('election')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(
                    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${term}&api-key=${process.env.REACT_APP_ARTICLES_API_KEY}`
                )
                const articles = await res.json()
                setArticles(articles.response.docs)
                console.log(articles)
                setIsLoading(false)
            } catch (error) {
                console.error(error)
            }
        }
        fetchArticles()
    }, [term])

    return (
        <>
            <div className="showcase">
                <div className="overlay">
                    <h1 className="textBold">
                        Viewing articles about {term}
                    </h1>
                    <SearchForm searchText={(text) => setTerm(text)}/>
                </div>
            </div>
            {isLoading ? ( <h1 className='loading'>Loading...</h1> ) : (
            <section className='section'>
                {articles.map((article) => {
                    const {
                        abstract,
                        headline: { main },
                        byline: { original },
                        lead_paragraph,
                        news_desk,
                        section_name,
                        web_url,
                        _id,
                        word_count,
                    } = article

                    return (
                        <article key={_id} className='card'>
                            <h2 className='headerArticle'>{main}</h2>
                            <p>{abstract}</p>
                            <p>{lead_paragraph}</p>

                            <ul className='list'>
                                <li>{original}</li>
                                <li>
                                    <span className='list-item'>News Desk: </span>{news_desk}</li>
                                <li>
                                <span className='list-item'>Section Name: </span>{section_name}</li>
                                <li>
                                <span className='list-item'>Word Count: </span>{word_count}</li>
                            </ul>
                            <a href={web_url} target="_blank" className="a">
                                Web Resource
                            </a>
                        </article>
                    )
                })}
            </section>)}
        </>
    )
}

export default App
