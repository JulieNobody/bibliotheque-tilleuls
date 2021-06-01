import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../style/App.css';
import Banner from './Banner';
import Catalogue from './Catalogue';
import Footer from './Footer';
import Filtres from './Filtres';
import BookDetail from './BookDetail';
import RandomBook from './RandomBook';
import ErrorPage from './ErrorPage';

function App() {

  return (
    <BrowserRouter>
      <Banner />
      <Filtres />

      <Switch>
        {/* exact : pour que seul "/" dirige vers cette page */}
        <Route exact path="/" component={Catalogue} />
        <Route path="/:id" children={<Catalogue />} />


        <Route path="/RandomBook" component={RandomBook} />
        <Route path="/BookDetail/:id" children={<BookDetail />} />

        {/* en cas d'erreur */}
        <Route component={ErrorPage} />

      </Switch>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
