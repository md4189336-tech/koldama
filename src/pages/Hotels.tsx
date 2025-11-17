import { useFetchData } from '@/hooks/useFetchData';
import { StatusView } from '@/components/StatusView';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const Hotels = () => {
  const { data: hotels, loading, error } = useFetchData('hotels');

  return (
    <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 lg:mb-8 text-accent">
        Hôtels et Hébergements à Kolda
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
        Informations complètes pour planifier votre séjour. Contactez directement par WhatsApp !
      </p>
      <StatusView loading={loading} error={error} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {hotels?.map(hotel => (
          <div 
            key={hotel.id} 
            className="bg-card rounded-xl shadow-lg overflow-hidden transition-shadow hover:shadow-2xl"
          >
            <div className="h-40 sm:h-48 lg:h-56 w-full bg-muted flex items-center justify-center text-muted-foreground font-bold text-base sm:text-lg px-4 text-center">
              {hotel.name}
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-lg sm:text-xl font-bold text-card-foreground mb-2 truncate">{hotel.name}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{hotel.description}</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {hotel.services.map(service => (
                  <span 
                    key={service} 
                    className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold rounded-full bg-muted text-muted-foreground border border-border"
                  >
                    {service}
                  </span>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Contact : {hotel.whatsapp}</p>
              <WhatsAppButton number={hotel.whatsapp} className="w-full text-sm" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 sm:mt-12 text-center p-4 sm:p-6 border-t border-border">
        <p className="font-semibold text-sm sm:text-base text-foreground mb-3">
          Vous êtes propriétaire d'un hébergement ?
        </p>
        <button className="inline-flex items-center bg-primary text-primary-foreground font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm sm:text-base">
          Ajouter votre établissement
        </button>
      </div>
    </div>
  );
};

export default Hotels;
