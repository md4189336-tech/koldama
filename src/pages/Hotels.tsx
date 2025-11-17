import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Hotels = () => {
  const { data: hotels, loading, error } = useFetchData('hotels');

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold mb-8 text-accent">Hôtels et Hébergements à Kolda</h2>
      <p className="text-muted-foreground mb-8">
        Informations complètes pour planifier votre séjour. Contactez directement par WhatsApp !
      </p>
      <StatusView loading={loading} error={error} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hotels?.map(hotel => (
          <div 
            key={hotel.id} 
            className="bg-card rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl"
          >
            <div className="h-56 w-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-lg">
              {hotel.name}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-card-foreground mb-2">{hotel.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{hotel.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.services.map(service => (
                  <span 
                    key={service} 
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground border border-border"
                  >
                    {service}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">Contact : {hotel.whatsapp}</p>
              <WhatsAppButton number={hotel.whatsapp} className="w-full" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center p-6 border-t border-border">
        <p className="font-semibold text-foreground mb-3">Vous êtes propriétaire d'un hébergement ?</p>
        <button className="inline-flex items-center bg-primary text-primary-foreground font-bold py-3 px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity">
          Ajouter votre établissement
        </button>
      </div>
    </div>
  );
};

export default Hotels;
