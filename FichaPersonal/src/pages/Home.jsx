import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home-page">
      <Card title="Bienvenido" subTitle="Práctico React Router + LocalStorage" className="home-card">
        <p className="home-text">
          Navegá hasta la tarjeta para completar el formulario controlado y guardar
          la información de personas en el navegador.
        </p>
        <Link to="/tarjeta" className="no-decoration">
          <Button label="Ir al formulario" icon="pi pi-arrow-right" iconPos="right" />
        </Link>
      </Card>
    </div>
  );
};

export default Home;
