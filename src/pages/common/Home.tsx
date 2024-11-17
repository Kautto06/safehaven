import { IonContent, IonPage,IonButton } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import '../../assets/common/Home.css';



// Importar imágenes
import actividadesImg from '../../assets/images/actividades.jpg';
import autoevaluacionImg from '../../assets/images/autoevaluacion.jpg';
import calendarioImg from '../../assets/images/calendario.jpg';
import denunciaImg from '../../assets/images/denuncia.jpg';
import expertosImg from '../../assets/images/expertos.jpg';
import foroImg from '../../assets/images/foro.jpg';
import { Footer, Header } from '../../components';
import pageApi from '../../api/backend';
import imagencompartida from '../../assets/images/profile.svg';
import noImagen from '../../assets/images/foro.jpg';

interface Expert {
  ID: number;
  nombre: string;
  texto: string;
}

interface Foro {
  ID: number;
  Titulo: string;
  texto_preview: string;
}


export const Home: React.FC = () => {
  const history = useHistory();

  const secciones = [
    { nombre: 'Actividades', ruta: '/actividades', descripcion: 'Aquí puedes gestionar y ver tus actividades.', imagen: actividadesImg },
    { nombre: 'Autoevaluación', ruta: '/autoevaluacion', descripcion: 'Realiza tu autoevaluación periódica.', imagen: autoevaluacionImg },
    { nombre: 'Calendario', ruta: '/calendario', descripcion: 'Consulta tus eventos y planifica.', imagen: calendarioImg },
    { nombre: 'Denuncia', ruta: '/denuncia', descripcion: 'Haz denuncias si notas irregularidades.', imagen: denunciaImg },
    { nombre: 'Expertos', ruta: '/expertos', descripcion: 'Accede a nuestros expertos para recibir ayuda.', imagen: expertosImg },
    { nombre: 'Foro', ruta: '/foro', descripcion: 'Participa en discusiones y comparte tus ideas.', imagen: foroImg },
  ];

  const [expertos, setExpertos] = useState<Expert[]>([]);
  const [foro, setForo] = useState<Foro[]>([]);
   

  useEffect(() => {

    const fetchExperts = async () => {
      try {
        const response = await pageApi.get('/experts/'); // Usando axios
        setExpertos(response.data);  // Actualiza el estado con los datos de los expertos
      } catch (error) {
        console.error("Error al obtener expertos", error);  // Muestra el error si falla la solicitud
      }
    };

    fetchExperts();
  }, []);

  useEffect(() => {
    const fetchForo = async () => {
      try {
        const response = await pageApi.get('/foro/'); // Usando axios
        setForo(response.data);  // Actualiza el estado con los datos del foro
      } catch (error) {
        console.error("Error al obtener publicaciones del foro", error);  // Muestra el error si falla la solicitud
      }
    };

    fetchForo();
  }, []);

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
            <SwiperSlide key={seccion.ruta} className="swiper-slide">
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
        {/* Sección Acerca de Nosotros */}
        <div className="about-us-section">
          <div className="about-us-content">
            <h2>Acerca de Nosotros</h2>
            <p>
              Nuestra misión es concienciar a las personas sobre la violencia de género y proporcionar herramientas de prevención para combatir este grave problema social.
              A través de esta aplicación, ofrecemos una plataforma de recursos y apoyo para ayudar a las víctimas y fomentar la educación sobre el tema.
            </p>
            <p>
              Creemos firmemente que el cambio empieza por la concienciación, y es por eso que hemos desarrollado esta aplicación con un enfoque en la prevención y el
              empoderamiento de las personas para tomar acción contra la violencia de género.
            </p>
            <p>
              Únete a nuestra comunidad, participa en nuestras actividades, realiza autoevaluaciones periódicas y encuentra ayuda a través de nuestros expertos. Juntos podemos
              crear un entorno más seguro y respetuoso para todos.
            </p>
          </div>
        </div>
        <div className="content-section">
              {/* Sección izquierda - Foro */}
              <div className="forum-section">
            <h2>Publicaciones más recientes</h2>
            <div className="forum-posts">
                {foro.length > 0 ? (
                  foro.map((post) => (
                    <div className="forum-post" key={post.ID}> 
                      <img src={noImagen} alt={post.Titulo} className="forum-image" />
                      <div className="post-details">
                        <h3>{post.Titulo}</h3>
                        <p>{post.texto_preview}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No se encontraron publicaciones en el foro</p>
                )}
              </div>
          </div>

              <div className="experts-section">
            <h2>Expertos</h2>
            <div className="experts-list">
            {Array.isArray(expertos) && expertos.length > 0 ? (
                expertos.map((expert) => (
                  <div className="expert-item" key={expert.ID}>
                    <img src={imagencompartida} alt={expert.nombre} className="expert-image" />
                    <div className="expert-details">
                      <h3>{expert.nombre}</h3>
                      <p>{expert.texto}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No se encontraron expertos</p>
              )}
              </div>

        </div>
          </div>
          <Footer/>
      </IonContent>
      
    </IonPage>
    
  );
};

