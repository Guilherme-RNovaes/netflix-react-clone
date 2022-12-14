import React from "react";
import { useEffect, useState } from "react";

import "./App.css"
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow"
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header/index";


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

// Quando a tela carregar, execute a função:
  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);  

      // Pegando o Featured
      let originals = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListner = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListner);

    return () => {
      window.removeEventListener('scroll',  scrollListner);
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader} />

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items} />
          </div>
        ))}
      </section>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://i.gifer.com/8Etj.gif" alt="Carregando" />
        </div>
      }
    </div>
  );
}