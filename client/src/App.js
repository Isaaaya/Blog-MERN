import './App.css';
import { Hero } from './components/index';
import { SuggestedArticles, CTA } from './components/index';

function App() {
  return (
    <div>
      <Hero />
      <SuggestedArticles />
      <CTA />
    </div>
  );
}

export default App;
