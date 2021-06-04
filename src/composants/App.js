import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Banner from './Banner';
import Catalogue from './Catalogue';
import Footer from './Footer';
import Filtres from './Filtres';
import BookDetail from './BookDetail';
import ResultRecherche from './ResultRecherche';
import NouveauLivre from './NouveauLivre';
import ModifLivre from './ModifLivre';
import ErrorPage from './ErrorPage';

function App() {
//FIXME : errorPage ne fonctionne pas
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

        <Route path="/ResultRecherche" children={<ResultRecherche />} />
        <Route path="/NouveauLivre" children={<NouveauLivre />} />
        <Route path="/ModifLivre" children={<ModifLivre />} />
        <Route path="/BookDetail/:id" children={<BookDetail />} />
        <Route exact path="/" component={Catalogue} />
        <Route component={ErrorPage} />

      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
