import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { Memories } from './pages/Memories';
import { Menu } from './pages/Menu';
import { Plus } from './pages/Plus';
import { Landing } from './pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/plus" element={<Plus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
