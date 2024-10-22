import { IonContent, IonPage,IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import '../assets/Home.css';
import Header from '../components/Header';

// Importar imágenes
import actividadesImg from '../assets/images/actividades.jpg';
import autoevaluacionImg from '../assets/images/autoevaluacion.jpg';
import calendarioImg from '../assets/images/calendario.jpg';
import denunciaImg from '../assets/images/denuncia.jpg';
import expertosImg from '../assets/images/expertos.jpg';
import foroImg from '../assets/images/foro.jpg';

const Home: React.FC = () => {
  const history = useHistory();

  const secciones = [
    { nombre: 'Actividades', ruta: '/actividades', descripcion: 'Aquí puedes gestionar y ver tus actividades.', imagen: actividadesImg },
    { nombre: 'Autoevaluación', ruta: '/autoevaluacion', descripcion: 'Realiza tu autoevaluación periódica.', imagen: autoevaluacionImg },
    { nombre: 'Calendario', ruta: '/calendario', descripcion: 'Consulta tus eventos y planifica.', imagen: calendarioImg },
    { nombre: 'Denuncia', ruta: '/denuncia', descripcion: 'Haz denuncias si notas irregularidades.', imagen: denunciaImg },
    { nombre: 'Expertos', ruta: '/expertos', descripcion: 'Accede a nuestros expertos para recibir ayuda.', imagen: expertosImg },
    { nombre: 'Foro', ruta: '/foro', descripcion: 'Participa en discusiones y comparte tus ideas.', imagen: foroImg },
  ];

  return (
    <IonPage>
      <Header />

      <IonContent fullscreen>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true} // Asegúrate de que esta línea esté presente
          allowTouchMove={false} // Esta línea deshabilita el arrastre
          modules={[Pagination, Navigation]} // Asegúrate de que Navigation esté en la lista de módulos
          className="swiper-container"
        >
          {secciones.map((seccion, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <div className="slide-content" style={{ backgroundImage: `url(${seccion.imagen})` }}>
                <h2>{seccion.nombre}</h2>
                <p>{seccion.descripcion}</p>
                <IonButton className='btn-seccion' onClick={() => history.push(seccion.ruta)}>
                  Ir a {seccion.nombre}
                </IonButton>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Home;
