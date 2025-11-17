interface StatusViewProps {
  loading: boolean;
  error: string | null;
}

export const StatusView = ({ loading, error }: StatusViewProps) => (
  <div className="p-8 text-center min-h-60 flex flex-col justify-center items-center">
    {loading && (
      <div className="text-xl font-semibold text-muted-foreground">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4 mx-auto"></div>
        Chargement des données...
      </div>
    )}
    {error && (
      <div className="text-destructive border border-destructive/30 bg-destructive/5 p-4 rounded-lg">
        <p className="font-bold">Erreur :</p>
        <p>{error}</p>
      </div>
    )}
  </div>
);
