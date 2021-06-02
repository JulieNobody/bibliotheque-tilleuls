import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Banner from './Banner';
import Catalogue from './Catalogue';
import Footer from './Footer';
import Filtres from './Filtres';
import BookDetail from './BookDetail';
import ResultRecherche from './ResultRecherche';
import ErrorPage from './ErrorPage';

function App() {
//FIXME : errorPage ne fonctionne pas

  return (
    <BrowserRouter>
      <Banner />
      <Filtres />

      <Switch>

        <Route path="/ResultRecherche" children={<ResultRecherche />} />
        <Route path="/BookDetail/:id" children={<BookDetail />} />
          {/* exact : pour que seul "/" dirige vers cette page */}
        <Route exact path="/" component={Catalogue} />
        <Route path="/:id" children={<Catalogue />} />

        {/* en cas d'erreur */}
        <Route component={ErrorPage} />


      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
