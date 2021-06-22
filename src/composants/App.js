import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../style/App.css'
import Banner from './Banner'
import Catalogue from './Catalogue'
import Footer from './Footer'
import Filtres from './Filtres'
import BookDetail from './BookDetail'
import ResultRecherche from './ResultRecherche'
import NouveauLivre from './NouveauLivre'
import ModifLivre from './ModifLivre'
import ErrorPage from './ErrorPage'
import React from 'react'

function App() {
//INFO : "exact" : pour que seul "/" dirige vers cette page
//INFO : ":id" pas necessaire quand on rècupère le param dans url via useQuery
//INFO : "/:id" desactive ErrorPage puisque tt les fausses url sont considérées comme des id

//A-VOIR : différence entre component et children (route)
//A-VOIR : useCallback
//A-VOIR : react hook form

  return (
    <BrowserRouter>
      <Banner />
      <Filtres />

      <Switch>

        <Route path="/ResultRecherche">
          <ResultRecherche />
        </Route>

        <Route path="/NouveauLivre">
          <NouveauLivre />
        </Route>

        <Route path="/ModifLivre/:id">
          <ModifLivre />
        </Route>

        <Route path="/BookDetail/:id">
          <BookDetail />
        </Route>

        <Route exact path="/" component={Catalogue} />

        <Route component={ErrorPage} />

      </Switch>

      <Footer />
    </BrowserRouter>
  )
}

export default App
